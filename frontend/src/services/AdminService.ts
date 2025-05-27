import { make_request } from './BaseService.ts';


export async function delete_product(product_id: number | undefined) {
    await make_request(`/api/delete_product/${product_id}/`, 'DELETE');
}


export async function update_home_page(formData: FormData) {
    await make_request(`/api/update_home_page/`, 'POST', formData);
}
