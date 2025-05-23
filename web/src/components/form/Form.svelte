<script lang="ts">
	import Button from '$/components/buttons/Button.svelte';
	import type { FormItem } from '$/types/form.type';
	import type { FormEventHandler } from 'svelte/elements';
	import Input from './Input.svelte';
	import Radio from './Radio.svelte';

	let {
		setRef,
		fields,
		cols = 2,
		onchange,
		hideLabel = false,
		hideFooter = false,
		onSubmit,
		initialValues = {} // Mặc định là object rỗng nếu không có giá trị khởi tạo
	}: {
		setRef?: (ref: HTMLFormElement) => void;
		cols?: number;
		fields: FormItem[];
		hideFooter?: boolean;
		hideLabel?: boolean;
		onchange?: FormEventHandler<HTMLFormElement>;
		initialValues?: Record<string, any>;
		onSubmit?: (values: any) => void;
	} = $props();

	let formRef: HTMLFormElement;
	$effect(() => {
		if (setRef && formRef) { 
			setRef(formRef);
		}
	});

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

		if (onSubmit) {
			onSubmit(data);
		}
		console.log('Form Data:', data);
	}
</script>

<form onsubmit={handleSubmit} {onchange} bind:this={formRef}>
	<!-- svelte-ignore slot_element_deprecated -->
	<div class="grid" style={`grid-template-columns: repeat(${cols}, 1fr); gap: 16px;`}>
		{#each fields as field}
			{#if ['text', 'email', 'password'].includes(field.type)}
				<Input {...field} value={initialValues[field.name]} {hideLabel} />
			{:else if field.type == 'radio'}
				<Radio {...field} value={initialValues[field.name]} />
			{/if}
		{/each}
		<slot />
	</div>
	{#if !hideFooter}
		<div class="mt-8 flex justify-end">
			<Button class="bg-neutral-700 text-white">Submit</Button>
		</div>
	{/if}
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
