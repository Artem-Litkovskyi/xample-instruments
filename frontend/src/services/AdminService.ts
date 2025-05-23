import { make_request } from './BaseService.ts';


export async function delete_product(product_id: number | undefined) {
    await make_request(`/api/delete_product/${product_id}/`, 'DELETE');
}
