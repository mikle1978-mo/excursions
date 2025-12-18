<script>
    import Card from "$lib/components/cards/Card.svelte";
    import { CardAdapter } from "$lib/features/card/card.adapter.js";
    import { appConfig } from "$lib/config/app.config";

    export let item;
    export let type;
    export let lang;
    export let loading = "lazy";

    const cardConfig = appConfig.collections[type].cardConfig;

    const system = {
        type,
        lang,
        // future:
        // currency
        // locale
        // now
    };

    const data = CardAdapter({
        item,
        config: cardConfig,
        system,
    });
</script>

<Card {data} {loading} />
