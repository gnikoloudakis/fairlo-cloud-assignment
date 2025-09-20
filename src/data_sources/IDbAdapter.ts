interface IDbAdapter {
    get_key(key: string): Promise<string | null>;
    set_key(key: string, value: string): Promise<string | null>;
}

export { IDbAdapter };