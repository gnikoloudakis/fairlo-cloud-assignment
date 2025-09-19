// import * as crypto from 'crypto';

function shortenUrl(url: string, maxLength: number = 15): string {
    if (!url) {
        throw new Error('URL is required');
    }
    // const randomUuid = crypto.randomUUID(); // this generates a very large string
    // const randomUuid = crypto.randomBytes(20).toString('hex').slice(0, maxLength);
    // return randomUuid + ".ly";
    const b64encodedUrl = btoa(url)
    return b64encodedUrl.slice(0, maxLength) + ".ly";

}

export {shortenUrl};