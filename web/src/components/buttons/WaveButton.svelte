<script lang="ts">
	let {
		size = 100,
		active = false,
		waveEffect = true,
		hoverEffect = true,
		children,
		...rest
	} = $props();
</script>

<!-- svelte-ignore slot_element_deprecated -->
<div
	class="
		wrapper flex items-center justify-center rounded-full
		{waveEffect ? 'wave' : ''} 
		{hoverEffect ? 'hover' : ''}
		{active ? 'active' : ''}
	"
	style="--size: {size}px;"
	{...rest}
>
	{@render children()}
</div>

<style lang="scss">
	@keyframes wave {
		0% {
			box-shadow: 0 0 0 0 rgba(var(--primary), 0.8);
		}
		25% {
			box-shadow: 0 0 0 calc(var(--size) * 0.15) rgba(var(--primary), 0.6);
		}
		50% {
			box-shadow: 0 0 0 calc(var(--size) * 0.3) rgba(var(--primary), 0.4);
		}
		80% {
			box-shadow: 0 0 0 calc(var(--size) * 0.45) rgba(var(--primary), 0.2);
		}
		100% {
			box-shadow: 0 0 0 calc(var(--size) * 0.6) rgba(var(--primary), 0);
		}
	}

	.wrapper {
		padding: 8px;
		background: rgb(var(--primary));
		color: white;
		box-shadow: 0 0 18px 4px rgba(var(--primary), 0.4);
		cursor: pointer;
		transition: all 0.3s;
	}

	.wrapper.active,
	.wrapper.hover:hover {
		color: rgb(var(--primary));
		background: white;
	}

	.wrapper.wave {
		animation: wave 1s linear infinite;
	}
</style>
