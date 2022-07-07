import {Form, Input, message, Select} from "antd";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import fragmentUpdateState from "../../../../stores/dashboard/fragment/fragment-update.state";
import User from "../../../../types/authentication/user.type";
import {getFragmentData, getSupportedMimeTypes} from "../../../../services/fragment/fragment.service";

const {Option} = Select;

interface Props {
    account: User,
}

export default function FragmentContentForm({account}: Props) {
    const [form] = Form.useForm();
    const [types, setTypes] = useState([] as string[]);
    const [mimeType, setMimeType] = useState("");
    const [fragment] = useRecoilState(fragmentUpdateState);

    useEffect(() => {
        if (fragment) {
            setTypes(getSupportedMimeTypes(fragment?.type as string));
        }
    }, [fragment, fragment?.type]);

    useEffect(() => {
        if (fragment) {
            getFragmentData(account, fragment?.id ?? "", mimeType)
                .then(async (response) => {
                    const blob = response as Blob;
                    form.setFieldsValue({
                        type: mimeType === "" ? fragment?.type : mimeType,
                        data: await blob.text()
                    });
                })
                .catch(async (e) => {
                    message.error("There was an error while retrieving the fragment content, please try again later");
                });
        }
    }, [account, form, fragment, mimeType]);

    return <Form form={form} layout={"vertical"}>
        <Form.Item
            name="type"
            label="Content Type"
        >
            <Select
                onChange={(value) => {setMimeType(value);}}
                style={{width: "100%"}}
            >
                {types.map((type, index) => (
                    <Option key={index} value={type}>{type}</Option>
                ))}
            </Select>
        </Form.Item>

        <Form.Item
            name="data"
            label="Fragment Data"
        >
            <Input.TextArea/>
        </Form.Item>
    </Form>;
}