import Cookies from 'universal-cookie';

import ResponseNotOkError from '../errors/ResponseNotOkError.tsx';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';

export function getFullBackendUrl(path: string) {
    return `${BACKEND_URL}${path}`;
}


const cookies = new Cookies();


export async function makeRequest(
    path: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    body?: any
) {
    const isFormData = body instanceof FormData;

    // Set headers
    const headers: HeadersInit = {};

    if (body && !isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    if (['POST', 'PUT', 'DELETE'].includes(method)) {
        headers['X-CSRFToken'] = cookies.get('csrftoken');
    }

    // Fetch
    const response = await fetch(getFullBackendUrl(path), {
        method,
        headers,
        credentials: 'include',
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    });

    if (!response.ok) {
        const data = await response.json();
        throw new ResponseNotOkError(response.statusText, data);
    }

    // Process the response
    const contentType = response.headers.get('Content-Type') || '';

    if (contentType.includes('application/json')) {
        return response.json();
    } else {
        const blob = await response.blob();

        // Get a filename specified in the server response
        const contentDisposition = response.headers.get('Content-Disposition');
        const match = contentDisposition?.match(/filename="?(.+)"?/);
        const filename = match ? match[1] : 'xample_instruments_file';

        // Download the file
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    }
}