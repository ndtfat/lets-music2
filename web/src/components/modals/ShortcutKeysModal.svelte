<script lang="ts">
	import Modal from '$/components/common/Modal.svelte';

	const shortcutKeys = [
		{
			label: 'Audio control (In main screen)',
			type: 'audioControl',
			shortcuts: [
				{ keysDisplay: ['M'], keys: ['m'], description: 'Mute' },
				{ keysDisplay: ['R'], keys: ['r'], description: 'Repeat' },
				{ keysDisplay: ['→'], keys: ['ArrowRight'], description: 'Seek forward' },
				{ keysDisplay: ['Space'], keys: [' '], description: 'Play/Pause' },
				{ keysDisplay: ['←'], keys: ['ArrowLeft'], description: 'Seek backward' },
				{ keysDisplay: ['Shift', '→'], keys: ['Shift', 'ArrowRight'], description: 'Next song' },
				{ keysDisplay: ['↑'], keys: ['ArrowUp'], description: '+ volume' },
				{ keysDisplay: ['Shift', '←'], keys: ['Shift', 'ArrowLeft'], description: 'Previous song' },
				{ keysDisplay: ['↓'], keys: ['ArrowDown'], description: '- volume' }
			]
		},
		{
			label: 'Configuration',
			type: 'configuration',
			shortcuts: []
		}
	];
</script>

<Modal title="Shortcut Keys" width="600px" onclose={() => {}}>
	<div class="flex flex-col gap-4">
		{#each shortcutKeys as { label, shortcuts }, i}
			<div>
				<h3 class="mb-2 text-sm text-neutral-400">{label}</h3>
				<div class="flex w-[500px] flex-wrap gap-3">
					{#each shortcuts as { keysDisplay, description }, j}
						<div class="flex basis-[240px] items-center gap-3">
							<div class="flex items-center gap-1">
								{#each keysDisplay as key}
									<p
										class="flex-center rounded-lg bg-neutral-200 text-[14px] font-bold text-neutral-600"
										style="min-width: {key.length > 1 ? '52px' : '28px'};"
									>
										{key}
									</p>
								{/each}
							</div>
							<span class="text-sm text-neutral-600">{description}</span>
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
