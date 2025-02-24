<script lang="ts">
	import { AiOutlineClose } from 'svelte-icons-pack/ai';
	import Overlay from './Overlay.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { type Snippet } from 'svelte';

	let {
		children,
		width = '60vw',
		title = 'Title',
		onclose
	} = $props<{ children: Snippet; width?: string; title?: string; onclose: () => void }>();

	let isClosed = $state(false);

	const onCloseModal = () => {
		isClosed = true;
		setTimeout(onclose, 200);
	};
</script>

<span class="wrapper {isClosed ? 'closed' : ''}">
	<Overlay>
		<div class="modal" style="--width: {width}">
			<div class="header flex items-center justify-between">
				<h1 class="title">{title}</h1>
				<button
					class="close-btn flex size-[30px] cursor-pointer items-center justify-center rounded-full"
					onclick={onCloseModal}
				>
					<Icon src={AiOutlineClose} size="26" />
				</button>
			</div>
			<div class="content">
				{@render children()}
			</div>
		</div>
	</Overlay>
</span>

<style lang="scss">
	@keyframes appear {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	@keyframes scale {
		from {
			transform: scale(0.8);
		}
		to {
			transform: scale(1);
		}
	}

	.wrapper {
		animation: appear ease-in 0.2s;
		transition: 0.2s ease-in;
		&.closed {
			opacity: 0;
			transform: scale(0.8);
		}
	}

	.modal {
		width: var(--width);
		background: white;
		padding: 12px 20px;
		border-radius: 8px;
		animation:
			appear ease-in 0.2s,
			scale ease-in 0.2s;
	}

	.wrapper.closed .modal {
		animation:
			appear ease-in 0.2s reverse,
			scale ease-in 0.2s reverse;
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
