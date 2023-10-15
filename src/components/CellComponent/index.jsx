function CellComponent(props) {
    const { value, handleClick } = props;
    return (
        <div className={`board__cell ${value ? `board__cell--${value}` : ''}`} onClick={handleClick}>
            {value}
        </div>
    );
}

export default CellComponent;