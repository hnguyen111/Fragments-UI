import User from "../../types/authentication/user.type";

export async function getAllFragmentsId(account: User) {
    const response = await fetch(`${process.env.API_URL}/v1/fragments`, {
        headers: account.authorizationHeaders(),
    });
    if (!response.ok) {
        return new Error(`${response.status} ${response.statusText}`);
    } else {
        return await response.json();
    }
}

export async function getAllFragments(account: User, expand = 0) {
    const response = await fetch(`${process.env.API_URL}/v1/fragments?expand=${expand}`, {
        method: "GET",
        headers: account.authorizationHeaders(),
    });
    if (!response.ok) {
        return new Error(`${response.status} ${response.statusText}`);
    } else {
        return await response.json();
    }
}

export async function getFragmentData(account: User, id: string, extension = "") {
    const response = await fetch(`${process.env.API_URL}/v1/fragments/${id}${extension ? `extension${extension}` : ""}`, {
        method: "GET",
        headers: account.authorizationHeaders(""),
    });
    if (!response.ok) {
        return new Error(`${response.status} ${response.statusText}`);
    } else {
        return await response.json();
    }
}

export async function createFragment(account: User, contentType: string, body: any) {
    console.log(contentType);
    const response = await fetch(`${process.env.API_URL}/v1/fragments`, {
        method: "POST",
        headers: account.authorizationHeaders(contentType),
        body: body
    });
    if (!response.ok) {
        return new Error(`${response.status} ${response.statusText}`);
    } else {
        return await response.json();
    }
}

export async function updateFragment(account: User, id: string, contentType: string, body: any) {
    const response = await fetch(`${process.env.API_URL}/v1/fragments/${id}`, {
        method: "PUT",
        headers: account.authorizationHeaders(contentType),
        body: body
    });
    if (!response.ok) {
        return new Error(`${response.status} ${response.statusText}`);
    } else {
        return await response.json();
    }
}

export async function deleteFragment(account: User, id: string) {
    const response = await fetch(`${process.env.API_URL}/v1/fragments/${id}`, {
        method: "DELETE",
        headers: account.authorizationHeaders(),
    });
    if (!response.ok) {
        return new Error(`${response.status} ${response.statusText}`);
    } else {
        return await response.json();
    }
}