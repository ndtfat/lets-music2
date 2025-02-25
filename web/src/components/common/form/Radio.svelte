<script lang="ts">
	import type { FormItem } from '$/types/form';

	const {
		label = 'Label',
		rules = {},
		name,
		value,
		style,
		...rest
	}: FormItem & { value?: string } = $props();

	const options = rest.type === 'radio' ? rest.options : [];
</script>

<div {style}>
	<label for="" class="label text-neutral-700">
		{label} <i class="text-sm text-red-400">({rules?.required ? 'required' : ''})</i>
	</label>
	<div class="radio-inputs">
		{#each options as op}
			<label class="radio">
				<input type="radio" {name} {...rules} value={op.value} checked={op.value === value} />
				<span class="name">{op.label || op.value}</span>
			</label>
		{/each}
	</div>
</div>

<style>
	.label {
		display: flex;
		gap: 8px;
		align-items: center;
	}
	.radio-inputs {
		margin-top: 8px;
		position: relative;
		display: flex;
		flex-wrap: wrap;
		border-radius: 0.5rem;
		background-color: #eee;
		box-sizing: border-box;
		box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
		padding: 0.25rem;
		width: 100%;
		font-size: 14px;
	}

	.radio-inputs .radio {
		flex: 1 1 auto;
		text-align: center;
	}

	.radio-inputs .radio input {
		display: none;
	}

	.radio-inputs .radio .name {
		display: flex;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		border-radius: 0.5rem;
		border: none;
		padding: 0.5rem 0;
		color: rgba(51, 65, 85, 1);
		transition: all 0.15s ease-in-out;
	}

	.radio-inputs .radio input:checked + .name {
		background-color: #fff;
		font-weight: 600;
	}

	/* Hover effect */
	.radio-inputs .radio:hover .name {
		background-color: rgba(255, 255, 255, 0.5);
	}

	/* Animation */
	.radio-inputs .radio input:checked + .name {
		position: relative;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		animation: select 0.3s ease;
	}

	@keyframes select {
		0% {
			transform: scale(0.95);
		}
		50% {
			transform: scale(1.05);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
