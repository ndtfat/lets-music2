<script lang="ts">
	import Modal from '$components/common/Modal.svelte';
	import { Icon } from 'svelte-icons-pack';
	import { TrFillSquareRoundedLetterM } from 'svelte-icons-pack/tr';

	const shortcutKeys = [
		{
			type: 'Music control',
			shortcut: [
				{ keys: ['M'], description: 'Mute' },
				{ keys: ['Shift', '>'], description: 'Next song' },
				{ keys: ['Space'], description: 'Play/Pause' },
				{ keys: ['Shift', '<'], description: 'Previous song' }
			]
		},
		{
			type: 'Configuration',
			shortcut: []
		}
	];
</script>

<Modal title="Shortcut Keys" width="600px">
	<div class="flex flex-col gap-4">
		{#each shortcutKeys as { type, shortcut }, i}
			<div>
				<h3 class="mb-2 text-sm text-neutral-300">{type}</h3>
				<div class="flex w-[500px] flex-wrap gap-3">
					{#each shortcut as { keys, description }, j}
						<div class="flex basis-[200px] items-center gap-3">
							<div class="flex items-center gap-1">
								{#each keys as key}
									<p
										class="flex-center rounded-lg bg-neutral-200 text-[14px] font-bold text-neutral-600"
										style="min-width: {key.length > 1 ? '52px' : '28px'};"
									>
										{key}
									</p>
								{/each}
							</div>
							<span class="text-neutral-600">{description}</span>
						</div>
					{/each}
				</div>
			</div>

			{#if i < shortcutKeys.length - 1}
				<div class="separate"></div>
			{/if}
		{/each}
	</div>
</Modal>

<style>
	.separate {
		margin-inline: 20px;
		border-bottom: 1px dashed #0000001f;
	}
</style>
