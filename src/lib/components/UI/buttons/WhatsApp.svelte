<script>
    import IconWhatsapp from "$lib/icons/IconWhatsapp.svelte";
</script>

<a
    href="https://wa.me/message/P3KXH7AFMVV4C1"
    class="whatsapp-btn"
    aria-label="Ватсап: +905356062642"
    rel="nofollow"
>
    <div class="btn-icon">
        <IconWhatsapp name="whatsapp" />
    </div>
    <span class="btn-text">WhatsApp</span>
    <span class="pulse-dot"></span>
</a>

<style>
    .whatsapp-btn {
        position: fixed;
        top: 200px;
        right: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background-color: var(--color-primary);
        z-index: 999;
        color: #000000;
        padding: 9px 4px;
        border-radius: 0 6px 6px 0;
        transform: rotate(180deg);
        writing-mode: vertical-rl;
        text-decoration: none;
        box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
    }

    .btn-icon {
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .btn-icon :global(svg) {
        width: 100%;
        height: 100%;
        fill: currentColor;
    }

    .btn-text {
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 0.5px;
    }

    .pulse-dot {
        display: block;
        width: 8px;
        height: 8px;
        background-color: red;
        border-radius: 50%;
        animation: pulse 0.8s infinite alternate;
    }

    @keyframes pulse {
        0% {
            transform: scale(0.9);
            opacity: 0.8;
        }
        100% {
            transform: scale(1.1);
            opacity: 1;
        }
    }
</style>
