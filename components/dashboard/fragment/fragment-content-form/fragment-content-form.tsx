import {Form, Input, message, Select} from "antd";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import fragmentUpdateState from "../../../../stores/dashboard/fragment/fragment-update.state";
import User from "../../../../types/authentication/user.type";
import {getFragmentData} from "../../../../services/fragment/fragment.service";

const {Option} = Select;

interface Props {
    account: User,
}

export default function FragmentContentForm({account}: Props) {
    const [form] = Form.useForm();
    const [type, setType] = useState("");
    const [fragment] = useRecoilState(fragmentUpdateState);

    useEffect(() => {
        getFragmentData(account, fragment?.id ?? "")
            .then(async (response) => {
                const blob = response as Blob;
                form.setFieldsValue({
                    type: fragment?.type,
                    data: await blob.text()
                });
            })
            .catch(async (e) => {
                message.error("There was an error while retrieving the fragment content, please try again later");
            });
    }, [account, form, fragment]);

    return <Form form={form} layout={"vertical"}>
        <Form.Item
            name="type"
            label="Content Type"
        >
            <Select onChange={value => {setType(value);}}
                    style={{width: "100%"}}
            >
                <Option value="text/plain">text/plain</Option>
                <Option value="text/markdown">text/markdown</Option>
                <Option value="text/html">text/html</Option>
                <Option value="application/json">application/json</Option>
                <Option value="image/png">image/png</Option>
                <Option value="image/jpeg">image/jpeg</Option>
                <Option value="image/webp">image/webp</Option>
                <Option value="image/gif">image/gif</Option>
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