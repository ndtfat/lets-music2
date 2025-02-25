<script lang="ts">
	import Button from '$/components/buttons/Button.svelte';
	import type { FormItem } from '$/types/form';
	import type { FormEventHandler } from 'svelte/elements';
	import Input from './Input.svelte';
	import Radio from './Radio.svelte';

	const {
		fields,
		cols = 2,
		onchange,
		initialValues = {} // Mặc định là object rỗng nếu không có giá trị khởi tạo
	}: {
		cols?: number;
		fields: FormItem[];
		onchange?: FormEventHandler<HTMLFormElement>;
		initialValues?: Record<string, any>;
	} = $props();

	function handleSubmit(event: Event) {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);
		const data = Object.fromEntries(formData);

		// Tìm input required nhưng chưa có giá trị
		const firstInvalidField = Array.from(form.elements).find((el) => {
			const input = el as HTMLInputElement;
			return input.required && !input.value.trim();
		}) as HTMLElement;

		if (firstInvalidField) {
			firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
			firstInvalidField.focus();
			return;
		}

		console.log('Form Data:', data);
	}
</script>

<form onsubmit={handleSubmit} {onchange}>
	<!-- svelte-ignore slot_element_deprecated -->
	<div class="grid" style={`grid-template-columns: repeat(${cols}, 1fr); gap: 16px;`}>
		{#each fields as field}
			{#if field.type == 'input'}
				<Input {...field} value={initialValues[field.name]} />
			{:else if field.type == 'radio'}
				<Radio {...field} value={initialValues[field.name]} />
			{/if}
		{/each}
		<slot />
	</div>
	<div class="mt-3 flex justify-end">
		<Button type="primary">Submit</Button>
	</div>
</form>

<style>
	.grid {
		max-height: calc(var(--modal-max-h) - 54px);
		overflow-y: auto;
		display: grid;
		width: 100%;
		padding-bottom: 4px;
	}
</style>
