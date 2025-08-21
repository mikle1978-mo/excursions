<script>
    export let item = [];
</script>

{#if item}
    <div class="info-block">
        <div class="info-list">
            <span>{item}</span>
        </div>
    </div>
{/if}

<style>
    .info-block {
        color: var(--color-gray-600);
        background: var(--color-bg);
        line-height: 1.4;
    }

    .info-list {
        list-style: disc inside;
        color: var(--color-gray-700);
        line-height: var(--line-height-base);
    }
    @media (prefers-color-scheme: dark) {
        .info-block {
            color: var(--color-gray-400);
        }
        .info-list {
            color: var(--color-gray-300);
        }
    }
</style>
