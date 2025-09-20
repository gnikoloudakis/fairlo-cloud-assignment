import express from 'express';
import {redirectToOriginalUrlController, urlShortenerController} from "./controller";

const app = express();
app.use(express.json({limit: '50mb'}));
const port = process.env.PORT || 80;

app.get('/', (req, res) => {
    res.send('Hello, TypeScript + Express!');
});

app.post('/shorten', urlShortenerController);
app.get('/:shortUrl', redirectToOriginalUrlController);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

