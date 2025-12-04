// This script must be saved as 'sw.js' in the root directory.

importScripts("/scram/scramjet.all.js");

const { ScramjetServiceWorker } = $ScramjetLoadWorker();
const scramjet = new ScramjetServiceWorker();

self.addEventListener("fetch", (event) => {
    event.respondWith(async () => {
        await scramjet.loadConfig();
        if (scramjet.route(event)) {
            return scramjet.fetch(event);
        }
        return fetch(event.request);
    });
});
