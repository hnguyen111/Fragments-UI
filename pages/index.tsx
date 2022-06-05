import {Button, Card, Skeleton, Space, Spin} from "antd";
import {useEffect, useState} from "react";
import FragmentModal from "../components/dashboard/fragment/fragment-modal/fragment-modal";
import {useRecoilState, useRecoilStateLoadable} from "recoil";
import accountState from "../stores/authentication/account.state";
import FragmentTable from "../components/dashboard/fragment/fragment-table/fragment-table";
import fragmentGetAllState from "../stores/dashboard/fragment/fragment-get-all.state";
import {useRouter} from "next/router";
import {Auth} from "aws-amplify";
import {LoadingOutlined} from "@ant-design/icons";
import {isAuthenticated} from "../services/auth/auth.service";


export default function Index() {
    const [loading, setLoading] = useState(true);
    const [account, setAccount] = useRecoilState(accountState);
    const [visible, setVisible] = useState(false);
    const [fragments] = useRecoilStateLoadable(fragmentGetAllState);
    const router = useRouter();

    useEffect(() => {
        isAuthenticated()
            .then(async (response: any) => {
                if (!response) {
                    await router.replace("/auth/sign-in");
                } else {
                    setLoading(false);
                    setAccount(response);
                }
            })
            .catch(async (e) => {
                await router.replace("/auth/sign-in");
            });
    }, [router, setAccount]);

    return !loading ? <div>
        <FragmentModal visible={visible} setVisible={setVisible}/>
        <Card title="Fragments" extra={
            <Space>
                <Button loading={fragments.state !== "hasValue"} disabled={account === null} type="primary"
                        onClick={() => {
                            setVisible(true);
                        }}>
                    Create New Fragment
                </Button>
                <Button onClick={async () => {
                    await Auth.signOut();
                    setAccount(null);
                    await router.replace("/auth/sign-in");
                }} disabled={account === null} type="primary" danger>
                    Sign Out
                </Button>
            </Space>
        }>
            <FragmentTable/>
        </Card>
    </div> : <div>
        <Space align={"start"}>
            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}/>
            <p>Loading...</p>
        </Space>
        <Skeleton active/>
        <Skeleton active/>
        <Skeleton active/>
    </div>;
}