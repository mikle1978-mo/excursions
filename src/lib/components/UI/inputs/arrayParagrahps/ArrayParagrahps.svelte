<script>
    import { SUPPORTED_LANGUAGES } from "$lib/constants/supportedLanguages";
    import MyButton from "$lib/components/UI/buttons/MyButton.svelte";

    export let value = []; // [{ text: {ru, en}, image: null }]
    export let field = {};

    function addParagraph() {
        value = [
            ...value,
            {
                text: Object.fromEntries(
                    SUPPORTED_LANGUAGES.map((l) => [l, ""])
                ),
                image: null,
            },
        ];
    }

    function removeParagraph(index) {
        value = value.filter((_, i) => i !== index);
    }

    function updateText(index, lang, text) {
        value[index].text[lang] = text;
        value = [...value];
    }

    function setImage(index, file) {
        if (!file) return;
        const url = URL.createObjectURL(file);
        value[index].image = { url, public_id: "temp" };
        value = [...value];
    }

    function removeImage(index) {
        value[index].image = null;
        value = [...value];
    }
</script>

<div class="array-paragraphs">
    <MyButton size="xs" variant="outline" on:click={addParagraph}>
        Добавить параграф
    </MyButton>

    {#each value as para, i}
        <div class="paragraph-block">
            {#each SUPPORTED_LANGUAGES as lang}
                <textarea
                    bind:value={para.text[lang]}
                    placeholder={`Введите текст (${lang.toUpperCase()})`}
                    on:input={(e) => updateText(i, lang, e.target.value)}
                ></textarea>
            {/each}

            {#if para.image}
                <div class="image-item">
                    <img src={para.image.url} alt="" />
                    <MyButton size="xs" on:click={() => removeImage(i)}
                        >×</MyButton
                    >
                </div>
            {/if}

            {#if field.extra?.imageUploader}
                <input
                    type="file"
                    accept="image/*"
                    on:change={(e) => setImage(i, e.target.files[0])}
                />
            {/if}

            <MyButton
                size="xs"
                variant="secondary"
                on:click={() => removeParagraph(i)}
            >
                Удалить параграф
            </MyButton>
        </div>
    {/each}
</div>

<style>
    .paragraph-block {
        margin-bottom: 1rem;
        border: 1px solid #ddd;
        padding: 0.5rem;
    }
    .image-item {
        position: relative;
    }
    .image-item img {
        max-width: 150px;
        max-height: 100px;
        object-fit: cover;
    }
</style>
