<script>
    import CardList from "$lib/components/blocks/CardList.svelte";
    export let data;
    console.log("====================================");
    console.log(data);
    console.log("====================================");
</script>

<CardList {data} />
