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