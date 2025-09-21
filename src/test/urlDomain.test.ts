import {UrlDomain} from "../domain/urlDomain";

describe('Test the Url Domain object', () => {
    const testUrl = "https://example.com/some/long/url";
    const encodedUrl = btoa(testUrl);
    const b = encodedUrl.slice(encodedUrl.length / 2).replace(/=/g, '') + ".ly";

    const invalidUrl = "ht!tp://invalid-url";

    test('shortenUrl method should return a shortened URL', () => {
        const btoaSpy = jest.spyOn(global, 'btoa');
        const urlDomain = new UrlDomain(testUrl);
        expect(urlDomain.shortenUrl()).toBe(b)
        expect(btoaSpy).toHaveBeenCalledTimes(1);
        btoaSpy.mockRestore();
    })
    test('shortenUrl method should throw an error for invalid URL', () => {
        const urlDomain = new UrlDomain(invalidUrl);
        expect(() => urlDomain.shortenUrl()).toThrow('Invalid URL format: ' + invalidUrl);
    })
    test('shortenUrl method should throw an error for empty URL', () => {
        const urlDomain = new UrlDomain('');
        expect(() => urlDomain.shortenUrl()).toThrow('URL is required');
    })
})