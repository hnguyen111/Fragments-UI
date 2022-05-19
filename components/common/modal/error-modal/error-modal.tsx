import {Modal} from "antd";

interface Props {
    title: string,
    content: any,
    onOk: any
}

export default function ErrorModal({title, content, onOk}: Props) {
    return Modal.error({
        title: title,
        content: content,
        onOk() {
            onOk();
        },
    });
}