export default async function TGMessage(data) {
    try {
        const response = await fetch("/api/telegram", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json();

        if (response.ok) {
            console.log("Сообщение успешно отправлено");
        } else {
            console.error("Ошибка отправки:", result.error);
        }
    } catch (e) {
        console.error("Ошибка сети или сервера", e);
    }
}
