const TGMessage = function (data) {
    const chat_id = import.meta.env.VITE_CHAT_ID;
    const uri = import.meta.env.VITE_URI_API_TG;

    if (typeof data !== "object" || data === null) return;

    let message = `<b>Заявка с сайта Экскурсий!</b>\n`;

    for (const [key, value] of Object.entries(data)) {
        message += `<b>${key}: </b>${value || "Не указан"}\n`;
    }

    fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            chat_id: chat_id,
            parse_mode: "html",
            text: message,
        }),
    })
        .then(() => {
            console.log("Запрос отправлен. Спасибо за обращение!");
        })
        .catch(() => {
            console.log("Ошибка при отправке запроса! Попробуйте позже.");
        });
};

export default TGMessage;
