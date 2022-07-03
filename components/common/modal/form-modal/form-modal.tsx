import {Modal} from "antd";
import {useRecoilState} from "recoil";
import fragmentModalVisibilityState from "../../../../stores/dashboard/fragment/fragment-modal-visibility.state";

interface Props {
    title: string;
    confirmLoading: boolean;
    handleOk: any;
    handleCancel: any;
    body: any;
    style?: any;
}

export default function FormModal({title, confirmLoading, handleOk, handleCancel, body, style}: Props) {
    const [visible] = useRecoilState(fragmentModalVisibilityState);

    return <Modal
        visible={visible}
        style={style}
        title={title}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
    >
        {body}
    </Modal>;
}