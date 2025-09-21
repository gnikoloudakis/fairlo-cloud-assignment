class UrlDomain {
    private originalUrl: string;
    private shortUrl?: string;

    constructor(original_url: string) {
        this.originalUrl = original_url;
    }

    shortenUrl(): string {

        if (!this.originalUrl) {
            throw new Error('URL is required');
        }
        if (!this.urlIsValid(this.originalUrl)) {
            throw new Error('Invalid URL format: ' + this.originalUrl);
        }

        const b64encodedUrl = btoa(this.originalUrl)
        this.shortUrl = b64encodedUrl.slice(b64encodedUrl.length / 2).replace(/=/g, '') + ".ly";
        return this.shortUrl;
    }

    private urlIsValid(url: string) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
}

export {UrlDomain};