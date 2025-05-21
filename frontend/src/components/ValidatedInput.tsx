import React from 'react';


export default function ValidatedInput(params: {
    label: string, type: string, id: string, value: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.ChangeEventHandler<HTMLInputElement>,
    ruleMessage?: string, alwaysShowRule?: boolean,
    state: string,  // state: 'initial', 'valid' or 'invalid'
}) {
    const stateToClass = (state: string) => {
        switch (state) {
            case 'initial':
                return 'weak';
            case 'valid':
                return 'valid';
            case 'invalid':
                return 'invalid';
        }
    }

    return (
        <div className='form-group'>
            <label htmlFor={params.id}>{params.label}</label>
            
            <input
                type={params.type} id={params.id} name={params.id} value={params.value}
                onChange={params.onChange} onBlur={params.onBlur} className={params.state}
            />

            {(params.alwaysShowRule || params.state === 'invalid') && (
                <span className={stateToClass(params.state)}>
                    {params.ruleMessage}
                </span>
            )}
        </div>
    )
}