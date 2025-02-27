<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		type,
		disabled = false,
		active = false,
		onclick,
		class: className = ''
	}: {
		children: Snippet;
		type?: 'icon' | 'text' | 'primary';
		disabled?: boolean;
		active?: boolean;
		class?: string;
		onclick?: () => void;
	} = $props();
</script>

<!-- svelte-ignore slot_element_deprecated -->
<button
	class="wrapper flex items-center justify-center {type} {disabled ? 'disabled' : ''} {active
		? 'active'
		: ''} {className}"
	{onclick}
>
	{@render children()}
</button>

<style lang="scss">
	.wrapper {
		cursor: pointer;
		transition: all 0.3s;
		display: inline-flex;
		border-radius: 6px;
		padding: 8px 16px;
		border: 1px solid #ccc;

		&.icon {
			border-radius: 9999px;
			border: none;
			padding: 8px;
		}
		&.text {
			border-color: transparent;
		}
		&.primary {
			border-color: rgb(var(--primary));
			background-color: rgb(var(--primary));
			color: white;
		}

		&.disabled {
			cursor: not-allowed;
			pointer-events: none;
			opacity: 0.5;
		}
		&:hover {
			border-color: rgb(var(--primary));
		}
		&.active {
			background: rgb(var(--primary));
			color: black;
		}
	}
</style>
