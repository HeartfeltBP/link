import * as functions from 'firebase-functions'

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

let sveltekitServer: any;
exports.sveltekit = functions.region("us-central1").https.onRequest(async (request, response) => {
    if (!sveltekitServer) {
    functions.logger.info("Initialising SvelteKit SSR entry");
    sveltekitServer = require("./sveltekit/index").default;
    functions.logger.info("SvelteKit SSR entry initialised!");
    }
    functions.logger.info("Requested resource: " + request.originalUrl);
    return sveltekitServer(request, response);
});
