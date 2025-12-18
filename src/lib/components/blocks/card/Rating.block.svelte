<script>
    import Rating from "$lib/components/ui/rating/Rating.svelte";
    export let data;
    const { value, count } = data;
</script>

<Rating rating={value} reviewCount={count} />
