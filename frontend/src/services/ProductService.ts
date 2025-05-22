import ValidationError from '../errors/ValidationError.tsx';
import Cookies from 'universal-cookie';


const cookies = new Cookies();


export async function get_products(category: string | undefined) {
    const response = await fetch(`/api/products/${category}`);

    const data = await response.json();

    if (!response.ok) {
        throw new ValidationError(response.statusText, data.detail);
    }

    return data;
}


export async function get_product(product_id: string | undefined) {
    const response = await fetch(`/api/product/${product_id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new ValidationError(response.statusText, data.detail);
    }

    return data;
}


export async function get_my_products() {
    const response = await fetch('/api/my_products/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken'),
        },
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ValidationError(response.statusText, data.detail);
    }

    return data;
}


export async function get_my_orders() {
    const response = await fetch('/api/my_orders/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken'),
        },
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ValidationError(response.statusText, data.detail);
    }

    return data;
}


export async function buy(product_id: number | undefined) {
    const response = await fetch(`/api/buy/${product_id}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken'),
        },
        credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ValidationError(response.statusText, data.detail);
    }
}