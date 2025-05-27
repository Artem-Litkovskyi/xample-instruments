import { makeRequest } from './BaseService.ts';


export interface ProductShortInfo {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    price: number;
    purchased: boolean;
    screenshot_url: string;
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


export async function getProducts(category: string | undefined) {
    return await makeRequest(`/api/products/${category}`, 'GET');
}


export async function getProduct(product_id: string | undefined) {
    return await makeRequest(`/api/product/${product_id}`, 'GET');
}


export async function buyProduct(product_id: number | undefined) {
    await makeRequest(`/api/buy/${product_id}/`, 'POST');
}


export async function downloadProductDemo(product_id: number | undefined) {
    await makeRequest(`/api/download_product_demo/${product_id}/`, 'GET');
}


export async function downloadProductFull(product_id: number | undefined) {
    await makeRequest(`/api/download_product_full/${product_id}/`, 'GET');
}