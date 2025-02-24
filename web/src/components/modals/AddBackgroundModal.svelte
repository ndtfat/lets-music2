<script lang="ts">
	import Modal from '../common/Modal.svelte';

	const { onclose } = $props<{ onclose: () => void }>();
</script>

<Modal {onclose} title="Add Background">Add background</Modal>
