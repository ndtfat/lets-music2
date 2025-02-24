<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import Drawer from '../common/Drawer.svelte';
	import { RiSystemAddLine } from 'svelte-icons-pack/ri';
	import AddBackgroundModal from '../modals/AddBackgroundModal.svelte';
	let open = $state(true);
	let openAddBg = $state(false);

	const backgrounds = ['/default-bg.mp4'];
</script>

<Drawer {open} ontoggle={() => (open = !open)}>
	<div class="bg-wrapper">
		{#each backgrounds as bg}
			<video class="bg-frame" src={bg} autoplay loop muted>
				<track kind="captions" src="captions.vtt" srclang="en" label="English" />
			</video>
		{/each}

		<button class="bg-frame add-bg flex-center gap-2" onclick={() => (openAddBg = true)}>
			<Icon src={RiSystemAddLine} size={20} /> Background
		</button>
	</div>
</Drawer>

{#if openAddBg}
	<AddBackgroundModal onclose={() => (openAddBg = false)} />
{/if}

<style lang="scss">
	.bg-wrapper {
		display: flex;
		align-items: center;
		width: 100%;
		gap: 12px;
		overflow-y: auto;
		padding-bottom: 10px;

		&::-webkit-scrollbar-track {
			background: rgba(255, 255, 255, 0.1);
		}
		&::-webkit-scrollbar-thumb {
			height: 20px;
			background: rgba(255, 255, 255, 0.3);
		}
	}
	.bg-frame {
		width: 250px;
		height: 150px;
		object-fit: cover;
		border-radius: 8px;
	}

	.add-bg {
		border: 1px dashed rgba(255, 255, 255, 0.6);
		color: white;
		transition: 0.3s;
		cursor: pointer;
		font-size: 12px;

		&:hover {
			color: rgb(var(--primary));
			border-color: rgb(var(--primary));
		}
	}
</style>
