import {RedisAdapter} from "../data_sources/redisAdapter";
import {PersistenceLayerRepository} from "../repositories/persistenceLayerRepository";
import {ShortenUrlInteractor} from "../interactors/shortenUrlInteractor";

function getMockedInteractor(adapterGetReturnValue: any, adapterSetReturnValue: any): ShortenUrlInteractor {
    const redisAdapter = new RedisAdapter()
    jest.spyOn(redisAdapter, 'get_key').mockResolvedValue(adapterGetReturnValue);
    jest.spyOn(redisAdapter, 'set_key').mockResolvedValue(adapterSetReturnValue);
    const persistenceLayerRepository = new PersistenceLayerRepository(redisAdapter)
    return new ShortenUrlInteractor(persistenceLayerRepository);
}

describe("Test shortenUrlInteractor module", () => {
    const mockedInteractor = getMockedInteractor(null, null);
    const testUrl = "https://example.com/some/long/url";
    const encodedUrl = btoa(testUrl);
    const b = encodedUrl.slice(encodedUrl.length / 2).replace(/=/g, '') + ".ly";

    test("shortenUrl function should return a shortened string of a specific nature", async () => {
        const shortenedUrl = await mockedInteractor.shortenUrl(testUrl);
        expect(shortenedUrl).toBe(b);
        expect(shortenedUrl.length).toBe(b.length);
    });

    const mockedInteractor2 = getMockedInteractor(testUrl, null);
    test("getOriginalUrl function should return the original URL", async () => {
        const originalUrl = testUrl;
        const fetchedOriginalUrl = await mockedInteractor2.getOriginalUrl('someShortUrl');
        expect(fetchedOriginalUrl).toBe(originalUrl);
    });

    const mockedInteractor3 = getMockedInteractor(testUrl, null);
    test("shortenUrl function should throw an error if url already exists in DB", async () => {
        const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        const shortenedUrl = await mockedInteractor3.shortenUrl(testUrl);
        expect(shortenedUrl).toBe(b);

        expect(logSpy).toHaveBeenCalledWith("Url already exists. Returning existing shortened URL.");
        logSpy.mockRestore();
    });

});