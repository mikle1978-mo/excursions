<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { locale } from "$lib/stores/locale.js";

    onMount(() => {
        const storedLang =
            localStorage.getItem("locale") ||
            (navigator.language.startsWith("ru") ? "ru" : "en");
        locale.set(storedLang);
        const currentPath = window.location.pathname;
        const langPrefix = `/${storedLang}`;
        if (!currentPath.startsWith(langPrefix)) {
            goto(langPrefix, { replaceState: true });
        }
    });
</script>

<svelte:head>
    <title>Kemer.app — redirecting...</title>
    <meta name="robots" content="noindex, nofollow" />
</svelte:head>
