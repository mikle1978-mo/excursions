<script>
    import { locale, setLocale } from "$lib/stores/locale.js";
    import { nav_items } from "$lib/data/nav_list.js";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
</script>

<side class="side"> Sidebar</side>

<style>
    .side {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 768px) {
        .side {
            display: none;
        }
    }
</style>
