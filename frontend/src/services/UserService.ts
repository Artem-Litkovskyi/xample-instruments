import { make_request } from './BaseService.ts';


export async function account_update(username: string, email: string, old_password: string, new_password: string) {
    await make_request('/api/account_update/', 'POST', { username, email, old_password, new_password });
}


export async function get_my_licenses() {
    return await make_request(`/api/my_licenses/`, 'GET');
}


export async function get_my_orders() {
    return await make_request(`/api/my_orders/`, 'GET');
}