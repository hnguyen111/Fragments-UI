/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        // API_URL: "http://fragments.us-east-1.elasticbeanstalk.com",
        API_URL: "http://localhost:8080",
        // API_URL: "http://ec2-54-90-215-247.compute-1.amazonaws.com:8080",
        AWS_REGION: "us-east-1",
        AWS_COGNITO_POOL_ID: "us-east-1_Gv1jSjfzy",
        AWS_COGNITO_APP_CLIENT_ID: "1cccuq4c8dit4f0b1k7kv9s6ir",
    },
    experimental: {
        outputStandalone: true,
    },
};

module.exports = nextConfig;
