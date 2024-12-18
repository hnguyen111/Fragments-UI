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
import fragmentModalVisibilityState from "../../../../stores/dashboard/fragment/fragment-modal-visibility.state";
import fragmentUpdateState from "../../../../stores/dashboard/fragment/fragment-update.state";
import fragmentMimeTypeState from "../../../../stores/dashboard/fragment/fragment-mime-type.state";

export default function FragmentModal() {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [account] = useRecoilState(accountState);
    const [visible, setVisible] = useRecoilState(fragmentModalVisibilityState);
    const [fragment, setFragment] = useRecoilState(fragmentUpdateState);
    const [fragments, setFragments] = useRecoilStateLoadable(fragmentGetAllState);
    const [, setType] = useRecoilState(fragmentMimeTypeState);

    const handleOk = () => {
        setLoading(true);
        form.validateFields()
            .then(async ({type, data}) => {
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
                        const response = await createFragment(account as any, type, data);
                        setFragments([...fragments.contents, response.fragment]);
                    }
                    SuccessModal({
                        title: fragment ? "Update Fragment" : "Create Fragment",
                        content: "The fragment information has been saved",
                        onOk: () => {
                            form.resetFields();
                            form.setFieldsValue({
                                type: "text/plain"
                            });
                            form.resetFields();
                            form.setFieldsValue({
                                type: "text/plain"
                            });
                            setFragment(null);
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
        setFragment(null);
        setVisible(false);
        setType(null);
    };

    return fragments.state === "hasValue"
        ? <FormModal
            visible={visible}
            title={fragment ? "Update Fragment" : "Create Fragment"}
            confirmLoading={loading}
            handleOk={handleOk}
            handleCancel={handleCancel}
            body={<FragmentForm account={account!} form={form}/>}
        /> : null;
}