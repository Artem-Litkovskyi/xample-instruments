import { makeRequest } from './BaseService.ts';


export async function deleteProduct(product_id: number | undefined) {
    await makeRequest(`/api/delete_product/${product_id}/`, 'DELETE');
}


export async function updateHomePage(formData: FormData) {
    await makeRequest(`/api/update_home_page/`, 'POST', formData);
}
