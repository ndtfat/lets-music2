<script lang="ts">
	import { AiOutlineClose } from 'svelte-icons-pack/ai';
	import Overlay from './Overlay.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { type Snippet } from 'svelte';

	let {
		children,
		width = '60vw',
		title,
		hideClose = false,
		hideHeader = false,
		onclose
	}: {
		children: Snippet;
		width?: string;
		title?: string;
		hideClose?: boolean;
		hideHeader?: boolean;
		onclose?: () => void;
	} = $props();

	let isClosed = $state(false);

	const onCloseModal = () => {
		isClosed = true;
		if (onclose) setTimeout(onclose, 200);
	};

	const stopPropagation = (event: Event) => {
		event.stopPropagation();
	};
</script>

<span class="wrapper {isClosed ? 'closed' : ''}" onclick={onCloseModal}>
	<Overlay>
		<div
			class="modal {hideHeader ? 'no-header' : ''}"
			style="--width: {width}"
			onclick={stopPropagation}
		>
			{#if !hideHeader}
				<div class="header flex items-center justify-between bg-neutral-100">
					{#if title}
						<h1 class="title">{title}</h1>
					{:else}
						<span></span>
					{/if}

					{#if !hideClose}
						<button
							class="close-btn flex size-[30px] cursor-pointer items-center justify-center rounded-full"
							onclick={onCloseModal}
						>
							<Icon src={AiOutlineClose} size="26" />
						</button>
					{/if}
				</div>
			{/if}
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

		&.no-header {
			padding-top: 12px;
		}
	}

	.modal {
		width: var(--width);
		background: white;
		border-radius: 8px;
		overflow: hidden;
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
		padding: 12px 20px;
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
		padding: 0 20px 12px;
		max-height: var(--modal-max-h) + 12px;
		overflow: auto;
	}
</style>
