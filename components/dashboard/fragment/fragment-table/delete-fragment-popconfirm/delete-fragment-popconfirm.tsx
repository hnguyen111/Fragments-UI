import {Button, message, Popconfirm} from "antd";
import {useState} from "react";
import Fragment from "../../../../../types/dashboard/fragments/fragment.type";
import {deleteFragment} from "../../../../../services/fragment/fragment.service";
import {useRecoilState, useRecoilStateLoadable} from "recoil";
import accountState from "../../../../../stores/authentication/account.state";
import fragmentGetAllState from "../../../../../stores/dashboard/fragment/fragment-get-all.state";

interface Props {
    fragment: Fragment;
}

export default function DeleteFragmentPopconfirm({fragment}: Props) {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [account] = useRecoilState(accountState);
    const [fragments, setFragments] = useRecoilStateLoadable(fragmentGetAllState);

    const handleOk = async () => {
        try {
            setLoading(true);
            await deleteFragment(account as any, fragment.id);
            setFragments(fragments?.contents?.filter((e: Fragment) => {
                return e.id !== fragment.id;
            }));
            setVisible(false);
            setLoading(false);
            message.success("The fragment has been deleted");
        } catch (e) {
            message.error("There was an error occurred while deleting the fragment, please try again");
            setVisible(false);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setVisible(false);
    };

    return <Popconfirm
        title="Are you sure you want to delete this fragment?"
        visible={visible}
        onConfirm={handleOk}
        okButtonProps={{loading: loading}}
        onCancel={handleCancel}
    >
        <Button danger type="primary" onClick={() => {setVisible(true);}}>
            Delete
        </Button>
    </Popconfirm>;
}