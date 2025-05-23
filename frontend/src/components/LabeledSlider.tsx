import React from 'react';


export default function LabeledSlider(params: {
    label: string, id: string, value: number,
    min: number, max: number, step: number,
    onChange?: React.ChangeEventHandler,
}) {
    return (
        <div className='form-group'>
            <label htmlFor={params.id}>{params.label}</label>
            <input
                type='range' id={params.id} name={params.id}
                min={params.min} max={params.max} step={params.step}
                value={params.value}
                onChange={params.onChange}
            />
        </div>
    )
}