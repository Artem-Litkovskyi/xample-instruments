import { makeRequest } from './BaseService.ts';


export interface LicenseInfo {
    license_id: string;
    product_id: string;
    product_title: string;
}

export interface OrderInfo {
    order_id: number;
    product_title: string;
    created_at: string;
    price: number;
}


export async function updateAccount(username: string, email: string, old_password: string, new_password: string) {
    await makeRequest('/api/update_account/', 'POST', { username, email, old_password, new_password });
}


export async function getMyLicenses() {
    return await makeRequest(`/api/my_licenses/`, 'GET');
}


export async function getMyOrders() {
    return await makeRequest(`/api/my_orders/`, 'GET');
}