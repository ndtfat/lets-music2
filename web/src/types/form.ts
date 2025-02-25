export type FormItemType = "input" | "radio" | "textarea";

export type BaseFormItem = {
    name: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rules?: any;
    style?: string;
};

export type InputOrTextareaFormItem = BaseFormItem & {
    type: "input" | "textarea";
};

export type RadioFormItem = BaseFormItem & {
    type: "radio";
    options: { value: string; label?: string }[];
};

export type FormItem = InputOrTextareaFormItem | RadioFormItem;
