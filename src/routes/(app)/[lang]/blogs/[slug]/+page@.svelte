<script>
    import BlogDetailPage from "$lib/components/blocks/BlogDetailPage.svelte";
    import { locale } from "$lib/stores/locale";
    import { blog_page } from "$lib/i18n/blog_page.js";

    export let data; // данные из load функции
    const { item, reviewsCount, rating } = data;
</script>

<BlogDetailPage
    type="blog"
    {item}
    {rating}
    {reviewsCount}
    locale={$locale}
    translations={blog_page}
/>
