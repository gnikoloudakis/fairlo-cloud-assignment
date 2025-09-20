import {PersistenceLayerRepository} from "../repositories/persistenceLayerRepository";
import {UrlDomain} from "../domain/urlDomain";

class ShortenUrlInteractor {
    private repo: PersistenceLayerRepository;

    constructor(repo: PersistenceLayerRepository) {
        this.repo = repo;
    }

    async shortenUrl(originalUrl: string): Promise<string> {
        let urlDomain = new UrlDomain(originalUrl);

        let shortenedUrl = urlDomain.shortenUrl();
        console.log(await this.repo.getValue(shortenedUrl), '----')
        if (await this.repo.getValue(shortenedUrl)) {
            console.log('Url already exists. Returning existing shortened URL.');
            return shortenedUrl;
        }
        // If not exists, store the new mapping and return the shortened URL
        await this.repo.setValue(shortenedUrl, originalUrl);
        return shortenedUrl;
    }

    async getOriginalUrl(shortUrl: string): Promise<string | null> {
        return await this.repo.getValue(shortUrl);
    }
}

export {ShortenUrlInteractor};