<script lang="ts">
	let {
		children,
		type = '',
		disabled = false,
		active = false,
		class: className = '',
		...rest
	} = $props();
</script>

<!-- svelte-ignore slot_element_deprecated -->
<button
	class="wrapper flex items-center justify-center {type} {disabled ? 'disabled' : ''} {active
		? 'active'
		: ''} {className}"
	{...rest}
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

		&:hover {
			opacity: 0.8;
		}

		&.disabled {
			cursor: not-allowed;
			pointer-events: none;
			opacity: 0.5;
		}

		&.active {
			color: rgb(var(--primary));
		}
	}
</style>
