import SignUpForm from "../../../components/auth/sign-up/sign-up-form/sign-up-form";
import {Auth} from "aws-amplify";

export default function Index() {
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

    return <div style={{margin: "auto", maxWidth: 500, marginTop: "5rem"}}>
        <SignUpForm onFinish={onFinish}/>
    </div>;
}