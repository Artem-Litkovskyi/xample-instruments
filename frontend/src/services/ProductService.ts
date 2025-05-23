import { make_request } from './BaseService.ts';


export async function get_products(category: string | undefined) {
    return await make_request(`/api/products/${category}`, 'GET');
}


export async function get_product(product_id: string | undefined) {
    return await make_request(`/api/product/${product_id}`, 'GET');
}


export async function buy(product_id: number | undefined) {
    await make_request(`/api/buy/${product_id}/`, 'POST');
}


export async function download_product_demo(product_id: number | undefined) {
    await make_request(`/api/download_product_demo/${product_id}/`, 'GET');
}


export async function download_product(product_id: number | undefined) {
    await make_request(`/api/download_product/${product_id}/`, 'GET');
}