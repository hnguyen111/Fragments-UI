import {Auth} from "aws-amplify";
import SignInForm from "../../../components/auth/sign-in/sign-in-form/sign-in-form";

export default function Index() {
    const onFinish = async ({username, password}: any) => {
        await Auth.signIn(username, password);
    };

    return <div style={{margin: "auto", maxWidth: 500, marginTop: "5rem"}}>
        <SignInForm onFinish={onFinish}/>
    </div>;
}