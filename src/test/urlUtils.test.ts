import {shortenUrl} from "../utils/urlUtils";


describe("Test urlUtils module", ()=>{
    test("shortenUrl function should return a string of length 8", ()=>{
        const shortenedUrl = shortenUrl("https://example.com/some/long/url", 8)
        expect(shortenedUrl.length).toBe(11); // 8 + ".ly" = 11))
    });

    test("shortenUrl function should throw error if url is empty", ()=>{
        expect(() => shortenUrl("", 8)).toThrow("URL is required");
    });

    test("shortenUrl function should return a string ending with .ly", ()=>{
        const shortenedUrl = shortenUrl("https://example.com/some/long/url", 8)
        expect(shortenedUrl.endsWith(".ly")).toBe(true);
    });

    test("shortenUrl should return a base64 encoded url, shortened by provided max-length", ()=>{
        const originalUrl = "https://example.com/some/long/url";
        const maxLength = 10;
        const shortenedUrl = shortenUrl(originalUrl, maxLength);
        const expectedShortenedPart = btoa(originalUrl).slice(0, maxLength);
        expect(shortenedUrl).toBe(expectedShortenedPart + ".ly");
    })
})