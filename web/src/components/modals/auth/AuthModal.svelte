<script lang="ts">
	// import { signIn, signUp } from '$/api/auth/auth.service';
	import Form from '$/components/form/Form.svelte';
	import type { FormItem } from '$/types/form.type';
	import Modal from '../../common/Modal.svelte';

	const { type = 'signUp', onclose }: { type: 'logIn' | 'signUp'; onclose: () => void } = $props();

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
			subTitle: "Welcome back! ✨ Let's make music together",
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
			color: '#da6b44'
		}
	};

	let screen = $state(type);
	// svelte-ignore state_referenced_locally
	let metadata = $derived(contentMap[screen]);

	let formRef: HTMLFormElement | undefined;

	const onClickSubmit = () => {
		if (formRef) formRef.requestSubmit();
	};

	const toggleScreen = () => {
		screen = screen === 'logIn' ? 'signUp' : 'logIn';
	};

	const onSubmit = async (data: { email: string; password: string }) => {
		console.log({ data });
		if (type === 'signUp') {
			// const response = await signUp(data.email, data.password);
			// console.log({ response });
		} else {
			// const response = await signIn(data.email, data.password);
			// console.log({ response });
		}
	};
</script>

<Modal hideHeader width="400px" {onclose}>
	<div class="px-5 py-6">
		<div
			class="mb-4 text-[80px] font-bold leading-none tracking-wider"
			style="color: {metadata.color}"
		>
			{metadata.title}
		</div>
		<span class="text-sm text-neutral-500">{metadata.subTitle}</span>

		<div class="mb-3 mt-6">
			<Form
				setRef={(ref) => (formRef = ref)}
				cols={1}
				fields={metadata.fields}
				hideLabel
				hideFooter
				{onSubmit}
			/>
		</div>

		<div class="flex flex-col items-end">
			{#if screen === 'logIn'}
				<div class="group relative mb-5">
					<button class="cursor-pointer text-[14px] italic" onclick={toggleScreen}>
						Forgot password
					</button>
					<div
						class="absolute bottom-0 h-1 w-[0px] transition-all group-hover:w-full"
						style="background: {contentMap[screen === 'logIn' ? 'signUp' : 'logIn'].color}"
					></div>
				</div>
			{/if}

			<div class="relative">
				<button
					class="cursor-pointer text-[24px] font-semibold tracking-wider"
					onclick={onClickSubmit}
				>
					<!-- {metadata.title} -->
					{screen === 'logIn' ? 'Groove In' : 'Drop In'}
				</button>
				<div class="absolute bottom-0 h-1 w-full" style="background: {metadata.color}"></div>
			</div>
		</div>
	</div>
</Modal>
