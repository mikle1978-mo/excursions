import { collectionsConfig } from "$lib/config/app.config";

export function getCollectionConfigByType(typeFromUrl) {
    return Object.values(collectionsConfig).find(
        (c) =>
            c.collectionName === typeFromUrl ||
            c.collectionName + "s" === typeFromUrl
    );
}
