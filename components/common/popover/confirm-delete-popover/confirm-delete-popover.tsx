import {Popconfirm} from "antd";

interface Props {
    title: string,
    onConfirm: any,
    onCancel: any
    body: any
}

export default function ConfirmDeletePopover({title, onConfirm, onCancel, body}: Props) {
    return (
        <Popconfirm
            title={title}
            onConfirm={onConfirm}
            onCancel={onCancel}
            okText="Yes"
            cancelText="No"
        >
            {body}
        </Popconfirm>
    );
}
