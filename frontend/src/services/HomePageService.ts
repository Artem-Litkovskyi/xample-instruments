import { getFullBackendUrl, makeRequest } from './BaseService.ts';


export interface HomePageInfo {
    hero_title: string;
    hero_subtitle: string;
    hero_link: string;
    hero_image_url: string;
    category_instruments_image_url: string;
    category_effects_image_url: string;
}


export const defaultHomePageInfo: HomePageInfo = {
    hero_title: '',
    hero_subtitle: '',
    hero_link: '',
    hero_image_url: '',
    category_instruments_image_url: '',
    category_effects_image_url: '',
};


export async function getHomePage() {
    const data = await makeRequest(`/api/home_page/`, 'GET');

    data.hero_image_url = getFullBackendUrl(data.hero_image_url);
    data.category_instruments_image_url = getFullBackendUrl(data.category_instruments_image_url);
    data.category_effects_image_url = getFullBackendUrl(data.category_effects_image_url);

    return data;
}
