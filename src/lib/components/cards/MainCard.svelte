<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";

    export let item;
    export let loading = "lazy"; // по умолчанию

    const {
        title = { ru: "Фото ссылки", en: "Link photo" },
        img: image = "/images/excursions/excursion_default.webp",
        set = [],
        link: slug = "",
    } = item;

    // Преобразуем массив set в строку для srcset
    $: srcset = set.length
        ? set.map(({ url, width }) => `${url} ${width}`).join(", ")
        : "";

    // Основное изображение берем либо первое из set, либо дефолтное
    $: src = set.length ? set[0].url : image;

    let isMounted = false;

    onMount(() => {
        isMounted = true;
    });
</script>

<div class="card" transition:fly={{ y: 20, duration: 500 }}>
    <a href={`/${$locale}/${slug}`} class="card__image-wrapper">
        <img
            {src}
            {srcset}
            sizes="(max-width: 400px) 100vw, (max-width: 768px) 50vw, 33vw"
            alt={title[$locale]}
            class="card__image"
            {loading}
            fetchpriority={loading === "eager" ? "high" : "auto"}
            decoding="async"
            width="600"
            height="338"
        />
    </a>

    <div class="card__content">
        <div class="card__header">
            <h2 class="card__title">
                <a href={$locale === "en" ? `/${slug}` : `/${$locale}/${slug}`}
                    >{title[$locale]}</a
                >
            </h2>
        </div>
    </div>
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-bg);
        border-radius: unset;
        overflow: hidden;

        transition: var(--transition-normal);
        min-height: 245px;
    }

    .card:hover {
        box-shadow: var(--shadow-lg);
        transform: translateY(-2px);
    }

    .card__image-wrapper {
        position: relative;
        width: 100%;
        aspect-ratio: 16 / 9;
    }

    .card__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--space-vertical-xs);
        padding: var(--space-vertical-md) var(--space-horizontal-md);
        flex-grow: 1;
    }

    .card__header {
        display: flex;
        flex-direction: column;
    }

    .card__title {
        font-size: var(--text-md);
        font-weight: 600;
        margin: 0;
        color: var(--color-text);
        text-align: center;
        /* Разрешаем перенос текста */
        white-space: normal;
        line-clamp: 2;
        /* Ограничиваем максимум 2 строки */
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;

        /* Обрезаем, если больше 2 строк */
        overflow: hidden;

        /* Чтобы всегда было место под 2 строки, даже если текста меньше */

        font-size: var(--text-lg); /* базовый размер */
        font-weight: 600;
        margin: 0;
        color: var(--color-text);

        text-overflow: ellipsis;
    }

    /* Медиазапросы */

    /* 768px — карточка ~237 */
    @media (min-width: 480px) {
        .card {
            border-radius: var(--radius-md);
        }
    }
    @media (min-width: 768px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.9);
        }

        .card__content {
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
        }
    }

    /* 992px — карточка ~309 */
    @media (min-width: 992px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.95);
        }

        .card__content {
            padding: calc(var(--space-vertical-sm) + 0.1rem)
                calc(var(--space-horizontal-sm) + 0.1rem);
        }
    }

    /* 1200px — карточка ~280 */
    @media (min-width: 1200px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.9);
        }

        .card__content {
            padding: var(--space-vertical-sm) var(--space-horizontal-sm);
        }
    }

    /* 1440px — карточка ~268 */
    @media (min-width: 1440px) {
        .card__title {
            font-size: calc(var(--text-md) * 0.85);
        }

        .card__content {
            padding: var(--space-vertical-xs) var(--space-horizontal-xs);
        }
    }
</style>
