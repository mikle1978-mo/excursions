<script>
    export let locale;
    const text = {
        ru: "Если вам нравится наш проект — нажмите на кнопку и угостите нас кофе ☕",
        en: "If you like our project — click the button and buy us a coffee ☕",
        tr: "Projemizi beğendiyseniz — düğmeye tıklayın ve bize bir kahve ısmarlayın ☕",
    };
</script>

<div class="buy-me-a-coffee">
    <div class="text">{text[locale]}</div>
    <div style="text-align: center;">
        <a href="https://www.buymeacoffee.com/kemer.app" target="_blank">
            <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy Me A Coffee"
                style="height: 50px; width: 181px;"
            />
        </a>
    </div>
</div>

<style>
    .buy-me-a-coffee {
        display: flex;
        flex-direction: column;
        gap: var(--text-md);
        background-color: var(--color-background-light);
    }
    .text {
        font-size: var(--text-md);
        line-height: 1.6;
        text-align: center;
    }
</style>
