import type {ScreenshotArea} from "../services/ProductService.ts";
import LabeledInput from "./LabeledInput.tsx";
import LabeledSlider from "./LabeledSlider.tsx";


function ScreenshotAreaEditor(props: {area: ScreenshotArea, handleChangeArea: any, handleDeleteArea: any}) {
    return (
        <>
            <LabeledInput
                label='Title:'
                type='text'
                id='title'
                value={props.area.title}
                onChange={props.handleChangeArea}
            />
            <LabeledInput
                label='Description:'
                type='text'
                id='description'
                value={props.area.description}
                rows={5}
                onChange={props.handleChangeArea}
            />
            <LabeledSlider
                label='Position X:' id='x' value={props.area.x}
                min={0} max={100} step={1}
                onChange={props.handleChangeArea}
            />
            <LabeledSlider
                label='Position Y:' id='y' value={props.area.y}
                min={0} max={100} step={1}
                onChange={props.handleChangeArea}
            />
            <LabeledSlider
                label='Width:' id='width' value={props.area.width}
                min={0} max={100} step={1}
                onChange={props.handleChangeArea}
            />
            <LabeledSlider
                label='Height:' id='height' value={props.area.height}
                min={0} max={100} step={1}
                onChange={props.handleChangeArea}
            />
            <button className='gray' onClick={props.handleDeleteArea}>
                Remove this area
            </button>
        </>
    )
}


export default ScreenshotAreaEditor;