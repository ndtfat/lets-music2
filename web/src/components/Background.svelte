<script lang="ts">
	// '/default-bg.mp4';
	export let bgUrl: string = '/default-bg.mp4';
</script>

<video class="fixed h-screen w-screen object-cover" src={bgUrl} autoplay loop muted>
	<track kind="captions" src="captions.vtt" srclang="en" label="English" />
</video>
