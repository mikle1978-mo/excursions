import { CHAT_ID, URI_API_TG } from "$env/static/private";

export async function POST({ request }) {
    console.log("Handler called", CHAT_ID, URI_API_TG);
    const data = await request.json();

    if (typeof data !== "object" || data === null) {
        return new Response(JSON.stringify({ error: "Invalid data" }), {
            status: 400,
        });
    }

    let message = `<b>Заявка с сайта Kemer.app!</b>\n`;

    for (const [key, value] of Object.entries(data)) {
        message += `<b>${key}: </b>${value || "Не указан"}\n`;
    }

    try {
        const response = await fetch(URI_API_TG, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                parse_mode: "html",
                text: message,
            }),
        });

        const json = await response.json();
        console.log("Telegram response:", json);

        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error: `Telegram API error: ${response.status}`,
                    details: json,
                }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return new Response(
            JSON.stringify({ error: "Fetch error", details: error.message }),
            { status: 500 }
        );
    }
}
