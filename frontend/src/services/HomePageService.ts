import { make_request } from './BaseService.ts';


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


export async function get_home_page() {
    return await make_request(`/api/home_page/`, 'GET');
}
