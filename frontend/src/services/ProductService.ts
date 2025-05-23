import { make_request } from './BaseService.ts';


export interface ProductShortInfo {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    price: number;
    purchased: boolean;
    screenshot: string;
}

export interface ProductFullInfo {
    title: string;
    subtitle: string;
    category: string;
    description: string;
    sys_req: string;
    price: number;
    purchased: boolean;
    file: string; // URL
    file_demo: string; // URL
    screenshot: string; // URL
    audio_demos: AudioDemo[];
    screenshot_areas: ScreenshotArea[];
}

export interface AudioDemo {
    title: string;
    file: string; // URL
}

export interface ScreenshotArea {
    title: string;
    description: string;
    x: number;
    y: number;
    width: number;
    height: number;
}


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