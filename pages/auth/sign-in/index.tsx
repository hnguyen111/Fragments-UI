import {Auth} from "aws-amplify";
import SignInForm from "../../../components/auth/sign-in/sign-in-form/sign-in-form";
import {useRouter} from "next/router";

export default function Index() {
    const router = useRouter();

    const onFinish = async ({username, password}: any) => {
        await Auth.signIn(username, password);
        await router.replace("/");
    };

    return <div style={{margin: "auto", maxWidth: 500, marginTop: "5rem"}}>
        <SignInForm onFinish={onFinish}/>
    </div>;
}