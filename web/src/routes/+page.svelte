<script lang="ts">
	import Background from '$components/Background.svelte';
	import ShortcutKeysModal from '$components/modals/ShortcutKeysModal.svelte';
	import MusicControl from '$components/MusicControl.svelte';
</script>

<Background />
<div class="fixed z-[123] flex h-screen w-screen flex-col justify-between">
	<div></div>
	<div class="flex w-full items-center justify-center pb-7">
		<MusicControl />
	</div>

	<ShortcutKeysModal />
</div>
