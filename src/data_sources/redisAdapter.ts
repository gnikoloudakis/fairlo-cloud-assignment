import {createClient, RedisClientType} from "redis";

class RedisAdapter {
    username: string;
    password: string;
    host: string;
    port: string;

    constructor() {
        this.username = process.env.REDIS_HOST_USERNAME || 'default';
        this.password = process.env.REDIS_HOST_PASSWORD || 'password';
        this.host = process.env.REDIS_HOST || 'localhost';
        this.port = process.env.REDIS_PORT || '6379';

        if (!this.password) {
            throw new Error("REDIS_HOST_PASSWORD environment variable is required for secure Redis connection.");
        }
    }

    private async getDBClient() {
        return await createClient({url: `redis://${this.username}:${this.password}@${this.host}:${this.port}`})
            .on("error", (err: any) => {
                console.log("Redis Client Error", err)
                throw err;
            })
            .connect();
    }

    async get_key(key: string) {
        return await this.run_command('get', key)
    }

    async set_key(key: string, value: string) {
        return await this.run_command('set', key, value)
    }

    private async run_command(command: 'set' | 'get', key: string, value?: string) {
        let client = undefined;
        try {
            client = await this.getDBClient();
            if (command == 'get') {
                return await client.get(key);
            } else if (command == 'set' && value !== undefined) {
                return await client.set(key, value);
            } else {
                throw new Error("Invalid command or missing value for set");
            }
        } catch (error) {
            console.error("Error fetching key from Redis:", error);
            throw error; //propagate the error after logging it
        } finally {
            client?.destroy() // Ensure the client is closed after operation. if client is defined
        }
    }
}

export {RedisAdapter};