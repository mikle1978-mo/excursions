import cloudinary from "$lib/server/db/cloudinary";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    const data = await request.formData();

    const file = data.get("file");
    const folder = data.get("folder") || "default"; // ← папка по умолчанию, если не передали

    if (!file) {
        return json({ error: "Файл не найден" }, { status: 400 });
    }

    const buffer = await file.arrayBuffer();
    const cloudinaryFolder = `tours/${folder}`;
    try {
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: cloudinaryFolder }, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                })
                .end(Buffer.from(buffer));
        });
        return json({
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id, // ⚠️ это важно для удаления потом
        });
    } catch (error) {
        return json(
            { error: "Ошибка загрузки на Cloudinary" },
            { status: 500 }
        );
    }
}

export async function DELETE({ request }) {
    const url = new URL(request.url);
    const public_id = url.searchParams.get("public_id");

    if (!public_id) {
        return json({ error: "Нет public_id" }, { status: 400 });
    }

    if (!public_id.startsWith("tours/")) {
        return json({ error: "Недопустимый public_id" }, { status: 400 });
    }

    try {
        await cloudinary.uploader.destroy(public_id);
        return json({ success: true });
    } catch (error) {
        console.error("Cloudinary delete error:", error.message);
        return json({ error: "Ошибка при удалении" }, { status: 500 });
    }
}
