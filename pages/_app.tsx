import {Amplify} from "aws-amplify";
import {RecoilRoot} from "recoil";
import type {AppProps} from "next/app";
import "../styles/globals.css";
import "antd/dist/antd.css";

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: process.env.AWS_REGION,
        userPoolId: process.env.AWS_COGNITO_POOL_ID,
        userPoolWebClientId: process.env.AWS_COGNITO_APP_CLIENT_ID,
    }
});

function App({Component, pageProps,}: AppProps) {
    return <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>;
}

export default App;
