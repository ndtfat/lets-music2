<script lang="ts">
	import {
		RiMediaVolumeDownLine,
		RiMediaVolumeMuteLine,
		RiMediaVolumeUpLine
	} from 'svelte-icons-pack/ri';
	import IconButton from './IconButton.svelte';

	let props = $props<{
		volume: number;
		muted?: boolean;
		onchange: (value: number) => void;
		onmute: () => void;
	}>();

	let volumnIcon = $state(RiMediaVolumeUpLine);
	$effect(() => {
		if (props.muted) {
			volumnIcon = RiMediaVolumeMuteLine;
		} else {
			if (props.volume >= 70) volumnIcon = RiMediaVolumeUpLine;
			else if (props.volume > 0) volumnIcon = RiMediaVolumeDownLine;
			else volumnIcon = RiMediaVolumeMuteLine;
		}
	});
</script>

<label class="slider">
	<input
		type="range"
		class="level"
		value={props.volume}
		oninput={(e) => props.onchange((e.target as HTMLInputElement).value)}
	/>
	<IconButton icon={volumnIcon} tooltip="Volumn" onclick={props.onmute} />
</label>

<style lang="scss">
	.slider {
		/* slider */
		--slider-width: 100px;
		--slider-height: 6px;
		--slider-bg: #6d6c6c84;
		--slider-border-radius: 999px;
		/* level */
		--level-color: #fff;
		--transition-duration: 0.3s;
	}

	.slider {
		cursor: pointer;
		display: -webkit-inline-box;
		display: -ms-inline-flexbox;
		display: inline-flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: reverse;
		-ms-flex-direction: row-reverse;
		flex-direction: row-reverse;
		-webkit-box-align: center;
		-ms-flex-align: center;
		align-items: center;
	}

	.slider .level {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		height: var(--slider-height);
		background: var(--slider-bg);
		overflow: hidden;
		border-radius: var(--slider-border-radius);
		cursor: inherit;
		transform-origin: right 50%;
		width: 0;
		transition: var(--transition-duration);
	}

	.slider .level::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 0;
		height: 0;
		-webkit-box-shadow: -200px 0 0 200px var(--level-color);
		box-shadow: -200px 0 0 200px var(--level-color);
	}

	.slider:hover .level {
		width: var(--slider-width);
	}
</style>
