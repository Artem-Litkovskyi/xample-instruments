function ImageMapArea(props: {
    position_x: number, position_y: number, width: number, height: number,
    onClick: () => void, active: boolean
}) {
    return (
        <div
            className={props.active ? 'image-map-area active' : 'image-map-area'}
            style={{
                position: 'absolute',
                left: `${props.position_x}%`,
                top: `${props.position_y}%`,
                width: `${props.width}%`,
                height: `${props.height}%`
            }}
            onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                props.onClick();
            }}
        />
    )
}


export default ImageMapArea;