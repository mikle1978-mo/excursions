<!-- src\routes\(admin)\admin\[type]\+page.svelte -->
<script>
    import AdminItemList from "$lib/admin/components/AdminItemList.svelte";
    export let data;

    // Распаковываем для удобства
    const { type, items, meta } = data.listData;
</script>

<AdminItemList {type} {items} {meta} />
