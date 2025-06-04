<script>
    import { onMount } from "svelte";
    import { locale } from "$lib/stores/locale";

    console.log("====================================");
    console.log(locale);
    console.log("====================================");

    export let tourSlug = "";

    let reviews = [];
    let showForm = false;
    let name = "";
    let rating = 5;
    let comment = "";
    let isSubmitting = false;
    let error = "";

    // Загрузить отзывы по tourSlug при инициализации
    onMount(async () => {
        if (tourSlug) {
            try {
                const res = await fetch(`/api/reviews/${tourSlug}`);
                if (res.ok) {
                    reviews = await res.json();
                } else {
                    reviews = [];
                }
            } catch {
                reviews = [];
            }
        }
    });

    async function handleSubmit() {
        if (!name.trim() || !comment.trim()) {
            error = "Пожалуйста, заполните все поля.";
            return;
        }

        isSubmitting = true;
        error = "";

        try {
            const response = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    tourSlug,
                    name,
                    rating,
                    comment,
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                console.log("Response not OK:", result);
                if (response.status === 403) {
                    alert(result.error || "Вы уже оставляли отзыв.");
                } else {
                    error = result.error || "Ошибка при отправке отзыва";
                }
                return;
            }

            const newReview = await response.json();
            reviews = [...reviews, newReview];

            name = "";
            rating = 5;
            comment = "";
            showForm = false;
        } catch (err) {
            error = err.message || "Не удалось отправить отзыв";
        } finally {
            isSubmitting = false;
        }
    }

    function setRating(value) {
        rating = value;
    }
</script>

<section class="reviews-section">
    <h2 class="section-title">Отзывы</h2>

    {#if reviews.length > 0}
        <ul class="review-list">
            {#each reviews as review}
                <li class="review-item">
                    <div class="review-header">
                        <strong class="review-name">{review.name}</strong>
                        <span class="review-rating">{review.rating}★</span>
                    </div>
                    <p class="review-date">
                        {new Date(review.createdAt).toLocaleDateString(
                            $locale,
                            {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            }
                        )}
                    </p>
                    <p class="review-comment">{review.comment}</p>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="no-reviews">Пока нет отзывов.</p>
    {/if}

    <button class="add-review-btn" on:click={() => (showForm = !showForm)}>
        {showForm ? "Отменить" : "Оставить отзыв"}
    </button>

    {#if showForm}
        <form class="review-form" on:submit|preventDefault={handleSubmit}>
            <label class="form-label">
                Имя
                <input
                    type="text"
                    bind:value={name}
                    placeholder="Ваше имя"
                    required
                    class="form-input"
                />
            </label>

            <div>
                <label class="form-label" for="rating">Оценка</label>
                <div
                    class="stars"
                    id="rating"
                    role="radiogroup"
                    aria-label="Выберите рейтинг"
                >
                    {#each [1, 2, 3, 4, 5] as star}
                        <span
                            class="star {star <= rating ? 'filled' : ''}"
                            on:click={() => setRating(star)}
                            role="radio"
                            aria-checked={star === rating}
                            tabindex={star === rating ? "0" : "-1"}
                            on:keydown={(e) =>
                                (e.key === "Enter" || e.key === " ") &&
                                setRating(star)}>★</span
                        >
                    {/each}
                </div>
            </div>

            <label class="form-label">
                Комментарий
                <textarea
                    bind:value={comment}
                    placeholder="Комментарий"
                    rows="4"
                    required
                    class="form-textarea"
                ></textarea>
            </label>

            <button type="submit" class="submit-btn">Отправить</button>
        </form>
    {/if}
</section>

<style>
    .reviews-section {
        border-top: 1px solid var(--color-gray-500);
        border-bottom: 1px solid var(--color-gray-500);
        max-width: var(--max-width-container);
    }

    .section-title {
        font-size: var(--text-xl);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }

    .review-list {
        list-style: none;
        padding: 0;
        margin-bottom: var(--space-vertical-md);
    }

    .review-item {
        border: 1px solid var(--color-gray-300);
        padding: var(--space-vertical-sm) var(--space-horizontal-md);
        border-radius: var(--radius-sm);
        margin-bottom: var(--space-vertical-sm);
        background: var(--color-bg);
    }

    .review-header {
        display: flex;
        justify-content: space-between;
        font-weight: 600;
        color: var(--color-text);
        margin-bottom: 0.25rem;
    }

    .review-rating {
        color: var(--color-warning);
        font-size: var(--text-md);
    }

    .review-comment {
        color: var(--color-gray-700);
        margin: 0;
    }

    .no-reviews {
        color: var(--color-gray-500);
        font-style: italic;
    }
    .review-date {
        font-size: 0.875rem;
        color: var(--color-gray-600);
        margin-bottom: var(--space-vertical-xs);
    }

    .add-review-btn {
        background: var(--color-primary);
        color: var(--color-light);
        padding: var(--space-vertical-xs) var(--space-horizontal-md);
        border: none;
        border-radius: var(--radius-sm);
        cursor: pointer;
        font-weight: 600;
        transition: background-color 0.2s ease;
    }

    .add-review-btn:hover {
        background: var(--color-primary-hover);
    }

    .review-form {
        margin-top: var(--space-vertical-md);
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
    }

    .form-label {
        display: flex;
        flex-direction: column;
        font-weight: 600;
        color: var(--color-text);
    }

    .form-input,
    .form-textarea {
        margin-top: var(--space-vertical-xxs);
        padding: var(--space-vertical-xs) var(--space-horizontal-sm);
        border: 1px solid var(--color-gray-300);
        border-radius: var(--radius-sm);
        font-size: var(--text-md);
        color: var(--color-text);
        resize: vertical;
    }

    .stars {
        font-size: var(--text-xxl);
        color: var(--color-gray-400);
        cursor: pointer;
        user-select: none;
        display: inline-flex;
        gap: var(--space-vertical-xxs);
    }

    .star.filled {
        color: var(--color-warning);
    }

    .star:focus {
        outline-offset: 2px;
    }

    .submit-btn {
        background: var(--color-primary);
        color: var(--color-light);
        padding: var(--space-vertical-xs) var(--space-horizontal-md);
        border: none;
        border-radius: var(--radius-sm);
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s ease;
        align-self: flex-start;
    }

    .submit-btn:hover {
        background: var(--color-primary-hover);
    }
</style>
