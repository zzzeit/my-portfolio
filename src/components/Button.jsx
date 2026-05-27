import './Button.css'

function Button({ text, activeNumber, onClick , style, type}) {
    if (type === 3) {
        return (
            <button className={`my-button ${(activeNumber && activeNumber[0] === activeNumber[1]) ? 'selected' : 'unselected'}`} onClick={onClick} style={style}>
                {text}
            </button>
        )
    }
    else if (!activeNumber) {
        return (
            <button className="button-goto-projects" onClick={onClick} style={style}>
                {text}
            </button>
        )
    }

    return (
        <button className={`my-button ${activeNumber[0] === activeNumber[1] ? 'active' : ''} text-[10px] lg:text-[15px] `} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button