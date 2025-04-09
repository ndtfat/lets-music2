<script lang="ts">
	import AudioControl from '$/components/AudioControl.svelte';
	import BackgroundDrawer from '$/components/drawers/BackgroundDrawer.svelte';
	import AuthModal from '$/components/modals/auth/AuthModal.svelte';
	import SettingModal from '$/components/modals/SettingModal.svelte';
</script>

<div class="flex size-full flex-col-reverse">
	<div class="flex w-full items-center justify-center pb-5">
		<AudioControl />
	</div>
</div>

<!-- <ShortcutKeysModal /> -->
<BackgroundDrawer />
<!-- <SettingModal onclose={() => console.log('hehe')} /> -->
<AuthModal type="logIn" onclose={() => {}} />
