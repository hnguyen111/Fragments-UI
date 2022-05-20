export async function getUserFragments(user: any) {
    console.log("Requesting user fragments data...");
    try {
        const res = await fetch(`${process.env.API_URL}/v1/fragments`, {
            headers: user.authorizationHeaders(),
        });
        if (!res.ok) {
            return new Error(`${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Got user fragments data", {data});
    } catch (err) {
        console.error("Unable to call GET /v1/fragment", {err});
    }
}