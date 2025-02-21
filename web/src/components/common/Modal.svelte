<script lang="ts">
	import { AiOutlineClose } from 'svelte-icons-pack/ai';
	import Overlay from './Overlay.svelte';
	import { Icon } from 'svelte-icons-pack';

	export let width: string = '60vw';
	export let title = 'Title';
</script>

<Overlay>
	<div class="modal" style="--width: {width}">
		<div class="header flex items-center justify-between">
			<h1 class="title">{title}</h1>
			<button
				class="close-btn flex size-[30px] cursor-pointer items-center justify-center rounded-full"
			>
				<Icon src={AiOutlineClose} size="26" />
			</button>
		</div>
		<div class="content">
			<slot />
		</div>
	</div>
</Overlay>

<style lang="scss">
	.modal {
		width: var(--width);
		background: white;
		padding: 12px 20px;
		border-radius: 8px;
	}

	.header {
		margin-bottom: 12px;
		border-bottom: 1px dashed #0000001f;

		.title {
			font-size: 34px;
		}

		.close-btn {
			transition: 0.2s;
		}
		.close-btn:hover {
			background: #cccccc78;
		}
	}

	.content {
		max-height: calc(80vh - 64px);
		overflow: auto;
	}
</style>
