import { AUTH_TOKEN } from './auth';

export async function fetchDataAuth(
    url: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH',
    data = null,
    headers = {}
) {
    const accessToken = localStorage.getItem(AUTH_TOKEN);

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            ...headers
        },
        body: data ? JSON.stringify(data) : null
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }

    const json = await response.json();
    return json;
}

