<script>
    import { page } from "$app/stores";
    import { locale } from "$lib/stores/locale";
    import TheBreadcrumbs from "$lib/components/UI/breadcrumbs/TheBreadcrumbs.svelte";
    import { breadcrumbs } from "$lib/i18n/breadcrumbs.js";
    export let data;
    const { tour, reviews } = data;
    const { slug } = $page.params;

    $: currentTranslation =
        tour.translations.find((t) => t.lang === $locale) ?? {};

    $: breadcrumbsList = [
        { href: `/${$locale}`, label: breadcrumbs.home[$locale] },
        { href: `/${$locale}/excursions`, label: breadcrumbs.tours[$locale] },
        tour ? { label: currentTranslation.title } : { label: "..." },
    ];
</script>

{#if !tour}
    <div class="error-page">
        <h1>Экскурсия не найдена</h1>
        <a href="/{$locale}/excursions">← Вернуться к списку экскурсий</a>
    </div>
{:else}
    <article class="excursion-detail">
        <!-- Хлебные крошки -->
        <TheBreadcrumbs items={breadcrumbsList} />

        <!-- Заголовок и мета-информация -->
        <header class="excursion-header">
            <h1>{currentTranslation.title}</h1>

            <div class="meta-info">
                <div class="rating">
                    <span class="stars"
                        >{"★".repeat(tour.rating)}{"☆".repeat(
                            5 - tour.rating
                        )}</span
                    >
                    <span>({tour.reviews} отзывов)</span>
                </div>

                <div class="badges">
                    {#if tour.isPopular}
                        <span class="badge popular">Популярно</span>
                    {/if}
                    <span class="badge duration">{tour.duration} ч.</span>
                </div>
            </div>
        </header>

        <!-- Галерея изображений -->
        <div class="gallery">
            {#each tour.images as image, i}
                <img
                    src={image}
                    alt="{currentTranslation.title} - фото {i + 1}"
                    class="gallery-image {i === 0 ? 'primary' : ''}"
                    loading={i > 2 ? "lazy" : "eager"}
                />
            {/each}
        </div>

        <!-- Основное содержимое -->
        <div class="content-grid">
            <section class="description">
                <h2>Описание</h2>
                <p>{currentTranslation.description}</p>
            </section>

            <aside class="booking-card">
                <div class="price-block">
                    <span class="price"
                        >{new Intl.NumberFormat($locale).format(tour.price)}
                        ₽</span
                    >
                    <span class="per-person">за человека</span>
                </div>

                <div class="details">
                    <div class="detail">
                        <span class="label">Длительность:</span>
                        <span class="value">{tour.duration} часа</span>
                    </div>

                    <div class="detail">
                        <span class="label">Размер группы:</span>
                        <span class="value">до {tour.groupSize} человек</span>
                    </div>
                </div>

                <button class="book-button">Забронировать</button>
            </aside>
        </div>
    </article>
{/if}

<style>
    /* Базовые стили страницы */
    .excursion-detail {
        display: flex;
        flex-direction: column;
        max-width: var(--max-width-container);
        margin: 0 auto;
        padding: 0px;
        gap: var(--space-vertical-md);
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow-x: hidden;
        flex: none;
        align-self: stretch;
        flex-grow: 1;
        border-top: 1px solid var(--color-gray-500);
        border-bottom: 1px solid var(--color-gray-500);
    }

    /* Шапка экскурсии */
    .excursion-header {
        h1 {
            font-size: var(--text-xxl);
            margin-bottom: var(--space-vertical-sm);
            color: var(--color-text);
        }
    }

    .meta-info {
        display: flex;
        gap: var(--space-horizontal-md);
        align-items: center;
        flex-wrap: wrap;
    }

    .rating {
        display: flex;
        align-items: center;
        gap: var(--space-horizontal-xs);

        .stars {
            color: var(--color-warning);
            font-size: var(--text-lg);
        }
    }

    .badges {
        display: flex;
        gap: var(--space-horizontal-xs);
    }

    .badge {
        padding: var(--space-vertical-xxs) var(--space-horizontal-sm);
        border-radius: var(--radius-sm);
        font-size: var(--text-xs);
        font-weight: 600;

        &.popular {
            background: var(--color-accent);
            color: var(--color-light);
        }

        &.duration {
            background: var(--color-gray-200);
            color: var(--color-text);
        }
    }

    /* Галерея */
    .gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--space-vertical-sm);

        .primary {
            grid-column: span 2;
        }
    }

    .gallery-image {
        width: 100%;
        height: auto;
        border-radius: var(--radius-md);
        object-fit: cover;
        aspect-ratio: 16/9;
        transition: var(--transition-fast);

        &:hover {
            filter: brightness(0.8);
        }
    }

    /* Основной контент */
    .content-grid {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: var(--space-horizontal-lg);

        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }

    .description {
        h2 {
            font-size: var(--text-xl);
            margin-bottom: var(--space-vertical-sm);
            color: var(--color-text);
        }

        p {
            line-height: var(--line-height-base);
            color: var(--color-gray-700);
        }
    }

    /* Блок бронирования */
    .booking-card {
        background: var(--color-gray-100);
        padding: var(--space-vertical-md);
        border-radius: var(--radius-md);
        align-self: start;
        position: sticky;
        top: var(--space-vertical-md);

        @media (max-width: 768px) {
            position: static;
        }
    }

    .price-block {
        margin-bottom: var(--space-vertical-md);
        text-align: center;

        .price {
            font-size: var(--text-xxl);
            font-weight: 700;
            color: var(--color-primary);
            display: block;
        }

        .per-person {
            font-size: var(--text-sm);
            color: var(--color-gray-600);
        }
    }

    .details {
        display: grid;
        gap: var(--space-vertical-sm);
        margin-bottom: var(--space-vertical-md);

        .detail {
            display: flex;
            justify-content: space-between;

            .label {
                color: var(--color-gray-600);
            }

            .value {
                font-weight: 500;
            }
        }
    }

    .book-button {
        width: 100%;
        padding: var(--space-vertical-sm);
        background: var(--color-primary);
        color: var(--color-light);
        border: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        cursor: pointer;
        transition: var(--transition-fast);

        &:hover {
            background: var(--color-primary-hover);
        }
    }

    /* Страница ошибки */
    .error-page {
        text-align: center;
        padding: var(--space-vertical-xl) var(--space-horizontal-md);

        a {
            color: var(--color-primary);
            display: inline-block;
            margin-top: var(--space-vertical-sm);
        }
    }
</style>
