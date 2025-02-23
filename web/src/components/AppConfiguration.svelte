<script>
	import { userConfiguration } from '$store/userConfiguration.svelte';
	let { children } = $props();
</script>

<video
	class="fixed h-screen w-screen object-cover"
	src={userConfiguration.value.background}
	autoplay
	loop
	muted
>
	<track kind="captions" src="captions.vtt" srclang="en" label="English" />
</video>

<div class="fixed z-[123] h-screen w-screen" style="--primary: {userConfiguration.value.color}">
	{@render children()}
</div>
