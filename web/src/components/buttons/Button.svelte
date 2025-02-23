<script lang="ts">
	let {
		children,
		type = 'text',
		disabled = false,
		active = false,
		class: className = '',
		...rest
	} = $props();
</script>

<!-- svelte-ignore slot_element_deprecated -->
<div
	class="wrapper flex items-center justify-center
		{type === 'icon' ? 'rounded-full p-2' : 'rounded-md px-4 py-2'} 
		{disabled ? 'disabled' : ''} 
		{active ? 'active' : ''} 
		{className}"
	{...rest}
>
	{@render children()}
</div>

<style lang="scss">
	.wrapper {
		cursor: pointer;
		transition: all 0.3s;
		display: inline-flex;

		&:hover {
			background-color: rgba(0, 0, 0, 0.3);
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
