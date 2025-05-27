import type { ChangeEventHandler } from 'react';


export default function FileInput(params: {
    label: string, id: string,
    onChange?: ChangeEventHandler,
    ruleMessage?: string, errorMessage?: string,
}) {
    return (
        <div className='form-group'>
            <label htmlFor={params.id}>{params.label}</label>

            <input
                type='file' id={params.id} name={params.id}
                onChange={params.onChange}
                className={params.errorMessage ? 'invalid' : undefined}
            />

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