import {type ChangeEvent, type Dispatch, type SetStateAction, useEffect, useState} from 'react';
import GuiMapArea from "./GuiMapArea.tsx";
import GuiMap from "./GuiMap.tsx";

import '../assets/styles/components/ScreenshotAreasEditor.css';
import type {ScreenshotArea} from "../services/ProductService.ts";
import ScreenshotAreaEditor from './ScreenshotAreaEditor.tsx';


function ScreenshotAreasEditor(props: {
    areas: ScreenshotArea[],
    setAreas: Dispatch<SetStateAction<ScreenshotArea[]>>
}) {
    const [imageUrl, setImageUrl] = useState('default-image.png');
    const [activeGuiArea, setActiveGuiArea] = useState(-1);

    // Free memory when imageUrl changes
    useEffect(() => {
        return () => {
            if (imageUrl.startsWith('blob:')) {
                URL.revokeObjectURL(imageUrl);
            }
        };
    }, [imageUrl]);

    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('image/')) {
            setImageUrl(URL.createObjectURL(file));
        }
    }

    function handleAddArea() {
        props.setAreas(prev => [...prev,
            {
                title: 'New Area',
                description: '',
                x: 10,
                y: 10,
                width: 25,
                height: 25,
            }
        ])
    }

    function handleChangeArea(event: any) {
        const name = event.target.name;
        const value = event.target.value;

        props.setAreas(prevAreas => {
            const newAreas = [...prevAreas];
            const area = { ...newAreas[activeGuiArea] };

            if (['x', 'y', 'width', 'height'].includes(name)) {
                // @ts-ignore
                area[name] = parseInt(value) as any;
            } else {
                // @ts-ignore
                area[name] = value as any;
            }

            newAreas[activeGuiArea] = area;
            return newAreas;
        });
    }

    function handleDeleteArea() {
        props.setAreas(prevAreas =>
            prevAreas.filter((_, i) => i !== activeGuiArea)
        );
        setActiveGuiArea(-1);
    }

    return (
        <div className='screenshotAreasEditor'>
            <input
                type='file' id='screenshot_file' name='screenshot' accept='image/*'
                onChange={handleImageChange}
            />
            <GuiMap image_url={imageUrl} onClick={() => setActiveGuiArea(-1)}>
                {props.areas.map((item, i) => (
                    <GuiMapArea
                        position_x={item.x}
                        position_y={item.y}
                        width={item.width}
                        height={item.height}
                        onClick={() => setActiveGuiArea(i)}
                        key={i}
                        active={activeGuiArea === i}
                    />
                ))}
            </GuiMap>
            <button className='gray' onClick={handleAddArea}>Add area</button>
            {activeGuiArea !== -1 && (
                <ScreenshotAreaEditor
                    area={props.areas[activeGuiArea]}
                    handleChangeArea={handleChangeArea}
                    handleDeleteArea={handleDeleteArea}
                />
            )}
        </div>
    )
}


export default ScreenshotAreasEditor;