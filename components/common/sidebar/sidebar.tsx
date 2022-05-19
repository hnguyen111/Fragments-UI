import {Button, Layout, Menu} from "antd";
import {
    CarOutlined,
    CreditCardOutlined,
    LockOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from "@ant-design/icons";
import React, {useState} from "react";
import styles from "./styles.module.css";
import {signOut} from "next-auth/client";
import {useRouter} from "next/router";

const {Header, Sider, Content} = Layout;

interface Props {
    Component: any;
}

export default function Sidebar({Component}: Props) {
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout className={styles.layout}>
            <Sider breakpoint="lg" collapsedWidth="0" trigger={null} collapsible collapsed={collapsed}>
                <div className={styles.logo}/>
                <Menu theme="dark" mode="inline">
                    <Menu.Item
                        onClick={async () => {
                            await router.replace("/dashboard/profile");
                        }}
                        key="1"
                        icon={<UserOutlined/>}
                    >
                        Profile Information
                    </Menu.Item>
                    <Menu.Item
                        onClick={async () => {
                            await router.replace("/dashboard/change-password");
                        }}
                        key="2"
                        icon={<LockOutlined/>}
                    >
                        Change Password
                    </Menu.Item>
                    <Menu.Item
                        onClick={async () => {
                            await router.replace("/dashboard/payment-method");
                        }}
                        key="3"
                        icon={<CreditCardOutlined/>}
                    >
                        Payment Method
                    </Menu.Item>
                    <Menu.Item
                        onClick={async () => {
                            await router.replace("/dashboard/manage-vehicles");
                        }}
                        key="4"
                        icon={<CarOutlined/>}
                    >
                        Manage Vehicles
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    className={styles.site__layout__background}
                    style={{padding: 0}}
                >
                    {React.createElement(
                        collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: styles.trigger,
                            onClick: () => {
                                setCollapsed(!collapsed);
                            },
                        }
                    )}
                    <div className={styles.sign__out__button}>
                        <Button onClick={() => signOut()} type="primary" danger>
                            Sign Out
                        </Button>
                    </div>
                    <Content className={styles.content}>
                        <div className={styles.component__container}>
                            <Component/>
                        </div>
                    </Content>
                </Header>
            </Layout>
        </Layout>
    );
}
