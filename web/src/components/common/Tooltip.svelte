<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';

	export let text: Snippet;
	export let position: 'top' | 'bottom' | 'left' | 'right' = 'top';
	export let delay: number = 1000;

	let showTooltip = false;
	let timeoutId: ReturnType<typeof setTimeout>;
	let tooltipElement: HTMLDivElement | null = null;
	let containerElement: HTMLDivElement | null = null;
	let tooltipPosition: { top?: string; left?: string; bottom?: string; right?: string } = {
		top: '0px',
		left: '0px',
		bottom: '0px',
		right: '0px'
	};

	function handleMouseEnter() {
		timeoutId = setTimeout(async () => {
			if (containerElement && tooltipElement) {
				const rect = containerElement.getBoundingClientRect();
				const tooltipRect = tooltipElement.getBoundingClientRect() || { width: 0, height: 0 };
				const spacing = 6;

				const positions = {
					top: {
						top: `${rect.top - rect.height - spacing}px`,
						left: `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`
					},
					bottom: {
						top: `${rect.top + rect.height + spacing}px`,
						left: `${rect.left + rect.width / 2 - tooltipRect.width / 2}px`
					},
					left: {
						top: `${rect.top + rect.height / 2 - tooltipRect.height / 2}px`,
						left: `${rect.left - tooltipRect.width - spacing}px`
					},
					right: {
						top: `${rect.top + rect.height / 2 - tooltipRect.height / 2}px`,
						left: `${rect.right + spacing}px`
					}
				};
				console.log({ rect, tooltipRect, positions });
				tooltipPosition = positions[position];
				showTooltip = true;
			}
		}, delay);
	}

	function handleMouseLeave() {
		clearTimeout(timeoutId);
		showTooltip = false;
	}

	onDestroy(() => {
		clearTimeout(timeoutId);
	});
</script>

<div
	bind:this={containerElement}
	class="tooltip-container"
	role="tooltip"
	on:mouseenter={handleMouseEnter}
	on:mouseleave={handleMouseLeave}
	on:focus={handleMouseEnter}
	on:blur={handleMouseLeave}
>
	<slot />
</div>

<!-- {#if showTooltip} -->
<div
	bind:this={tooltipElement}
	class="tooltip {position} {showTooltip ? 'show' : ''}"
	style="
			top: {tooltipPosition.top}; 
			left: {tooltipPosition.left}; 
			bottom: {tooltipPosition.bottom}; 
			right: {tooltipPosition.right}
		"
>
	{text}
</div>

<!-- {/if} -->

<style>
	.tooltip-container {
		display: inline-block;
	}

	.tooltip {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.8);
		color: white;
		padding: 6px 10px;
		border-radius: 4px;
		font-size: 14px;
		white-space: nowrap;
		pointer-events: none;
		z-index: 9999;
		width: fit-content;
		height: fit-content;
		opacity: 0;
	}

	.tooltip.show {
		opacity: 1;
	}
</style>
