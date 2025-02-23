<script lang="ts">
	export let text: string;
	export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
	export let delay: number = 1000;

	let showTooltip = false;
	let timeoutId: ReturnType<typeof setTimeout>;

	function handleMouseEnter() {
		timeoutId = setTimeout(() => {
			showTooltip = true;
		}, delay);
	}

	function handleMouseLeave() {
		clearTimeout(timeoutId);
		showTooltip = false;
	}
</script>

<div
	class="tooltip-container"
	role="tooltip"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:focus={handleMouseEnter}
	on:blur={handleMouseLeave}
>
	<slot />

	{#if showTooltip}
		<div class="tooltip {position}">
			{text}
		</div>
	{/if}
</div>

<style>
	.tooltip-container {
		position: relative;
		display: inline-block;
	}

	.tooltip {
		position: absolute;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 6px 10px;
		border-radius: 4px;
		font-size: 14px;
		white-space: nowrap;
		pointer-events: none;
	}

	/* Vị trí tooltip */
	.tooltip.top {
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-bottom: 6px;
	}
	.tooltip.bottom {
		top: 100%;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 6px;
	}
	.tooltip.left {
		right: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-right: 6px;
	}
	.tooltip.right {
		left: 100%;
		top: 50%;
		transform: translateY(-50%);
		margin-left: 6px;
	}
</style>
