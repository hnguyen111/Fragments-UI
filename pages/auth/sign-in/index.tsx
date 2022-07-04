import {Auth} from "aws-amplify";
import SignInForm from "../../../components/auth/sign-in/sign-in-form/sign-in-form";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {isAuthenticated} from "../../../services/auth/auth.service";
import {Skeleton} from "antd";

export default function Index() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isAuthenticated()
            .then(async (response: any) => {
                if (response) {
                    await router.replace("/");
                }
                setLoading(false);
            })
            .catch(async (e) => {

            });
    }, [router]);

    const onFinish = async ({username, password}: any) => {
        await Auth.signIn(username, password);
        await router.replace("/");
    };

    return !loading ? <div style={{margin: "auto", maxWidth: 500, marginTop: "5rem"}}>
        <SignInForm onFinish={onFinish}/>
    </div> : <div>
        <Skeleton active/>
        <Skeleton active/>
        <Skeleton active/>
    </div>;
}