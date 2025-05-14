import React from "react";


enum ValidatedInputState {
    Initial="",
    Valid="valid",
    Invalid="invalid",
}


function ValidatedInput(params: {
    label: string, type: string, id: string, value: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    onBlur?: React.ChangeEventHandler<HTMLInputElement>,
    ruleMessage?: string, alwaysShowRule?: boolean, state?: ValidatedInputState,
}) {
    return (
        <div className="form-group">
            <label htmlFor={params.id}>{params.label}</label>
            
            <input
                type={params.type} id={params.id} name={params.id} value={params.value}
                onChange={params.onChange} onBlur={params.onBlur} className={params.state}
            />

            {(params.alwaysShowRule || params.state === ValidatedInputState.Invalid) && (
                <span className={params.state === ValidatedInputState.Initial ? "rule" : params.state}>
                    {params.ruleMessage}
                </span>
            )}
        </div>
    )
}


export default ValidatedInput;
export {ValidatedInputState};
