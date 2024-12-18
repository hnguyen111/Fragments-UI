import FormModal from "../../../common/modal/form-modal/form-modal";
import {useState} from "react";
import FragmentContentForm from "../fragment-content-form/fragment-content-form";
import {useRecoilState} from "recoil";
import fragmentContentModalVisibilityState
    from "../../../../stores/dashboard/fragment/fragment-content-modal-visibility.state";
import accountState from "../../../../stores/authentication/account.state";
import fragmentUpdateState from "../../../../stores/dashboard/fragment/fragment-update.state";
import fragmentMimeTypeState from "../../../../stores/dashboard/fragment/fragment-mime-type.state";

export default function FragmentContentModal() {
    const [account] = useRecoilState(accountState);
    const [visible, setVisible] = useRecoilState(fragmentContentModalVisibilityState);
    const [, setFragment] = useRecoilState(fragmentUpdateState);
    const [loading] = useState(false);
    const [, setType] = useRecoilState(fragmentMimeTypeState);


    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setFragment(null);
        setVisible(false);
        setType(null)
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