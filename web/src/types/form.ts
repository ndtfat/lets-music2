export type BaseFormItem = {
    name: string;
    label?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules?: any;
    style?: string;
};

export type InputOrTextareaFormItem = BaseFormItem & {
    type: "text" | "textarea" | "email" | "number" | "password";
};

export type RadioFormItem = BaseFormItem & {
    type: "radio";
    options: { value: string; label?: string }[];
};

export type FormItem = InputOrTextareaFormItem | RadioFormItem;
