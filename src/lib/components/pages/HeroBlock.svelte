<script>
    import Rating from "../UI/rating/Rating.svelte";
    import IconClock from "$lib/icons/IconClock.svelte";
    import IconGroup from "$lib/icons/IconGroup.svelte";
    import ShareIcon from "../UI/buttons/ShareIcon.svelte";

    export let imageUrl = "/rafting.jpg";
    export let title = "Rafting from Kemer";
    export let subtitle = "Adrenaline and nature";
    export let rating = 4.5;
    export let reviewsCount = 120;
    export let locale = "en";

    console.log("====================================");
    console.log(title);
    console.log("====================================");

    // Determine effective locale
    $: effectiveLocale = locale || "en";
</script>

<div class="hero">
    <div class="image-wrapper">
        <img src={imageUrl} alt={title} />
    </div>
    <div class="hero-content">
        <div class="top-row">
            <Rating
                {rating}
                {reviewsCount}
                locale={effectiveLocale}
            /><ShareIcon />
        </div>
        <h1 class="title">{title}</h1>
        <div class="subtitle">{subtitle || "Adrenaline and nature"}</div>
    </div>
</div>

<style>
    .hero {
        max-width: 600px;
        margin: 0 auto;
    }

    .image-wrapper {
        position: relative;
        overflow: hidden;
    }

    .hero img {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
    }

    .top-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .hero-content {
        background: var(--color-bg);
        position: relative;
        padding: 0 var(--space-vertical-sm);
    }

    .title {
        font-size: var(--text-xxl);
        font-weight: bold;
        margin: 0.5rem 0 0;
    }

    .subtitle {
        font-size: var(--text-xl);
        color: var(--color-gray-700);
    }

    @media (prefers-color-scheme: dark) {
        .subtitle {
            color: var(--color-gray-400);
        }
    }
</style>
