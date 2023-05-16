export const API_BASE_URL = 'http://127.0.0.1:8090';

export const getActorList = async (input: {
    limit: number;
    page: number;
    name: string;
}) => {
    try {
        let startPage = input.page || 1;
        let startLimit = input.limit || 10;

        const response = await fetch(
            `${API_BASE_URL}/api/collections/actors/records?page=${startPage}&limit=${startLimit}`,
            {
                method: 'GET'
            }
        );

        const rawResponse = await response.json();

        return rawResponse;
    } catch (error: any) {
        return { success: false, data: null, message: error.message };
    }
};

export const addActor = async (input: {
    name: string;
    avatar: string;
    accessToken: string;
}) => {
    try {
        const { name, avatar, accessToken } = input;

        if (!name || name === '') {
            return { success: false, data: null, message: 'Invalid Name' };
        }

        if (!accessToken || accessToken === '') {
            return { success: false, data: null, message: 'Invalid Access Token' };
        }

        const response = await fetch(
            `${API_BASE_URL}/api/collections/actors/records`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ name, avatar })
            }
        );

        const rawResponse = await response.json();

        return rawResponse;
    } catch (error: any) {
        return { success: false, data: null, message: error.message };
    }
};

export const deleteActor = async (input: {
    id: string;
    accessToken: string;
}) => {
    try {
        const { id, accessToken } = input;

        if (!id || id === '') {
            return { success: false, data: null, message: 'Invalid Id' };
        }

        if (!accessToken || accessToken === '') {
            return { success: false, data: null, message: 'Invalid Access Token' };
        }

        const response = await fetch(
            `${API_BASE_URL}/api/collections/actors/records/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        const rawResponse = await response.json();

        return rawResponse;
    } catch (error: any) {
        return { success: false, data: null, message: error.message };
    }
};

export const updateActor = async (input: {
    id: string;
    name: string;
    avatar: string;
    accessToken: string;
}) => {
    try {
        const { id, name, avatar, accessToken } = input;

        if (!id || id === '') {
            return { success: false, data: null, message: 'Invalid Id' };
        }

        if (!accessToken || accessToken === '') {
            return { success: false, data: null, message: 'Invalid Access Token' };
        }

        const response = await fetch(
            `${API_BASE_URL}/api/collections/actors/records/${id}`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`
                },
                body: JSON.stringify({ name, avatar })
            }
        );

        const rawResponse = await response.json();

        return rawResponse;
    } catch (error: any) {
        return { success: false, data: null, message: error.message };
    }
};

export const getActorData = async (input: {
    id: string;
    accessToken: string;
}) => {
    try {
        const { id, accessToken } = input;

        if (!id || id === '') {
            return { success: false, data: null, message: 'Invalid Id' };
        }

        if (!accessToken || accessToken === '') {
            return { success: false, data: null, message: 'Invalid Access Token' };
        }

        const response = await fetch(
            `${API_BASE_URL}/api/collections/actors/records/${id}`,
            {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );

        const rawResponse = await response.json();

        return rawResponse;
    } catch (error: any) {
        return { success: false, data: null, message: error.message };
    }
};
