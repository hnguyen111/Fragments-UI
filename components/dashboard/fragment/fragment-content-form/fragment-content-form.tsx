import {Form} from "antd";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import fragmentUpdateState from "../../../../stores/dashboard/fragment/fragment-update.state";
import User from "../../../../types/authentication/user.type";
import {getSupportedMimeTypes,} from "../../../../services/fragment/fragment.service";
import FragmentMimeType from "./fragment-mime-type";
import FragmentData from "./fragment-data";


interface Props {
    account: User;
}

export default function FragmentContentForm({account}: Props) {
    const [types, setTypes] = useState([] as string[]);
    const [fragment] = useRecoilState(fragmentUpdateState);

    useEffect(() => {
        if (fragment) {
            setTypes(getSupportedMimeTypes(fragment?.type as string));
        }
    }, [fragment]);

    return (
        <Form layout={"vertical"}>
            <Form.Item name="type" label="Content Type">
                {fragment?.id ? <FragmentMimeType
                    id={fragment?.id}
                    defaultValue={fragment?.type as string}
                    types={types}
                /> : null}
            </Form.Item>

            <Form.Item label="Fragment Data">
                <FragmentData account={account}/>
            </Form.Item>
        </Form>
    );
}
