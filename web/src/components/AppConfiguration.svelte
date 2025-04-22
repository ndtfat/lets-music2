<script>
	import { userConfiguration } from '$/store/userConfiguration.store';
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

<div
	class="fixed h-screen w-screen"
	style="--primary: {userConfiguration.value.color}; z-index: var(--app-content-z);"
>
	{@render children()}
</div>
