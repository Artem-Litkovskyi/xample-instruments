import React from 'react';


export default function ValidatedInput(params: {
    label: string, type: string, id: string, value: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.ChangeEventHandler<HTMLInputElement>,
    ruleMessage?: string, errorMessage?: string
}) {
    return (
        <div className='form-group'>
            <label htmlFor={params.id}>{params.label}</label>
            
            <input
                type={params.type} id={params.id} name={params.id} value={params.value}
                onChange={params.onChange} onBlur={params.onBlur}
                className={params.errorMessage !== '' ? 'invalid' : undefined}
            />

            {(params.errorMessage !== '') && (
                <span className='invalid'>
                    {params.errorMessage}
                </span>
            )}

            {(params.ruleMessage !== '') && (
                <span className='rule'>
                    {params.ruleMessage}
                </span>
            )}
        </div>
    )
}