import {shortenUrl} from "../utils/urlUtils";


describe("Test urlUtils module", ()=>{
    test("shortenUrl function should return a string of length 8", ()=>{
        const shortenedUrl = shortenUrl("https://example.com/some/long/url", 8)
        expect(shortenedUrl.length).toBe(11); // 8 + ".ly" = 11))
    });
})