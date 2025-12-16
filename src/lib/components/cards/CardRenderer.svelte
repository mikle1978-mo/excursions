<script>
    import Card from "$lib/components/cards/Card.svelte";
    import { appConfig } from "$lib/config/app.config";

    export let item;
    export let type;
    export let lang;
    export let loading = "lazy";

    const config = appConfig.collections[type].cardConfig;
    const data = config.adapter({
        item,
        lang,
        type,
        badgeRules: config.badgeRules,
    });
</script>

<Card {data} {loading} />
