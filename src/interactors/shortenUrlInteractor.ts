import {PersistenceLayerRepository} from "../repositories/persistenceLayerRepository";
import {shortenUrl} from "../utils/urlUtils";

class ShortenUrlInteractor {
    private repo: PersistenceLayerRepository;

    constructor(repo: PersistenceLayerRepository) {
        this.repo = repo;
    }

    async shortenUrl(originalUrl: string): Promise<string> {
        let shortenedUrl = shortenUrl(originalUrl, 8)
        let counter = 0;
        while (await this.repo.getValue(shortenedUrl) !== null) { // ensure the shortenedUrl is unique
            shortenedUrl = shortenUrl(encodeURIComponent(originalUrl));
            counter += 1;
            if (counter > 5) {
                throw new Error('Could not generate a unique shortened URL (tried 5 times already). Please try again.');
            }
        }

        console.log('Shortened URL is unique after ', counter, ' attempts.');
        console.log('shortenedUrl: ', shortenedUrl);

        await this.repo.setValue(shortenedUrl, originalUrl);
        return shortenedUrl;
    }

    async getOriginalUrl(shortUrl: string): Promise<string | null> {
        return await this.repo.getValue(shortUrl);
    }
}

export {ShortenUrlInteractor};