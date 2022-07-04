import {Modal} from "antd";

interface Props {
    visible: any,
    title: string;
    confirmLoading: boolean;
    handleOk: any;
    handleCancel: any;
    body: any;
    style?: any;
}

export default function FormModal({
                                      visible,
                                      title,
                                      confirmLoading,
                                      handleOk,
                                      handleCancel,
                                      body,
                                      style
                                  }: Props) {
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