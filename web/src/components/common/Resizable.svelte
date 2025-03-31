<script lang="ts">
	export let min: number;
	export let max: number;
	export let initial: number = min;
	let width = initial;
	let startX: number;
	let isResizing = false;

	function onmousedown(event: MouseEvent) {
		isResizing = true;
		startX = event.clientX;
		window.addEventListener('mousemove', onMouseMove);
		window.addEventListener('mouseup', onMouseUp);
	}

	function onMouseMove(event: MouseEvent) {
		if (!isResizing) return;
		const delta = event.clientX - startX;
		width = Math.min(max, Math.max(min, width + delta));
		startX = event.clientX;
	}

	function onMouseUp() {
		isResizing = false;
		window.removeEventListener('mousemove', onMouseMove);
		window.removeEventListener('mouseup', onMouseUp);
	}
</script>

<div class="resize-wrapper" style={`width: ${width}px;`}>
	<div class="content">
		<slot></slot>
	</div>
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="resizer" {onmousedown}></div>
</div>

<style>
	.resize-wrapper {
		display: flex;
		position: relative;
	}
	.resizer {
		border-right: 1px dashed #ccc;
		cursor: ew-resize;
		padding-inline: 4px;
	}
	.content {
		flex: 1;
		overflow: hidden;
	}
</style>
