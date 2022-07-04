import SignUpForm from "../../../components/auth/sign-up/sign-up-form/sign-up-form";
import {Auth} from "aws-amplify";
import {useEffect, useState} from "react";
import {isAuthenticated} from "../../../services/auth/auth.service";
import {useRouter} from "next/router";
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

    const onFinish = async ({
                                username,
                                name,
                                email,
                                password,
                            }: any) => {
        await Auth.signUp({
            username, password, attributes: {
                name,
                email
            }
        });
    };

    return !loading ? <div style={{margin: "auto", maxWidth: 500, marginTop: "5rem"}}>
        <SignUpForm onFinish={onFinish}/>
    </div> : <div>
        <Skeleton active/>
        <Skeleton active/>
        <Skeleton active/>
    </div>;
}