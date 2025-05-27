import { makeRequest } from './BaseService.ts';


export interface HomePageInfo {
    hero_title: string;
    hero_subtitle: string;
    hero_link: string;
    hero_image_url: string;  // URL
    category_instruments_image_url: string;  // URL
    category_effects_image_url: string;  // URL
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
    return await makeRequest(`/api/home_page/`, 'GET');
}
