<script>
	export let zIndex = 987654321;

	let { onclick }: { onclick?: () => void } = $props();
</script>

<div class="overlay" style="z-index: {zIndex};" {onclick}>
	<slot />
</div>

<style>
	.overlay {
		position: fixed;
		z-index: 987654321;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.6);
		backdrop-filter: blur(5px);
		animation: overlayAppear ease-in-out 0.1s forwards;
	}
</style>
