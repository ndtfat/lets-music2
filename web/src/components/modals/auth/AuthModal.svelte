<script lang="ts">
	import Form from '$/components/form/Form.svelte';
	import type { FormItem } from '$/types/form';
	import Modal from '../../common/Modal.svelte';

	const { type = 'logIn', onclose }: { type: 'logIn' | 'signUp'; onclose: () => void } = $props();

	const contentMap: Record<
		'logIn' | 'signUp',
		{
			title: string;
			subTitle: string;
			fields: FormItem[];
			color: string;
		}
	> = {
		logIn: {
			title: 'Log in',
			subTitle:
				"Welcome back to Let's Music! Ready to groove with us again and dive back into your musical journey?",
			fields: [
				{ name: 'email', rules: { required: true }, type: 'email' },
				{ name: 'password', rules: { required: true }, type: 'password' }
			],
			color: '#3e6926'
		},
		signUp: {
			title: 'Sign up',
			subTitle: 'Join the rhythm revolution! Share your musical journey with us.',
			fields: [
				{ name: 'email', rules: { required: true }, type: 'email' },
				{ name: 'password', rules: { required: true }, type: 'password' },
				{ name: 'confirmPassword', rules: { required: true }, type: 'password' }
			],
			color: '#3b23ad'
		}
	};

	let metadata = $state(contentMap[type]);

	let formRef: HTMLFormElement | undefined;

	const onClickSubmit = () => {
		if (formRef) formRef.requestSubmit();
	};

	const onSubmit = (data: { email: string; password: string }) => {
		console.log({ data });
	};
</script>

<Modal hideHeader width="400px" {onclose}>
	<div class="p-5 text-amber-50" style="background-color: {metadata.color};">
		<div class="text-[80px] font-bold leading-none tracking-wider">{metadata.title}</div>
	</div>

	<div class="px-5 pb-6 pt-3">
		<span class="text-sm text-neutral-500">{metadata.subTitle}</span>

		<div class="py-6">
			<Form
				setRef={(ref) => (formRef = ref)}
				cols={1}
				fields={metadata.fields}
				hideLabel
				hideFooter
				{onSubmit}
			/>
		</div>

		<div class="flex justify-end">
			<div class="relative">
				<button
					class="cursor-pointer text-[24px] font-semibold tracking-wider"
					onclick={onClickSubmit}
				>
					<!-- {metadata.title} -->
					{type === 'logIn' ? 'Groove In' : 'Drop In'}
				</button>
				<div class="absolute bottom-0 h-1 w-full" style="background: {metadata.color}"></div>
			</div>
		</div>
	</div>
</Modal>
