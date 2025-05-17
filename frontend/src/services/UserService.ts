export function validateUsername(value: string){
    if (!(value && value.trim())) return -1;

    return 0;
}


export function validateEmail(value: string){
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    if (!re.test(value)) return -1;

    if (false) {  // TODO: request to server
        return -2;
    }

    return 0;
}


export function validatePassword(value: string){
    const re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!re.test(value)) return -1;

    return 0;
}