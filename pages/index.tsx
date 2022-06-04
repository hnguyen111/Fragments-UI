import {Button, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import {isAuthenticated} from "../services/auth/auth.service";
import Link from "next/link";
import {Auth} from "aws-amplify";
import {getUserFragments} from "../services/fragments/fragments.service";
import FragmentModal from "../components/dashboard/fragment/fragment-modal/fragment-modal";
import {useRecoilState} from "recoil";
import accountState from "../stores/authentication/account.state";

const {Title} = Typography;

export default function Index() {
    const [account, setAccount] = useRecoilState(accountState);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        isAuthenticated()
            .then((response: any) => {
                setAccount(response);
            })
            .catch((e) => {

            });
    }, [setAccount]);

    return <div>
        <FragmentModal visible={visible} setVisible={setVisible}/>
        {account !== null ? (
            <Title level={3}>{`Welcome back ${account.username}`}</Title>
        ) : (
            <Title level={3}>GitHub Got Hacked, Please Sign In To Save Your Code</Title>
        )}
        <Space direction="vertical">
            <Link href="/auth/sign-in">
                <Button disabled={account !== null} type="primary">Sign In</Button>
            </Link>

            <Button onClick={async () => {
                await Auth.signOut();
                setAccount(null);
            }} disabled={account === null} type="primary" danger>
                Sign Out
            </Button>

            <Button disabled={account === null} type="primary" onClick={() => {
                if (account !== null) {
                    getUserFragments(account)
                        .then((response: any) => {

                        })
                        .catch((e) => {

                        });
                }
            }}>
                Load Fragments Data
            </Button>

            <Button disabled={account === null} type="primary" onClick={() => {
                setVisible(true);
            }}>
                Create New Fragment
            </Button>
        </Space>
    </div>;
}