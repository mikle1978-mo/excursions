// src/routes/login/+page.server.js
import { redirect, fail } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

const ADMIN_USERNAME = env.ADMIN_USERNAME;
const ADMIN_PASSWORD = env.ADMIN_PASSWORD;

export const actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");

        const session = cookies.get("session");
        if (session === "admin-session") {
            throw redirect(303, "/admin");
        }

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            cookies.set("session", "admin-session", {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 5, // 5 дней
            });
            throw redirect(303, "/admin");
        }

        return fail(400, { error: "Неверный логин или пароль" });
    },
};
