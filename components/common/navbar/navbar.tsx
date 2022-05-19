import {Layout} from "antd";
import styles from "./styles.module.css";

const {Header, Content, Footer} = Layout;

export default function Navbar() {
    return <Layout>
        <Header className={styles.header}>
            <div className={styles.logo}>
                EnginX
            </div>
        </Header>
    </Layout>;
}
