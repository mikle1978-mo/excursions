<script>
    let loading = false;
    let message = "";

    async function importExcursions() {
        loading = true;
        message = "";

        try {
            const res = await fetch("/api/import-tours", {
                method: "POST",
            });
            const data = await res.json();

            if (res.ok) {
                message = `Успешно импортировано ${data.insertedCount} экскурсий`;
            } else {
                message = `Ошибка: ${data.error || "Неизвестная ошибка"}`;
            }
        } catch (e) {
            message = "Ошибка сети или сервера";
        }

        loading = false;
    }
</script>

<button on:click={importExcursions} disabled={loading}>
    {loading ? "Идёт импорт..." : "Импортировать экскурсии"}
</button>

{#if message}
    <p>{message}</p>
{/if}

<style>
    button {
        padding: 8px 16px;
        background-color: #1e40af; /* синий */
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    button:disabled {
        background-color: #94a3b8; /* серо-голубой */
        cursor: not-allowed;
    }

    p {
        margin-top: 12px;
        font-size: 14px;
        color: #333;
    }
</style>
