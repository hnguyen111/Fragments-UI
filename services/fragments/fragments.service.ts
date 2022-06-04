export async function getUserFragments(user: any) {
    const res = await fetch(`${process.env.API_URL}/v1/fragments`, {
        headers: user.authorizationHeaders(),
    });
    if (!res.ok) {
        return new Error(`${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    console.log("Got user fragments data", {data});
}

export async function createFragment(user: any, contentType: any, body: any) {
    const response = await fetch(`${process.env.API_URL}/v1/fragments`, {
        method: "POST",
        headers: user.authorizationHeaders(contentType),
        body: body
    });
    if (!response.ok) {
        return new Error(`${response.status} ${response.statusText}`);
    }
}