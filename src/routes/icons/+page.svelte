<script>
    import { icons } from "$lib/icons/icons.js";
</script>

<div class="grid">
    {#each Object.entries(icons) as [name, Icon]}
        <div class="icon-preview">
            <Icon />
            <span>{name}</span>
        </div>
    {/each}
</div>
