import {Form, Image, Input, message, Select, Skeleton} from "antd";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import fragmentUpdateState from "../../../../stores/dashboard/fragment/fragment-update.state";
import User from "../../../../types/authentication/user.type";
import {getFragmentData, getSupportedMimeTypes,} from "../../../../services/fragment/fragment.service";

const {Option} = Select;

interface Props {
    account: User;
}

export default function FragmentContentForm({account}: Props) {
    const [form] = Form.useForm();
    const [types, setTypes] = useState([] as string[]);
    const [mimeType, setMimeType] = useState("");
    const [fragment] = useRecoilState(fragmentUpdateState);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (fragment) {
            setTypes(getSupportedMimeTypes(fragment?.type as string));

            getFragmentData(account, fragment?.id ?? "", mimeType)
                .then(async (response: any) => {
                    const blob = response as Blob;
                    if (!fragment?.type?.startsWith("image")) {
                        setImage("");
                        form.setFieldsValue({
                            type: mimeType === "" ? fragment?.type : mimeType,
                            data: await blob.text(),
                        });
                        setLoading(false);
                    } else {
                        form.setFieldsValue({
                            type: mimeType === "" ? fragment?.type : mimeType,
                        });
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = function () {
                            setImage(reader.result as string);
                        };
                        setLoading(false);
                    }
                })
                .catch(async (e) => {
                    setLoading(false);
                    message.error(
                        "There was an error while retrieving the fragment content, please try again later"
                    );
                });
        }
    }, [account, form, fragment, mimeType]);

    return (
        <Form form={form} layout={"vertical"}>
            <Form.Item name="type" label="Content Type">
                <Select
                    onChange={(value) => {
                        setMimeType(value);
                    }}
                    style={{width: "100%"}}
                >
                    {types.map((type, index) => (
                        <Option key={index} value={type}>
                            {type}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            {loading ? <Skeleton active/> : (
                <Form.Item name="data" label="Fragment Data">
                    {fragment?.type.startsWith("image") ? (
                        <Image
                            width="100%"
                            alt={"Image"}
                            src={image}
                        />
                    ) : (
                        <Input.TextArea/>
                    )}
                </Form.Item>
            )}
        </Form>
    );
}
