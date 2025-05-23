import Cookies from 'universal-cookie';

import ResponseNotOkError from '../errors/ResponseNotOkError.tsx';


const cookies = new Cookies();


export async function make_request(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', json_body?: object) {
    const headers: HeadersInit = {};

    if (json_body) {
        headers['Content-Type'] = 'application/json';
    }

    if (['POST', 'PUT', 'DELETE'].includes(method)) {
        headers['X-CSRFToken'] = cookies.get('csrftoken');
    }

    const response = await fetch(url, {
        method,
        headers,
        body: json_body ? JSON.stringify(json_body) : undefined,
        credentials: 'include',
    });

    if (!response.ok) {
        const data = await response.json();
        throw new ResponseNotOkError(response.statusText, data.detail);
    }

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