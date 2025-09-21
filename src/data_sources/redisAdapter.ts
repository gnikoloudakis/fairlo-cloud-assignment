import {createClient} from "redis";
import {IDbAdapter} from "./IDbAdapter";

class RedisAdapter implements IDbAdapter {
    username: string;
    password?: string;
    host: string;
    port: string;
    redis_tls: boolean;
    redis_url: string;

    constructor() {
        this.username = process.env.REDIS_HOST_USERNAME || 'default';
        this.password = process.env.REDIS_HOST_PASSWORD; // Required for secure connection. If not set, will throw error.
        this.host = process.env.REDIS_HOST || 'localhost';
        this.port = process.env.REDIS_PORT || '6379';
        this.redis_tls = process.env.REDIS_TLS_ENABLED === 'true';
        // this.redis_url = `${this.redis_tls?'rediss':'redis'}://${this.username}:${this.password}@${this.host}:${this.port}`
        this.redis_url = `${this.redis_tls?'rediss':'redis'}://:${this.password}@${this.host}:${this.port}`

        if (!this.password) {
            throw new Error("REDIS_HOST_PASSWORD environment variable is required for secure Redis connection.");
        }
        console.log('redis host: ', this.host);
    }

    private async getDBClient() {
        console.log('Connecting to Redis at ', `${this.host}:${this.port}`);
        return await createClient({url: this.redis_url,
            socket: {
                tls: true,
                rejectUnauthorized: false // Set to true in production with proper CA certs
            }
        })
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
                console.log('Getting key from Redis: ', key);
                return await client.get(key);
            } else if (command == 'set' && value !== undefined) {
                console.log('Setting key in Redis: ', key);
                return await client.set(key, value);
            } else {
                throw new Error("Invalid command or missing value for set");
            }
        } catch (error) {
            console.error("Error fetching key from Redis:", error);
            throw error; //propagate the error after logging it
        } finally {
            console.log('Closing Redis client');
            client?.destroy() // Ensure the client is closed after operation. if client is defined
        }
    }
}

export {RedisAdapter};