<script lang="ts">
	import { userConfiguration } from '$/store/userConfiguration.svelte';
	import {
		RiMediaPauseFill,
		RiMediaPlayFill,
		RiMediaPlayListLine,
		RiMediaRepeatLine,
		RiMediaShuffleLine,
		RiMediaSkipBackFill,
		RiMediaSkipForwardFill,
		RiSystemAddLine
	} from 'svelte-icons-pack/ri';
	import WaveSurfer from 'wavesurfer.js';
	import IconButton from './buttons/IconButton.svelte';
	import { onMount } from 'svelte';
	import { formatTime } from '../ultils/time';
	import VolumnButton from './buttons/VolumnButton.svelte';
	import type { KeyboardEventHandler } from 'svelte/elements';

	let trackContainer: HTMLDivElement | null = null;
	let audioTrack = $state<WaveSurfer | null>(null);
	let songThumbnail = $state('');

	let muted = $state(false);
	let volume = $state(100);
	let loading = $state(true);
	let isPlaying = $state(false);
	let isRepeat = $state(false);
	let timeRemain = $state(0);

	onMount(() => {
		if (trackContainer) {
			audioTrack = WaveSurfer.create({
				container: trackContainer,
				waveColor: '#6d6c6c84',
				progressColor: `rgb(${userConfiguration.value.color})`,
				url: `luther.mp3`,
				barWidth: 3,
				barHeight: 1,
				barGap: 1,
				height: 24,
				backend: 'MediaElement',
				cursorColor: 'transparent',
				autoplay: false
			});

			audioTrack.on('ready', () => (loading = false));
			audioTrack.on('finish', () => {
				if (isRepeat) {
					audioTrack?.load('luther.mp3');
				} else {
					loading = true;
					onNext();
				}
			});
			audioTrack.on('seeking', (currentTime) => {
				if (audioTrack) {
					timeRemain = audioTrack.getDuration() - currentTime;
				}
			});
			audioTrack.on('audioprocess', (currentTime) => {
				if (audioTrack) {
					timeRemain = audioTrack.getDuration() - currentTime;
				}
			});
		}
	});

	const onMute = () => {
		audioTrack?.setMuted(!muted);
		muted = !muted;
	};
	const onRepeat = () => {
		isRepeat = !isRepeat;
	};
	const onVloume = (val: number) => {
		audioTrack?.setVolume(val / 100);
		volume = val;
	};
	const onIncVolume = () => {
		volume = Math.min(100, volume + 5);
		audioTrack?.setVolume(volume / 100);
	};
	const onDecVolume = () => {
		volume = Math.max(0, volume - 5);
		audioTrack?.setVolume(volume / 100);
	};
	const onSeekForward = () => {
		audioTrack?.setTime(audioTrack.getCurrentTime() + 5);
	};
	const onSeekBackward = () => {
		audioTrack?.setTime(audioTrack.getCurrentTime() - 5);
	};
	const onBack = () => {
		loading = true;
		audioTrack?.load('luther.mp3');
	};
	const onNext = () => {
		loading = true;
		audioTrack?.load('luther.mp3');
	};
	const onPlayPause = () => {
		audioTrack?.playPause();
		isPlaying = !isPlaying;
	};

	const onkeydown: KeyboardEventHandler<HTMLElement> = (e) => {
		const mapAction: Record<string, () => void> = {
			m: onMute,
			r: onRepeat,
			[' ']: onPlayPause,
			ArrowUp: onIncVolume,
			ArrowDown: onDecVolume,
			ArrowLeft: onSeekBackward,
			ArrowRight: onSeekForward
		};
		const mapShiftAction: Record<string, () => void> = {
			ArrowLeft: onBack,
			ArrowRight: onNext
		};

		if (e.shiftKey) {
			if (Object.hasOwn(mapShiftAction, e.key)) {
				mapShiftAction[e.key]();
			}
		} else {
			if (Object.hasOwn(mapAction, e.key)) {
				mapAction[e.key]();
			}
		}
	};
</script>

<svelte:body {onkeydown} />

<div class="wrapper flex-center">
	<div class="flex-center gap-2">
		<img
			class="size-[36px] rounded-lg object-cover"
			src={songThumbnail}
			alt="thumbnail"
			onerror={() => (songThumbnail = 'thumbnail-default.png')}
		/>
		<div class="w-[120px] text-sm">
			<p class="truncate text-[12px] text-zinc-400">Phat Nguyen</p>
			<p class="truncate text-zinc-200">Luther</p>
		</div>
	</div>

	<div class="flex-center gap-2">
		<IconButton icon={RiMediaSkipBackFill} tooltip="Prev" onclick={onBack} />
		<IconButton
			icon={isPlaying ? RiMediaPauseFill : RiMediaPlayFill}
			wave={true}
			size={20}
			tooltip="Play/Pause"
			onclick={onPlayPause}
			waveEffect={isPlaying || false}
		/>
		<IconButton icon={RiMediaSkipForwardFill} tooltip="Next" onclick={onNext} />
	</div>

	<div class="track-wrapper flex-center gap-3">
		<div bind:this={trackContainer} class="track {loading ? 'loading' : ''}"></div>
		<!-- <Stretch size="30" color="#FF3E00" unit="px" duration="1s" /> -->
		<p class="time">{formatTime(timeRemain)}</p>
	</div>

	<div class="relative flex w-[154px] flex-row-reverse gap-2">
		<IconButton icon={RiSystemAddLine} tooltip="Add" disabled />

		<div class="vol-icon absolute right-[34px]">
			<VolumnButton {muted} onmute={onMute} {volume} onchange={onVloume} />
		</div>
		<span class="flex gap-2 transition-[0.3s]">
			<IconButton icon={RiMediaRepeatLine} tooltip="Shuffle" active={isRepeat} onclick={onRepeat} />
			<IconButton icon={RiMediaPlayListLine} tooltip="Playlist" />
			<div class="size-[30px]"></div>
		</span>
	</div>
</div>

<style>
	.wrapper {
		gap: 32px;
		padding: 8px 12px;
		border-radius: 24px;
		background-color: #0303039c;
	}

	.track-wrapper {
		width: 20vw;
	}
	.track {
		width: 100%;
		transform: scaleX(1);
		transition: 0.3s;
	}
	.track.loading {
		transform: scaleX(0);
	}

	.time {
		color: #d4d4d8;
		font-size: 12px;
		font-variant-numeric: tabular-nums;
	}

	.vol-icon:hover + span {
		opacity: 0;
		pointer-events: none;
	}
</style>
