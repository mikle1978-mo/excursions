<script>
    import { appConfig } from "$lib/config/app.config";
    import { onMount, tick } from "svelte";
    import { locale } from "$lib/stores/locale";
    import { reviews_list } from "$lib/i18n/reviews_list";

    export let data;
    export let system;

    const slug = data.slug || "";
    const reviews = data.reviews || "";
    const lang = system.lang || "en";
    const config = appConfig?.blocks?.reviews;
    let itemSlug = slug;

    // let reviews = [];
    let showForm = false;
    let formEl;
    let name = "";
    let rating = 5;
    let comment = "";
    let isSubmitting = false;
    let error = "";

    // Загрузить отзывы по itemSlug при инициализации
    // onMount(async () => {
    //     if (itemSlug) {
    //         try {
    //             const res = await fetch(`/api/reviews/${itemSlug}`);
    //             if (res.ok) {
    //                 reviews = await res.json();
    //             } else {
    //                 reviews = [];
    //             }
    //         } catch {
    //             reviews = [];
    //         }
    //     }
    // });

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
                    itemSlug,
                    name,
                    rating,
                    comment,
                }),
            });

            const result = await response.json();
            if (!response.ok) {
                if (response.status === 403) {
                    alert(result.error || "Вы уже оставляли отзыв.");
                } else {
                    error = result.error || "Ошибка при отправке отзыва";
                }
                return;
            }

            alert("Спасибо за отзыв!");

            const newReview = result;
            let reviews = [...reviews, newReview];

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

    async function toggleForm() {
        showForm = !showForm;

        if (showForm) {
            await tick();
            formEl?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
</script>

<section class="reviews-section">
    <h2 class="section-title">{reviews_list.title[$locale]}</h2>

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
        <p class="no-reviews">{reviews_list.no_reviews[$locale]}</p>
    {/if}

    <button class="add-review-btn" on:click={toggleForm}>
        {showForm ? reviews_list.cancel[$locale] : reviews_list.take[$locale]}
    </button>

    {#if showForm}
        <form
            class="review-form"
            on:submit|preventDefault={handleSubmit}
            bind:this={formEl}
        >
            <label class="form-label">
                {reviews_list.form_name[$locale]}
                <input
                    id="name"
                    type="text"
                    bind:value={name}
                    placeholder={reviews_list.name_placeholder[$locale]}
                    required
                    class="form-input"
                />
            </label>

            <div>
                <label class="form-label" for="rating"
                    >{reviews_list.rating[$locale]}</label
                >
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
                {reviews_list.comment[$locale]}
                <textarea
                    bind:value={comment}
                    placeholder={reviews_list.comment_placeholder[$locale]}
                    rows="4"
                    required
                    class="form-textarea"
                ></textarea>
            </label>

            <button
                type="submit"
                class="submit-btn"
                id="submit-review"
                disabled={isSubmitting}
            >
                {#if isSubmitting}
                    <span class="loader"></span>
                {/if}
                {reviews_list.submit[$locale]}</button
            >
        </form>
    {/if}
</section>

<style>
    .reviews-section {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: var(--space-vertical-md);
        padding-bottom: var(--space-vertical-md);
        width: 100%;
    }

    .section-title {
        font-size: var(--text-lg);
        margin-bottom: var(--space-vertical-sm);
        color: var(--color-text);
    }

    .review-list {
        list-style: none;
        padding: 0;
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
    @media (prefers-color-scheme: dark) {
        .review-comment {
            color: var(--color-gray-300);
        }
    }

    .no-reviews {
        color: var(--color-gray-500);
        font-style: italic;
        padding-bottom: var(--space-vertical-md);
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
        max-width: 351px;
    }

    .add-review-btn:hover {
        background: var(--color-primary-hover);
    }

    .review-form {
        padding: var(--space-vertical-sm) var(--space-horizontal-md);
        display: flex;
        flex-direction: column;
        gap: var(--space-vertical-sm);
        width: 100%;
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
    .form-input:focus,
    .form-textarea:focus {
        font-size: 16px;
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
