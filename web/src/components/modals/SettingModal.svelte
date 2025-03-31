<script lang="ts">
	import { BsLock, BsPerson, BsWindowDock } from 'svelte-icons-pack/bs';
	import Modal from '../common/Modal.svelte';
	import Resizable from '../common/Resizable.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { startCase } from '$/ultils/string';
	type Props = {
		onclose: () => void;
	};
	const { onclose }: Props = $props();

	let currTab = $state('personal');
	const leftItems = [
		{ key: 'personal', icon: BsPerson },
		{ key: 'password', icon: BsLock },
		{ key: 'apperance', icon: BsWindowDock }
	];
</script>

<Modal title="Setting" {onclose}>
	<div class="wrapper">
		<Resizable min={150} initial={200} max={300}>
			<div class="left-side">
				{#each leftItems as item}
					<button
						class="left-item flex cursor-pointer items-center gap-2 rounded p-2 {currTab == item.key
							? 'active'
							: ''}"
						onclick={() => (currTab = item.key)}
					>
						<Icon src={item.icon} />
						<p class="text-[16px]">{startCase(item.key)}</p>
					</button>
				{/each}
			</div>
		</Resizable>
		<div class="right-side"></div>
	</div>
</Modal>

<style lang="scss">
	.wrapper {
		display: flex;
		height: var(--modal-max-h);
	}

	.left-side {
		gap: 4px;
		display: flex;
		flex-direction: column;
		.left-item {
			transition: 0.3s;
		}
		.left-item:hover {
			background-color: #efefef;
		}
		.left-item.active {
			background-color: rgb(var(--primary));
		}
	}
	.right-side {
		flex: 1;
	}
</style>
