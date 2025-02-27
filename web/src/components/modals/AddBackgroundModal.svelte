<script lang="ts">
	import Form from '../form/Form.svelte';
	import Input from '../form/Input.svelte';
	import Modal from '../common/Modal.svelte';

	const { onclose } = $props<{ onclose: () => void }>();
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
				options: [{ value: 'youtube' }, { value: 'audio' }]
			},
			{ label: 'Link', name: 'url', rules: { required: true }, type: 'input' }
		]}
		initialValues={{ type: 'audio', url: 'hehehe' }}
	/>
</Modal>
