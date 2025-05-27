import { useEffect, useState } from 'react';

import Hero from '../../components/Hero.tsx';
import CategoryCard from '../../components/CategoryCard.tsx';
import LoaderContainer from '../../components/LoaderContainer.tsx';
import { get_home_page, type HomePageInfo } from '../../services/HomePageService.ts';
import LabeledInput from "../../components/LabeledInput.tsx";
import ResponseNotOkError from "../../errors/ResponseNotOkError.tsx";
import FileInput from "../../components/FileInput.tsx";
import {update_home_page} from "../../services/AdminService.ts";
import PagePreview from "../../components/PagePreview.tsx";


function ManageHomePage() {
    const [fields, setFields] = useState({
        hero_title:'',
        hero_subtitle:'',
        hero_link:'',
        hero_image:null,
        category_instruments_image:null,
        category_effects_image:null,
    });

    const [errors, setErrors] = useState({
        hero_title:'',
        hero_subtitle:'',
        hero_link:'',
        hero_image:'',
        category_instruments_image:'',
        category_effects_image:'',
    });

    const [fetchMessage, setFetchMessage] = useState('');

    const [imageUrls, setImageUrls] = useState({
        hero_image:'',
        category_instruments_image:'',
        category_effects_image:'',
    });

    const [loading, setLoading] = useState(true);

    // Load current home page info
    useEffect(() => {
        get_home_page()
            .then((data: HomePageInfo) => {
                setFields(prev => ({
                    ...prev,
                    hero_title: data.hero_title,
                    hero_subtitle: data.hero_subtitle,
                    hero_link: data.hero_link,
                }));

                setImageUrls({
                    hero_image: data.hero_image_url,
                    category_instruments_image: data.category_instruments_image_url,
                    category_effects_image: data.category_effects_image_url,
                });
            })
            .finally(() => setLoading(false));
        return () => {setLoading(true)}
    }, []);

    const handleChange = (event: any) => {
        const name = event.target.name;
        const isImage = name.includes('image');

        if (!isImage) {
            const value = event.target.value;
            setFields(prev => ({...prev, [name]: value}));
        } else {
            const file = event.target.files[0];
            setFields(prev => ({...prev, [name]: file}));
            URL.revokeObjectURL(imageUrls[name as keyof typeof imageUrls]);  // Free memory
            setImageUrls(prev => ({...prev, [name]: URL.createObjectURL(file)}));
        }

        setErrors(prev => ({...prev, [name]: ''}));
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        // Create form data
        const data = new FormData();
        data.append('hero_title', fields.hero_title);
        data.append('hero_subtitle', fields.hero_subtitle);
        data.append('hero_link', fields.hero_link);

        if (fields.hero_image) {
            data.append('hero_image', fields.hero_image);
        }

        if (fields.category_instruments_image) {
            data.append('category_instruments_image', fields.category_instruments_image);
        }

        if (fields.category_effects_image) {
            data.append('category_effects_image', fields.category_effects_image);
        }

        // Send request
        try {
            await update_home_page(data);
        } catch (error) {
            if (error instanceof ResponseNotOkError) {
                setErrors(prev => ({
                    ...prev,
                    // @ts-ignore
                    hero_title: error.detail?.hero_title || '',
                    // @ts-ignore
                    hero_subtitle: error.detail?.hero_subtitle || '',
                    // @ts-ignore
                    hero_link: error.detail?.hero_link || '',
                    // @ts-ignore
                    hero_image: error.detail?.hero_image || '',
                    // @ts-ignore
                    category_instruments_image: error.detail?.category_instruments_image || '',
                    // @ts-ignore
                    category_effects_image: error.detail?.category_effects_image || '',
                }));
                return;
            }

            setFetchMessage('Oops, something went wrong...');
            setTimeout(() => setFetchMessage(''), 2000);
            throw error;
        }

        setFetchMessage('Updated successfully!');
        setTimeout(() => setFetchMessage(''), 2000);
    }

    return (
        <LoaderContainer loading={loading}>
            <div className='content narrow'>
                <div className='panel dark padded'>
                    <form
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    >
                        <h2>Hero</h2>

                        <LabeledInput
                            label='Title:' type='text' id='hero_title' value={fields.hero_title}
                            onChange={handleChange}
                            errorMessage={errors.hero_title}
                        />

                        <LabeledInput
                            label='Subtitle:' type='text' id='hero_subtitle' value={fields.hero_subtitle}
                            onChange={handleChange}
                            errorMessage={errors.hero_subtitle}
                        />

                        <LabeledInput
                            label='Link:' type='text' id='hero_link' value={fields.hero_link}
                            onChange={handleChange}
                            errorMessage={errors.hero_link}
                        />

                        <FileInput
                            label='Image:' id='hero_image'
                            onChange={handleChange}
                            errorMessage={errors.hero_image}
                        />

                        <h2>Categories</h2>

                        <FileInput
                            label='Instruments image:' id='category_instruments_image'
                            onChange={handleChange}
                            errorMessage={errors.category_instruments_image}
                        />

                        <FileInput
                            label='Effects image:' id='category_effects_image'
                            onChange={handleChange}
                            errorMessage={errors.category_effects_image}
                        />

                        <div>
                            <span>{fetchMessage}</span>
                            <button type='submit' className='button gray'>Upload</button>
                        </div>
                    </form>
                </div>
            </div>

            <PagePreview>
                <Hero
                    title={fields.hero_title}
                    subtitle={fields.hero_subtitle}
                    href={fields.hero_link}
                    image_url={imageUrls.hero_image}
                />

                <div className='content'>
                    <div className='content-grid small'>
                        <CategoryCard
                            title='Discover instruments'
                            href='/products/instrument'
                            image_url={imageUrls.category_instruments_image}
                            alt='instruments'
                        />
                        <CategoryCard
                            title='Discover audio effects'
                            href='/products/effect'
                            image_url={imageUrls.category_effects_image}
                            alt='effects'
                        />
                    </div>
                </div>
            </PagePreview>
        </LoaderContainer>
    )
}


export default ManageHomePage;