<script lang="ts">
	import type { Position } from '$/types/common';
	import type { Snippet } from 'svelte';
	import { Icon } from 'svelte-icons-pack';
	import { RiArrowsArrowUpWideFill, RiArrowsArrowDownWideFill } from 'svelte-icons-pack/ri';

	let {
		open,
		position = 'top',
		width,
		height,
		ontoggle,
		children
	} = $props<{
		open: boolean;
		position?: Position;
		width?: string;
		height?: string;
		ontoggle?: () => void;
		children: Snippet;
	}>();
</script>

<div class="drawer {open ? 'open' : ''} {position}" style="width: {width}; height: {height};">
	{@render children()}
	<button class="toggle flex-center" onclick={ontoggle}>
		<Icon src={open ? RiArrowsArrowUpWideFill : RiArrowsArrowDownWideFill} />
	</button>
</div>

<style lang="scss">
	.drawer {
		z-index: var(--drawer-z);
		opacity: 0.5;
		position: fixed;
		transition: 0.2s ease-in;
		background-color: #030303af;

		&:hover {
			opacity: 1;
		}

		&.top {
			width: 80vw;
			top: 0;
			left: 50%;
			transform: translate(-50%, -100%);
			border-radius: 0 0 16px 16px;
			padding: 10px;
		}
	}

	.drawer.open {
		opacity: 1;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
		&.top {
			transform: translate(-50%, 0);
		}
	}

	.toggle {
		cursor: pointer;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		color: white;
		top: 100%;
		padding: 0px 40px 6px;
		background-color: #030303af;
		border-radius: 0 0 999999px 999999px;
	}
</style>
