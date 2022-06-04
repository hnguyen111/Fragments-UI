import {Button, Form, Input} from "antd";

interface Props {
    fragment: any;
    form?: any;
    onFinish?: any;
}

export default function FragmentForm({fragment, form, onFinish}: Props) {
    return <Form
        layout="vertical"
        form={form}
        onFinish={async (data) => {
            await onFinish(data);
        }}
    >
        <Form.Item
            name="data"
            label="Fragment Data"
            rules={[
                {
                    required: true,
                    message: "The fragment data is required",
                },
            ]}
        >
            <Input.TextArea placeholder="Fragment Data"/>
        </Form.Item>

        {onFinish ? (
            <Form.Item noStyle>
                <Button
                    block
                    type="primary"
                    htmlType="submit"
                >
                    Save
                </Button>
            </Form.Item>
        ) : null}
    </Form>;
}