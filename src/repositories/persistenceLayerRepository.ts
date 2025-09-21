import {IDbAdapter} from "../data_sources/IDbAdapter";

class PersistenceLayerRepository {
    private dataSource: IDbAdapter;

    constructor(dataSource: IDbAdapter) {
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