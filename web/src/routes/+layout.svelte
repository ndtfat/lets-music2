<script lang="ts">
	import AppConfiguration from '$components/AppConfiguration.svelte';
	import '../app.css';

	let { children } = $props();
</script>

<AppConfiguration>
	{@render children()}
</AppConfiguration>
