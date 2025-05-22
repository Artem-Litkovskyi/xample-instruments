import ValidationError from "../errors/ValidationError.tsx";
import Cookies from 'universal-cookie';


const cookies = new Cookies();


export async function account_update(username: string, email: string, old_password: string, new_password: string) {
    const response = await fetch('/api/account_update/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookies.get('csrftoken'),
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, old_password, new_password }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new ValidationError(response.statusText, data.detail);
    }
}


export function validateUsername(value: string) {
    if (!(value && value.trim())) return 'This field can\'t be empty';

    return '';
}


export function validateEmail(value: string) {
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!re.test(value)) return 'Invalid email address';

    return '';
}


export function validatePassword(value: string) {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!re.test(value)) return 'Password is too weak';

    return '';
}