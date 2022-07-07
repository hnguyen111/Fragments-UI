import FormModal from "../../../common/modal/form-modal/form-modal";
import {useState} from "react";
import FragmentContentForm from "../fragment-content-form/fragment-content-form";
import {useRecoilState} from "recoil";
import fragmentContentModalVisibilityState
    from "../../../../stores/dashboard/fragment/fragment-content-modal-visibility.state";
import accountState from "../../../../stores/authentication/account.state";

export default function FragmentContentModal() {
    const [account] = useRecoilState(accountState);
    const [visible, setVisible] = useRecoilState(fragmentContentModalVisibilityState);
    const [loading] = useState(false);

    const handleOk = () => {};

    const handleCancel = () => {
        setVisible(false);
    };

    return <FormModal
        visible={visible}
        title={"View Fragment"}
        confirmLoading={loading}
        handleOk={handleOk}
        handleCancel={handleCancel}
        body={<FragmentContentForm account={account!}/>}
    />;
}