<script lang="ts">
	import { Icon } from 'svelte-icons-pack';
	import { AiFillSetting, AiOutlinePlus, AiOutlineUser } from 'svelte-icons-pack/ai';
	import { BiSolidUser } from 'svelte-icons-pack/bi';
	import Button from '../buttons/Button.svelte';
	import Drawer from '../common/Drawer.svelte';
	import AddBackgroundModal from '../modals/AddBackgroundModal.svelte';
	let open = $state(true);
	let openAddBg = $state(false);

	const backgrounds = ['/default-bg.mp4'];
	const tabs = [
		{ icon: AiFillSetting, key: 'default', onclick: () => {} },
		{ icon: BiSolidUser, key: 'user', onclick: () => {} },
		{ icon: AiOutlinePlus, key: 'add', onclick: () => (openAddBg = true) }
	];
	const currTab = 'default';
</script>

<Drawer {open} ontoggle={() => (open = !open)}>
	<div class="flex gap-2">
		<div class="tabs-wrapper flex flex-col">
			{#each tabs as tab}
				<Button type="text" class="tab" active={currTab == tab.key} onclick={tab.onclick}>
					<Icon src={tab.icon} />
				</Button>
			{/each}
		</div>
		<div class="bg-wrapper">
			{#each backgrounds as bg}
				<video class="bg-frame" src={bg} autoplay loop muted>
					<track kind="captions" src="captions.vtt" srclang="en" label="English" />
				</video>
			{/each}
		</div>
	</div>
</Drawer>

{#if openAddBg}
	<AddBackgroundModal onclose={() => (openAddBg = false)} />
{/if}

<style lang="scss">
	.tabs-wrapper {
		gap: 4px;
		:global(.tab) {
			color: white;
			font-size: 18px;
			padding: 0 4px;
			flex: 1;
		}
		:global(.tab.active) {
			color: black;
		}
	}

	.bg-wrapper {
		display: flex;
		align-items: center;
		width: 100%;
		gap: 12px;
		overflow-y: auto;
		border-radius: 8px;
		// padding-bottom: 10px;

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
</style>
