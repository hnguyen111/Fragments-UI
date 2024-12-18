import mime from "mime-types";
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

export async function getFragmentData(account: User, id: string, mimeType = "") {
    const response = await fetch(`${process.env.API_URL}/v1/fragments/${id}${mimeType ? `.${mime.extension(mimeType)}` : ""}`, {
        method: "GET",
        headers: account.authorizationHeaders(""),
    });
    if (!response.ok) {
        return new Error(`${response.status} ${response.statusText}`);
    } else {
        return response.blob();
    }
}

export async function createFragment(account: User, contentType: string, body: any) {
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

export function getSupportedMimeTypes(mimeType: string) {
    const supportedTypesAndExtensions = {
        "text/plain": [".txt"],
        "text/markdown": [".md", ".html", ".txt"],
        "text/html": [".html", ".txt"],
        "application/json": [".json", ".txt"],
        "image/png": [".png", ".jpg", ".webp", ".gif"],
        "image/jpeg": [".png", ".jpg", ".webp", ".gif"],
        "image/webp": [".png", ".jpg", ".webp", ".gif"],
        "image/gif": [".png", ".jpg", ".webp", ".gif"],
    };
    const supportedMimeTypes: string[] = [];
    for (const [key, value] of Object.entries(supportedTypesAndExtensions)) {
        if (key === mimeType) {
            value.forEach((type) => {
                supportedMimeTypes.push(mime.lookup(type) as string);
            });
        }
    }
    return supportedMimeTypes;
}