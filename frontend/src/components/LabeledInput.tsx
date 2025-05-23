import React from 'react';


export default function LabeledInput(params: {
    label: string, type: string, id: string, value: string | number,
    onChange?: React.ChangeEventHandler,
    onBlur?: React.ChangeEventHandler,
    ruleMessage?: string, errorMessage?: string,
    rows?: number,  // Text area
    min?: number, max?: number, step?: number,  // Number
}) {
    return (
        <div className='form-group'>
            <label htmlFor={params.id}>{params.label}</label>

            {!params.rows || params.rows <= 1 ? (
                <input
                    type={params.type} id={params.id} name={params.id} value={params.value}
                    min={params.min} max={params.max} step={params.step}
                    onChange={params.onChange} onBlur={params.onBlur}
                    className={params.errorMessage ? 'invalid' : undefined}
                />
            ) : (
                <textarea
                    id={params.id} name={params.id} value={params.value}
                    onChange={params.onChange} onBlur={params.onBlur}
                    className={params.errorMessage ? 'invalid' : undefined}
                    rows={params.rows}
                />
            )}

            {!params.errorMessage && (
                <span className='invalid'>
                    {params.errorMessage}
                </span>
            )}

            {!params.ruleMessage && (
                <span className='rule'>
                    {params.ruleMessage}
                </span>
            )}
        </div>
    )
}