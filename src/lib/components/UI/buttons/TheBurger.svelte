<script>
	export let toggleNav;
	export let isNavOpen;
</script>

<button class="menu burger2" class:open={isNavOpen} onclick={toggleNav} aria-label="Открыть меню">
	<div class="icon"></div>
</button>

<style>
	.icon {
		height: 4px;
		width: 30px;
		top: 13px;
		background-color: var(--foreground);
		border-radius: 20px;
		position: absolute;
		transition-duration: 0.3s;
		z-index: 100;
	}
	.icon:before {
		left: 0;
		position: absolute;
		top: -9px;
		height: 4px;
		width: 30px;
		background-color: var(--foreground);
		content: '';
		border-radius: 20px;
		transition-duration: 0.3s;
		z-index: 100;
	}
	.icon:after {
		left: 0;
		position: absolute;
		top: 9px;
		height: 4px;
		width: 30px;
		background-color: var(--foreground);
		content: '';
		border-radius: 20px;
		transition-duration: 0.3s;
		z-index: 100;
	}

	.menu {
		width: 30px;
		height: 30px;
		position: relative;
		transition-duration: 1s;
		display: none;
		cursor: pointer;
		justify-self: flex-end;
		z-index: 100;
		border: none;
		background: transparent;
	}

	.burger2 .icon {
		transition-duration: 0.3s;
		transition-delay: 0.3s;
	}
	.burger2 .icon:after {
		transition:
			transform 0.3s,
			top 0.3s 0.3s;
	}
	.burger2 .icon:before {
		transition:
			transform 0.3s,
			top 0.3s 0.3s;
	}

	.burger2.open .icon {
		transition-duration: 0.1s;
		transition-delay: 0.3s;
		background: transparent;
	}

	.burger2.open .icon:before {
		transition:
			top 0.3s,
			transform 0.3s 0.3s;
		top: 0px;
		transform: rotateZ(-45deg);
	}

	.burger2.open .icon:after {
		transition:
			top 0.3s,
			transform 0.3s 0.3s;
		top: 0px;
		transform: rotateZ(45deg);
	}

	@media (max-width: 768px) {
		.menu {
			display: inline-block;
		}
	}
	@media (max-width: 480px) {
		.menu {
			width: 1.8rem;
			height: 1.8rem;
		}
	}
</style>
