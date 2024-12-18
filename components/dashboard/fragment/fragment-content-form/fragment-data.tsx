import {Empty, Form, Image, Input, message, Skeleton} from "antd";
import {useEffect, useState} from "react";
import {getFragmentData} from "../../../../services/fragment/fragment.service";
import {useRecoilState} from "recoil";
import fragmentUpdateState from "../../../../stores/dashboard/fragment/fragment-update.state";
import fragmentMimeTypeState from "../../../../stores/dashboard/fragment/fragment-mime-type.state";

interface Props {
    account: any;
}

export default function FragmentData({account}: Props) {
    const [form] = Form.useForm();
    const [fragment] = useRecoilState(fragmentUpdateState);
    const [type] = useRecoilState(fragmentMimeTypeState);
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (fragment) {
            setImage("");
            getFragmentData(account, fragment?.id ?? "", type as string)
                .then(async (response: any) => {
                    const blob = response as Blob;
                    if (!fragment?.type?.startsWith("image")) {
                        setTimeout(async () => {
                            form.setFieldsValue({
                                data: await blob?.text() ?? "",
                            });
                            setLoading(false);
                        }, 500);
                    } else {
                        const reader = new FileReader();
                        reader.readAsDataURL(blob);
                        reader.onloadend = function () {
                            setTimeout(() => {
                                setImage(reader.result as string);
                                setLoading(false);
                            }, 500);
                        };
                    }
                })
                .catch(async (e) => {
                    setLoading(false);
                    message.error(
                        "There was an error while retrieving the fragment content, please try again later"
                    );
                });
        }
    }, [account, form, fragment, type]);

    return loading
        ? <Skeleton active/>
        : fragment?.type.startsWith("image")
            ? image
                // eslint-disable-next-line jsx-a11y/alt-text
                ? <Image width="100%" src={image}/>
                : <Empty/>
            : form.getFieldValue("data")
                ? <Input.TextArea rows={15} value={form.getFieldValue("data")}/>
                : <Empty/>;
}