<script lang="ts">
	import Form from '../form/Form.svelte';
	import Modal from '../common/Modal.svelte';
	import type { FormEventHandler } from 'svelte/elements';

	const { onclose } = $props<{ onclose: () => void }>();

	const handleValueChange: FormEventHandler<any> = (event) => {
		const target = event.target as HTMLFormElement;
		console.log(target.value);
	};
</script>

<Modal {onclose} title="Add Background" width="500px">
	<Form
		cols={1}
		fields={[
			{
				label: 'Type',
				name: 'type',
				rules: { required: true },
				type: 'radio',
				style: 'width: 50%;',
				options: [{ value: 'youtube' }, { value: 'file' }]
			},
			{ label: 'Link', name: 'url', rules: { required: true }, type: 'input' }
		]}
		onchange={handleValueChange}
		initialValues={{ type: 'file', url: 'hehehe' }}
	/>
</Modal>
