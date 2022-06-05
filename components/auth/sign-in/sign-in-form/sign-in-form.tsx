import {Button, Form, Input, Typography} from "antd";
import ErrorModal from "../../../common/modal/error-modal/error-modal";
import Link from "next/link";
import {useState} from "react";

const {Title} = Typography;

interface Props {
    form?: any;
    onFinish?: any;
}

export default function SignInForm({form, onFinish}: Props) {
    const [loading, setLoading] = useState(false);

    return <Form
        layout="vertical"
        form={form}
        onFinish={async (data) => {
            try {
                setLoading(true);
                await onFinish(data);
                setLoading(false);
            } catch (e: any) {
                setLoading(false);
                ErrorModal({
                    title: "Sign In",
                    content: e.message ?? "There was an error while creating your account, please try again later",
                    onOk: () => {
                    }
                });
            }
        }}
        initialValues={{
            username: "",
            password: ""
        }}
    >
        <Title level={3}>Sign In</Title>

        <Form.Item
            name="username"
            label="Username"
            rules={[
                {
                    required: true,
                    message: "Username is required",
                },
            ]}
        >
            <Input placeholder="Username"/>
        </Form.Item>

        <Form.Item
            name="password"
            label="Password"
            rules={[
                {
                    required: true,
                    message: "Password is required",
                },
            ]}
        >
            <Input
                type="password"
                placeholder="Password"
            />
        </Form.Item>

        {onFinish ? (
            <Form.Item noStyle>
                <Button
                    loading={loading}
                    block
                    type="primary"
                    htmlType="submit"
                >
                    Sign In
                </Button>
            </Form.Item>
        ) : null}

        <Form.Item>
            Are you new to Fragments? <Link href="/auth/sign-up">Sign up</Link>
        </Form.Item>
    </Form>;
}