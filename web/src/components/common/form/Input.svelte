<script lang="ts">
	import type { FormItem } from '$/types/form';

	const {
		label = 'Label',
		rules = {},
		name,
		value,
		style
	}: FormItem & { value?: string } = $props();
</script>

<div {style}>
	<label for={name} class="label text-neutral-700">
		{label} <i class="text-sm text-red-400">({rules?.required ? 'required' : ''})</i>
	</label>
	<input id={name} {name} {...rules} {value} placeholder="Enter {label}" />
</div>

<style>
	input {
		width: 100%;
		height: 45px;
		font-size: 16px;
		padding: 6px 12px;
		border-radius: 8px;
		outline: none;
		border: 1px solid rgba(0, 0, 0, 0.05);
		transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
		box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.05);
		margin-top: 8px;
	}

	input:hover,
	input:focus {
		box-shadow: 0px 3px 2px 2px rgba(0, 0, 0, 0.08);
	}

	input:active {
		transform: scale(0.95);
	}

	.label {
		display: flex;
		gap: 8px;
		align-items: center;
	}
</style>
