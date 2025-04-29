<script>
	import { onMount } from 'svelte';
	import TheSocial from '$lib/components/layout/TheSocial.svelte';
	import TheButton from '$lib/components/UI/buttons/TheButton.svelte';
	import Copyright from '$lib/components/layout/Copyright.svelte';
	import { nav_items } from '$lib/data/nav_list';
	import { locale, setLocale } from '$lib/stores/locale.js';

	let isMounted = false;
	export let isOpen = false;
	export let closeNav;
	export let toggleOpen;

	let openSubmenu = null;

	const handleOrderClick = () => {
		closeNav();
		toggleOpen();
	};

	const toggleSubmenu = (index) => {
		openSubmenu = openSubmenu === index ? null : index;
	};

	onMount(() => {
		isMounted = true;
	});
</script>

<!-- Затемненный фон -->
<div
	class="nav_overlay"
	class:open={isOpen}
	onclick={closeNav}
	onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			closeNav();
		}
	}}
	role="button"
	tabindex="0"
	aria-label="Закрыть меню"
></div>

<nav class="mnavigation" class:open={isOpen}>
	<ul>
		{#each nav_items as item}
			<li>
				{#if item.link}
					<a href={`/${$locale}${item.link}`} rel={item.rel} onclick={closeNav}>
						{@html item[`title_${$locale}`]}
					</a>
				{:else}
					<span>{@html item[`title_${$locale}`]}</span>
					<ul>
						{#each item.submenu as sub}
							<li>
								<a href={`/${$locale}${sub.link}`} rel={sub.rel} onclick={closeNav}>
									{@html sub[`title_${$locale}`]}
								</a>
							</li>
						{/each}
					</ul>
				{/if}
			</li>
		{/each}
	</ul>

	<div class="socials_wrapper">
		<TheSocial />
	</div>
	<Copyright />
</nav>

<style>
	.mnavigation {
		display: none;
	}

	@media (max-width: 768px) {
		.nav_overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.205);
			z-index: 6;
			transition: opacity 0.3s ease-in-out;
			overflow: hidden;
		}

		.nav_overlay.open {
			display: block;
			opacity: 1;
		}

		/* Навигационное меню */
		.mnavigation {
			position: fixed;
			top: 0;
			right: -100%;
			width: 60%;
			height: 100%;
			background: var(--background);
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: center;
			z-index: 7;
			overflow-y: auto;
			transition: right 0.4s ease-in-out;
			padding: 6rem 1rem 1rem;
			font-size: var(--fz-normal);
			box-shadow: var(--boxshadow);
			border-radius: 0 0 0 0.5rem;
		}

		.mnavigation.open {
			right: 0;
		}

		.mnavigation ul {
			width: 100%;
			padding: 0;
			display: flex;
			flex-direction: column;
			list-style-type: none;
			gap: 1rem;
		}

		.mnavigation ul li {
			padding: 0.5rem 0.8rem;
			width: 100%;
			text-align: left;
			border-radius: 0.5rem;
			transition: background-color 0.2s ease;
		}

		.mnavigation ul li:hover {
			background-color: var(--primary);
		}

		/* .mnavigation ul li > span {
			display: flex;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;
		} */

		.mnavigation ul li ul {
			display: none;
			padding-left: 1rem;
			margin-top: 0.5rem;
			border-left: 2px solid var(--primary);
		}

		.mnavigation ul li ul li {
			padding: 0.5rem 0.5rem;
			font-size: var(--fz-normal);
			background-color: var(--primary);
			border-radius: 0.3rem;
		}

		.mnavigation ul li ul li:hover {
			background-color: var(--primary);
			color: var(--foreground);
		}

		.socials_wrapper {
			margin-top: auto;
		}
	}
	@media (max-width: 480px) {
		.mnavigation {
			padding: 5rem 1rem 1rem;
		}

		.mnavigation ul {
			gap: 0.3rem;
		}

		.mnavigation ul li {
			padding: 0.4rem 0.7rem;
		}

		.socials_wrapper {
			margin-top: auto;
		}
	}
</style>
