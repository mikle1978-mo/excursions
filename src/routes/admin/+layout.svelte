<script>
    import TheFooter from "$lib/components/layout/TheFooter.svelte";
    import TheHeader from "$lib/components/layout/TheHeader.svelte";
    import { onMount } from "svelte";
    import { initCurrencyService } from "$lib/services/currencyService";

    onMount(() => {
        // Инициализация при загрузке компонента
        initCurrencyService();

        // Можно добавить периодическое обновление
        const interval = setInterval(initCurrencyService, 30 * 60 * 1000);

        return () => clearInterval(interval);
    });

    let { children } = $props();
</script>

<div class="container">
    <div class="page">
        <TheHeader />
        {@render children()}
        <TheFooter />
    </div>
</div>
