import FormModal from "../../../common/modal/form-modal/form-modal";
import {Form} from "antd";
import {useState} from "react";
import FragmentForm from "../fragment-form/fragment-form";
import ErrorModal from "../../../common/modal/error-modal/error-modal";
import {createFragment, updateFragment} from "../../../../services/fragment/fragment.service";
import {useRecoilState, useRecoilStateLoadable} from "recoil";
import accountState from "../../../../stores/authentication/account.state";
import SuccessModal from "../../../common/modal/success-modal/success-modal";
import fragmentGetAllState from "../../../../stores/dashboard/fragment/fragment-get-all.state";
import Fragment from "../../../../types/dashboard/fragments/fragment.type";

interface Props {
    fragment?: Fragment,
    visible: any,
    setVisible: any
}

export default function FragmentModal({fragment, visible, setVisible}: Props) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [account] = useRecoilState(accountState);
    const [fragments, setFragments] = useRecoilStateLoadable(fragmentGetAllState);

    const handleOk = () => {
        setLoading(true);
        form.validateFields()
            .then(async ({data}) => {
                try {
                    if (fragment) {
                        const response = await updateFragment(account as any, fragment.id, fragment.type, data);
                        setFragments(fragments.contents.map((e: Fragment) => {
                            if (e.id === fragment.id) {
                                return {
                                    ...e,
                                    ...response.fragment
                                };
                            } else {
                                return e;
                            }
                        }));
                    } else {
                        const response = await createFragment(account as any, "text/plain", data);
                        setFragments([...fragments.contents, response.fragment]);
                    }
                    SuccessModal({
                        title: fragment ? "Update Fragment" : "Create Fragment",
                        content: "The fragment information has been saved",
                        onOk: () => {
                            form.resetFields();
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

    return fragments.state === "hasValue" ? <FormModal
        title={fragment ? "Update Fragment" : "Create Fragment"}
        visible={visible}
        confirmLoading={loading}
        setVisible={setVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        body={<FragmentForm fragment={fragment} form={form}/>}/> : null;
}