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

    test("shortenUrl function should return a string of length 11", async () => {
        const shortenedUrl = await mockedInteractor.shortenUrl("https://example.com/some/long/url");
        expect(shortenedUrl.length).toBe(11); // 8 + ".ly" = 11))
    });

    const mockedInteractor2 = getMockedInteractor('https://example.com/some/long/url', null);
    test("getOriginalUrl function should return the original URL", async () => {
        const originalUrl = "https://example.com/some/long/url";
        const fetchedOriginalUrl = await mockedInteractor2.getOriginalUrl('someShortUrl');
        expect(fetchedOriginalUrl).toBe(originalUrl);
    });

    const mockedInteractor3 = getMockedInteractor('https://example.com/some/long/url', null);
    test("shortenUrl function should throw an error if it cannot generate a unique shortened URL after 5 attempts", async () => {
        await expect(mockedInteractor3.shortenUrl("https://example.com/some/long/url"))
            .rejects.toThrow('Could not generate a unique shortened URL (tried 5 times already). Please try again.');
    });

});