import FormModal from "../../../common/modal/form-modal/form-modal";
import {Form} from "antd";
import {useState} from "react";
import FragmentForm from "../fragment-form/fragment-form";
import ErrorModal from "../../../common/modal/error-modal/error-modal";
import {createFragment} from "../../../../services/fragments/fragments.service";
import {useRecoilState} from "recoil";
import accountState from "../../../../stores/authentication/account.state";
import SuccessModal from "../../../common/modal/success-modal/success-modal";

interface Props {
    fragment?: any,
    visible: any,
    setVisible: any
}

export default function FragmentModal({fragment, visible, setVisible}: Props) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [account] = useRecoilState(accountState);

    const handleOk = () => {
        setLoading(true);
        form.validateFields()
            .then(async ({data}) => {
                try {
                    await createFragment(account, "text/plain", data);
                    SuccessModal({
                        title: fragment ? "Update Fragment" : "Create Fragment",
                        content: "The fragment information has been saved",
                        onOk: () => {
                            setLoading(false);
                            setVisible(false);
                        }
                    });
                } catch (e: any) {
                    ErrorModal({
                        title: fragment ? "Update Fragment" : "Create Fragment",
                        content: e.message ?? "There was an error while saving the fragment information, please try again later",
                        onOk: () => {
                            setLoading(false);
                        }
                    });
                }
            });
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return <FormModal
        title={fragment ? "Update Fragment" : "Create Fragment"}
        visible={visible}
        confirmLoading={loading}
        setVisible={setVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        body={<FragmentForm fragment={fragment} form={form}/>}/>;
}