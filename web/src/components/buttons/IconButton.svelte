<script lang="ts">
	import Tooltip from '$/components/common/Tooltip.svelte';
	import { Icon, type IconType } from 'svelte-icons-pack';
	import WaveButton from './WaveButton.svelte';
	import Button from './Button.svelte';

	const {
		icon,
		tooltip = '',
		wave = false,
		active = false,
		waveEffect = false,
		size = 14,
		...rest
	} = $props();
</script>

<Tooltip text={tooltip}>
	{#if wave}
		<WaveButton {size} {...rest} {waveEffect} {active}>
			<Icon src={icon} {size} />
		</WaveButton>
	{:else}
		<Button class="text-white" type="icon" {active} {...rest}>
			<Icon src={icon} {size} />
		</Button>
	{/if}
</Tooltip>
