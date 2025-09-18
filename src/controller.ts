import {PersistenceLayerRepository} from "./repositories/persistenceLayerRepository";
import {RedisAdapter} from "./data_sources/redisAdapter";
import {ShortenUrlInteractor} from "./interactors/shortenUrlInteractor";

const redisAdapter = new RedisAdapter()
const persistenceLayerRepository = new PersistenceLayerRepository(redisAdapter)
const urlShortenerInteractor = new ShortenUrlInteractor(persistenceLayerRepository)

async function urlShortenerController(req: any, res: any) {
    console.log('body: ', req.body);
    const originalUrl = req.body.url;
    await urlShortenerInteractor.shortenUrl(originalUrl).then((shortenedUrl) => {
        res.status(201).json({shortenedUrl: shortenedUrl}); // return 201(created) and the json object {shortenedUrl: shortenedUrl}
    }).catch((error) => {
        res.status(500).json({error: error.message});
    });
}

async function redirectToOriginalUrlController(req: any, res: any) {
    console.log('params: ', req.params);
    const shortUrl = req.params.shortUrl;
    const originalUrl = await urlShortenerInteractor.getOriginalUrl(shortUrl).catch(
        (error) => {
            res.status(500).json({error: error.message});
        }
    )
    if (!originalUrl) {
        res.status(404).json({error: 'URL not found'});
        return;
    }
    console.log('Redirecting to originalUrl: ', originalUrl);
    res.redirect(originalUrl);
}

export {urlShortenerController, redirectToOriginalUrlController};

