import {Modal} from "antd";

interface Props {
    title: string;
    visible: boolean;
    confirmLoading: boolean;
    setVisible: any;
    handleOk: any;
    handleCancel: any;
    body: any;
    style?: any;
}

export default function FormModal({title, visible, confirmLoading, handleOk, handleCancel, body, style}: Props) {
    return <Modal
        style={style}
        title={title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
    >
        {body}
    </Modal>;
}