import { useState } from 'react';

import HeaderAndFooter from './HeaderAndFooter';

import { type ScreenshotArea } from '../services/ProductService';

import '../assets/styles/pages/ProductPage.css';
import LabeledInput from "../components/LabeledInput.tsx";
import ScreenshotAreasEditor from "../components/ScreenshotAreasEditor.tsx";


function AddProductPage() {
    const [fields, setFields] = useState({
            title: '',
            subtitle: '',
            category: '',
            description: '',
            sys_req: '',
            price: 0,
    });

    const [areas, setAreas] = useState<ScreenshotArea[]>([]);

    const handleChange = (event: any) => {
        const name = event.target.name;
        let value = event.target.value;

        if (name === 'price') {
            value = Math.floor(value);
            if (value < 0) {
                value = 0;
            }
        }

        setFields(prev => ({...prev, [name]: value}));
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        const formData = new FormData();

        Object.entries(fields).map(([key, value]) => {
            formData.append(key, String(value));
        })

        await createProduct(formData);
    }

    return (
        <HeaderAndFooter>
            <div className='content narrow'>
                <div className='panel dark padded'>
                    <h2>Add product</h2>

                    <form
                        onSubmit={handleSubmit}
                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                    >
                        <LabeledInput
                            label='Title:' type='text' id='title' value={fields.title}
                            onChange={handleChange}
                        />

                        <LabeledInput
                            label='Subtitle:' type='text' id='subtitle' value={fields.subtitle}
                            onChange={handleChange}
                            rows={5}
                        />

                        <LabeledInput
                            label='Price (cents):' type='number' id='price' value={fields.price}
                            onChange={handleChange}
                            min={0} step={1}
                        />

                        <LabeledInput
                            label='About:' type='text' id='description' value={fields.description}
                            onChange={handleChange}
                            rows={10}
                        />

                        <LabeledInput
                            label='System requirements:' type='text' id='sys_req' value={fields.sys_req}
                            onChange={handleChange}
                            rows={5}
                        />

                        <ScreenshotAreasEditor areas={areas} setAreas={setAreas} />

                        <div>
                            <p className='invalid'>f</p>
                            <button type='submit' className='button gray'>Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        </HeaderAndFooter>
    )
}


export default AddProductPage;