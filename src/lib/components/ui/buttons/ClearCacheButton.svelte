<script>
    import IconClock from "$lib/icons/IconClock.svelte";

    let loading = false;

    async function clearCache() {
        if (loading) return;

        if (!confirm("Вы действительно хотите очистить весь кеш?")) return;

        loading = true;

        try {
            const res = await fetch("/api/cache/clear", { method: "POST" });

            if (!res.ok) {
                throw new Error(`Ошибка сервера: ${res.status}`);
            }

            const data = await res.json();

            if (data.success) {
                alert(`Кеш очищен\n${data.message}`);
            } else {
                alert("Ошибка очистки кеша");
            }
        } catch (e) {
            console.error(e);
            alert("Сервер недоступен: " + e.message);
        } finally {
            loading = false;
        }
    }
</script>

<button
    on:click={clearCache}
    disabled={loading}
    class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-40"
>
    <IconClock />
    {loading ? "Очищается..." : "Очистить кеш"}
</button>

<style>
    button {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: var(--space-horizontal-sm);
        font-size: var(--text-md);
        padding: var(--space-vertical-sm) var(--space-horizontal-sm);
        background-color: var(--color-accent);
        color: var(--color-light);
        border: none;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-md);
        text-align: center;
        transition: background-color var(--transition-fast);
    }

    button:hover {
        background-color: var(--color-primary-hover);
    }
</style>
