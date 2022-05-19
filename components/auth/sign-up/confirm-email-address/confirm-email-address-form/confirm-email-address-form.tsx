import {Button, Form, Input} from "antd";

interface Props {
    form?: any;
    onFinish?: any;
}

export default function ConfirmEmailAddressForm({form, onFinish}: Props) {
    return <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={{
            code: ""
        }}
    >
        <Form.Item
            name="code"
            label="Verification Code"
            rules={[
                {
                    required: true,
                    message: "Verification Code is required",
                },
            ]}
        >
            <Input placeholder="Verification Code"/>
        </Form.Item>

        {onFinish ? (
            <Form.Item>
                <Button
                    block
                    type="primary"
                    htmlType="submit"
                >
                    Confirm
                </Button>
            </Form.Item>
        ) : null}
    </Form>;
}