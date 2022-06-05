import {Button, Table} from "antd";
import {useRecoilStateLoadable} from "recoil";
import fragmentGetAllState from "../../../../stores/dashboard/fragment/fragment-get-all.state";
import moment from "moment";
import DeleteFragmentPopconfirm from "./delete-fragment-popconfirm/delete-fragment-popconfirm";
import FragmentModal from "../fragment-modal/fragment-modal";
import {useState} from "react";
import Fragment from "../../../../types/dashboard/fragments/fragment.type";

export default function FragmentTable() {
    const [fragments] = useRecoilStateLoadable(fragmentGetAllState);
    const [visible, setVisible] = useState(false);
    const [selectedFragment, setSelectedFragment] = useState(null as Fragment | null);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Created At",
            dataIndex: "created",
            key: "created",
        },
        {
            title: "Last Updated At",
            dataIndex: "updated",
            key: "updated",
        },
        {
            title: "MIME Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "Size",
            dataIndex: "size",
            key: "size",
        },
        {
            title: "",
            key: "action",
            render: (text: any, record: any) => {
                return (
                    <Button onClick={() => {
                        const [target] = fragments.contents.filter((fragment: Fragment) => {
                            return fragment.id === record.id;
                        });
                        setSelectedFragment(target);
                        setVisible(true);
                    }} type="primary">Update</Button>
                );
            },
        },
        {
            title: "",
            key: "action",
            render: (text: any, record: any) => {
                return (
                    <DeleteFragmentPopconfirm fragment={record}/>
                );
            },
        },
    ];

    return fragments.state === "hasValue" ? <div>
        <FragmentModal fragment={selectedFragment as any} visible={visible} setVisible={setVisible}/>
        <Table
            scroll={{x: "max-content"}}
            columns={columns}
            dataSource={fragments?.contents?.map((fragment) => {
                return {
                    key: fragment.id,
                    id: fragment.id,
                    ownerId: fragment.ownerId,
                    created: moment(fragment.created).format("LLL"),
                    updated: moment(fragment.updated).format("LLL"),
                    type: fragment.type,
                    size: fragment.size,
                };
            })}
        />
    </div> : null;
}