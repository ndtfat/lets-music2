<script lang="ts">
	export let color = '124, 216, 4';
	export let size = 100;
	export let waveEffect = false;
	export let hoverEffect = true;
</script>

<!-- svelte-ignore slot_element_deprecated -->
<div
	class="wrapper flex items-center justify-center rounded-full
	{waveEffect ? 'wave' : ''} 
	{hoverEffect ? 'hover' : ''}"
	style="--color: {color}; --size: {size}px;"
>
	<slot />
</div>

<style lang="scss">
	@keyframes wave {
		0% {
			outline: 1px solid rgb(var(--color));
		}
		25% {
			outline: 6px solid rgba(var(--color), 0.8);
		}
		50% {
			outline: 12px solid rgba(var(--color), 0.6);
		}
		80% {
			outline: 18px solid rgba(var(--color), 0.3);
		}
		100% {
			outline: 22px solid transparent;
		}
	}

	.wrapper {
		width: var(--size);
		height: var(--size);
		background: rgb(var(--color));
		color: white;
		box-shadow: 0 0 18px 6px rgba(var(--color), 0.4);
		cursor: pointer;
		transition: all 0.3s;
	}

	.wrapper.hover:hover {
		color: rgb(var(--color));
		background: white;
	}

	.wrapper.wave {
		animation: wave 1s linear infinite;
	}
</style>
