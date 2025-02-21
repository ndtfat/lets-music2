<script lang="ts">
	import Button from './common/Button.svelte';
	import { Icon } from 'svelte-icons-pack';
	import {
		RiMediaSkipBackFill,
		RiMediaSkipForwardFill,
		RiMediaPlayFill,
		RiMediaPauseFill,
		RiMediaRepeatFill,
		RiMediaVolumeUpFill
	} from 'svelte-icons-pack/ri';

	export let playing = true;
</script>

<div class="flex items-center gap-7">
	<Button size={60}>
		<Icon src={RiMediaRepeatFill} size="18" />
	</Button>
	<Button size={60}>
		<Icon src={RiMediaSkipBackFill} size="18" />
	</Button>
	<Button waveEffect={playing}>
		{#if playing}
			<Icon src={RiMediaPauseFill} size="50" />
		{:else}
			<Icon src={RiMediaPlayFill} size="50" />
		{/if}
	</Button>
	<Button size={60}>
		<Icon src={RiMediaSkipForwardFill} size="18" />
	</Button>
	<Button size={60}>
		<Icon src={RiMediaVolumeUpFill} size="18" />
	</Button>
</div>
