import {Button, Form, Input, Typography} from "antd";
import {useState} from "react";
import ConfirmEmailAddressModal from "../confirm-email-address/confirm-email-address-modal/confirm-email-address-modal";
import ErrorModal from "../../../common/modal/error-modal/error-modal";
import Link from "next/link";

const {Title} = Typography;

interface Props {
    form?: any;
    onFinish?: any;
}

export default function SignUpForm({form, onFinish}: Props) {
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");

    return <Form
        layout="vertical"
        form={form}
        onFinish={async (data) => {
            try {
                await onFinish(data);
                setVisible(true);
            } catch (e: any) {
                ErrorModal({
                    title: "Sign Up",
                    content: e.message ?? "There was an error while creating your account, please try again later",
                    onOk: () => {
                    }
                });
            }
        }}
        initialValues={{
            username: "",
            name: "",
            email: "",
            password: "",
        }}
    >
        <ConfirmEmailAddressModal username={username} visible={visible} setVisible={setVisible}/>

        <Title level={3}>Sign Up</Title>

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
            <Input onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
        </Form.Item>

        <Form.Item
            name="name"
            label="Name"
            rules={[
                {
                    required: true,
                    message: "Name is required",
                },
            ]}
        >
            <Input placeholder="Name"/>
        </Form.Item>

        <Form.Item
            name="email"
            label="Email Address"
            rules={[
                {
                    required: true,
                    message: "Email address is required",
                },
            ]}
        >
            <Input placeholder="Email Address"/>
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
                    block
                    type="primary"
                    htmlType="submit"
                >
                    Sign Up
                </Button>
            </Form.Item>
        ) : null}

        <Form.Item>
            Already has an account? <Link href="/auth/sign-in">Sign in</Link>
        </Form.Item>
    </Form>;
}