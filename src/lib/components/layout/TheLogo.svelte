<script>
    import IconLogo from "$lib/icons/IconLogo.svelte";
</script>

<div class="logo">
    <a href="/" class="img_wrap" nofollow aria-label="На главную">
        <!-- <img src="/images/other/logo_96x96.svg" alt="logo" /> -->

        <IconLogo class="img_wrap" />
    </a>
</div>

<style>
    .logo {
        width: auto;
        height: 100%;
        max-height: 100%;
        cursor: pointer;
    }
    .img_wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
        height: 100%;
        overflow: hidden;
        color: var(--color-secondary);
    }
</style>
