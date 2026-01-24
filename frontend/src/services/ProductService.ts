import { getFullBackendUrl, makeRequest } from './BaseService.ts';


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
    file_url: string;
    file_demo_url: string;
    screenshot_url: string;
    audio_demos: AudioDemo[];
    screenshot_areas: ScreenshotArea[];
}

export interface AudioDemo {
    title: string;
    file_url: string;
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
    const urlCategory = category ? `${category}/` : '';
    const data = await makeRequest(`/api/products/${urlCategory}`, 'GET');

    data.forEach((product: ProductShortInfo) => {
        product.screenshot_url = getFullBackendUrl(product.screenshot_url);
    });

    return data;
}


export async function getProduct(product_id: string) {
    const data = await makeRequest(`/api/product/${product_id}/`, 'GET');

    data.file_url = getFullBackendUrl(data.file_url);
    data.file_demo_url = getFullBackendUrl(data.file_demo_url);
    data.screenshot_url = getFullBackendUrl(data.screenshot_url);
    data.audio_demos.forEach((audio_demo: AudioDemo) => {
        audio_demo.file_url = getFullBackendUrl(audio_demo.file_url);
    });

    return data;
}


export async function buyProduct(product_id: number) {
    await makeRequest(`/api/buy_product/${product_id}/`, 'POST');
}


export async function downloadProductDemo(product_id: number) {
    await makeRequest(`/api/download_product_demo/${product_id}/`, 'GET');
}


export async function downloadProductFull(product_id: number) {
    await makeRequest(`/api/download_product_full/${product_id}/`, 'GET');
}