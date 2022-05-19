import {Modal} from "antd";

interface Props {
    title: string,
    content: any,
    onOk: any
}

export default function SuccessModal({title, content, onOk}: Props) {
    return Modal.success({
        title: title,
        content: content,
        onOk() {
            onOk();
        },
    });
}
