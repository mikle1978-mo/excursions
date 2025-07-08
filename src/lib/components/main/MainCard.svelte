<script>
    import { locale } from "$lib/stores/locale.js";
    import { onMount } from "svelte";

    export let item;
    export let loading = "lazy"; // по умолчанию

    const {
        title = { ru: "Фото ссылки", en: "Link photo" },
        img: image = "/images/excursions/excursion_default.webp",
        link: slug = "",
    } = item;

    let isMounted = false;

    onMount(() => {
        isMounted = true;
    });
</script>

<a class="card" href={$locale === "en" ? `/${slug}` : `/${$locale}/${slug}`}>
    <div class="card__image-wrapper">
        <img
            src={image}
            alt=""
            class="card__image"
            width="980"
            height="551"
            {loading}
            fetchpriority={loading === "eager" ? "high" : "auto"}
        />
    </div>

    <div class="card__content">
        <div class="card__header">
            <h2 class="card__title">{title[$locale]}</h2>
        </div>
    </div>
</a>

<style>
    .card {
        display: flex;
        flex-direction: column;
        background-color: var(--color-bg);
        border-radius: var(--radius-md);
        overflow: hidden;
        box-shadow: var(--shadow-md);
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
        justify-content: space-between;
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
