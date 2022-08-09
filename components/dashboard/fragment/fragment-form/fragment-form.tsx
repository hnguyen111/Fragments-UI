import {Button, Form, Input, message, Radio, Select, Space, Upload, UploadProps} from "antd";
import {useEffect, useState} from "react";
import User from "../../../../types/authentication/user.type";
import {useRecoilState, useRecoilStateLoadable} from "recoil";
import fragmentGetAllState from "../../../../stores/dashboard/fragment/fragment-get-all.state";
import fragmentModalVisibilityState from "../../../../stores/dashboard/fragment/fragment-modal-visibility.state";
import fragmentUpdateState from "../../../../stores/dashboard/fragment/fragment-update.state";

const {Option} = Select;
const {Dragger} = Upload;

interface Props {
    account: User,
    form?: any;
    onFinish?: any;
}

export default function FragmentForm({account, form, onFinish}: Props) {
    const [fragments, setFragments] = useRecoilStateLoadable(fragmentGetAllState);
    const [visible, setVisible] = useRecoilState(fragmentModalVisibilityState);
    const [fragment, setFragment] = useRecoilState(fragmentUpdateState);
    const [type, setType] = useState("");
    const [option, setOption] = useState(0);

    useEffect(() => {
        form.setFieldsValue({
            type: fragment?.type ?? "text/plain",
        });
        setType(fragment?.type ?? "text/plain");
    }, [form, fragment?.type]);

    return <Form
        layout="vertical"
        form={form}
        onFinish={async (data) => {
            if (option === 0) {
                await onFinish(data);
            }
        }}
    >
        <Form.Item
            name="type"
            label="Content Type"
            rules={[
                {
                    required: true,
                    message: "The fragment content type is required",
                },
            ]}
        >
            <Select onChange={value => {setType(value);}}
                    disabled={fragment !== null || option === 1}
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
            label="How Do You Like To Create New Fragment Data?"
        >
            <Space direction="vertical" style={{width: "100%"}}>
                <Radio.Group value={option} onChange={(event) => {setOption(event.target.value);}}>
                    <Space direction="vertical">
                        <Radio value={0}>Enter Fragment Data</Radio>
                        <Radio value={1}>Upload Fragment Data File</Radio>
                    </Space>
                </Radio.Group>
            </Space>
        </Form.Item>

        <Form.Item
            name="data"
            rules={[
                {
                    required: true,
                    message: "The fragment data is required",
                },
            ]}
        >
            {option === 0
                ? (<Input.TextArea placeholder="Enter Fragment Data"/>)
                : (
                    <Dragger {...{
                        name: "file",
                        multiple: false,
                        accept: fragment?.type,
                        action: fragment ? `${process.env.API_URL}/v1/fragments/file/${fragment.id}` : `${process.env.API_URL}/v1/fragments/file`,
                        method: fragment ? "PUT" : "POST",
                        headers: account.authorizationHeaders(null, true),
                        beforeUpload: async (file) => {
                            const types = [
                                "text/plain",
                                "text/markdown",
                                "text/html",
                                "application/json",
                                "image/png",
                                "image/jpeg",
                                "image/webp",
                                "image/gif",
                            ];
                            if (!types.includes(file.type)) {
                                message.error("The content type is not supported");
                            }
                            return types.includes(file.type);
                        },
                        async onChange(info) {
                            const {status} = info.file;
                            if (status === "done") {
                                if (!fragment) {
                                    setFragments([...fragments.contents, info.file.response.fragment]);
                                } else {
                                    setFragments(fragments.contents.map((e: any) => {
                                        if (e.id === fragment.id) {
                                            return info.file.response.fragment;
                                        } else {
                                            return e;
                                        }
                                    }));
                                }
                                form.resetFields();
                                form.setFieldsValue({
                                    type: "text/plain"
                                });
                                setFragment(null);
                                setVisible(false);
                                message.success("The fragment information has been saved");
                            } else if (status === "error") {
                                message.error("There was an error while saving the fragment information, please try again later");
                            }
                        },
                    } as UploadProps}>
                        <p>Drag And Drop The Fragment Data File At This Box</p>
                    </Dragger>
                )
            }
        </Form.Item>

        {onFinish ? (
            <Form.Item noStyle>
                <Button
                    block
                    type="primary"
                    htmlType="submit"
                >
                    Save
                </Button>
            </Form.Item>
        ) : null}
    </Form>;
}