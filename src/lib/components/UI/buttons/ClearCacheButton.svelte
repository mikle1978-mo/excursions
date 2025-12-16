<script>
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
    {loading ? "Очищается..." : "Очистить кеш"}
</button>
