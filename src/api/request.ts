export async function request(endpoint: string) {
    const response = await fetch(endpoint);

    if (!response) {
        throw new Error(`Can not reach to ${endpoint}`);
    }

    return response.json();

}

