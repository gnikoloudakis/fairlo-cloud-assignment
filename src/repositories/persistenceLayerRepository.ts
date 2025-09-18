import {RedisAdapter} from "../data_sources/redisAdapter";

class PersistenceLayerRepository {
    private dataSource: RedisAdapter;

    constructor(dataSource: RedisAdapter) {
        this.dataSource = dataSource;
    }

    async getValue(key: string): Promise<string | null> {
        return await this.dataSource.get_key(key);
    }

    async setValue(key: string, value: string): Promise<string | null> {
        return await this.dataSource.set_key(key, value);
    }
}
export {PersistenceLayerRepository};