<script lang="ts">
	let { zIndex = 987654321, onclick }: { zIndex?: number; onclick?: () => void } = $props();

	const stopPropagation = (event: Event) => {
		event.stopPropagation();
	};
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div role="button" class="overlay" style="z-index: {zIndex};" {onclick}>
	<!-- svelte-ignore slot_element_deprecated -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={stopPropagation}>
		<slot />
	</div>
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
		/* background: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(5px); */
		/* From https://css.glass */
		background: rgba(0, 0, 0, 0.2);
		border-radius: 16px;
		box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
		animation: overlayAppear ease-in-out 0.1s forwards;
	}
</style>
