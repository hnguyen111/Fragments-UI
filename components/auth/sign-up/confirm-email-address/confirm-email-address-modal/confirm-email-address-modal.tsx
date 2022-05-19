import FormModal from "../../../../common/modal/form-modal/form-modal";
import {useState} from "react";
import ConfirmEmailAddressForm from "../confirm-email-address-form/confirm-email-address-form";
import {Form} from "antd";
import {Auth} from "aws-amplify";
import ErrorModal from "../../../../common/modal/error-modal/error-modal";
import SuccessModal from "../../../../common/modal/success-modal/success-modal";
import {useRouter} from "next/router";

interface Props {
    username: string,
    visible: any,
    setVisible: any
}

export default function ConfirmEmailAddressModal({username, visible, setVisible}: Props) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleOk = () => {
        setLoading(true);
        form
            .validateFields()
            .then(async ({code}) => {
                try {
                    await Auth.confirmSignUp(username, code);
                    setVisible(false);
                    setLoading(false);
                    form.resetFields();
                    SuccessModal({
                        title: "Sign Up",
                        content: "The email address has been confirmed",
                        onOk: async () => {
                            await router.replace("/auth/sign-in");
                        }
                    });
                } catch (e: any) {
                    setLoading(false);
                    ErrorModal({
                        title: "Confirm Email Address",
                        content: e.message ?? "There was an error while verifying your email address, please try again later",
                        onOk: () => {
                        }
                    });
                }
            });
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return <FormModal title="Confirm Email Address"
                      visible={visible}
                      confirmLoading={loading}
                      setVisible={setVisible}
                      handleOk={handleOk}
                      handleCancel={handleCancel}
                      body={<ConfirmEmailAddressForm form={form}/>}
    />;
}