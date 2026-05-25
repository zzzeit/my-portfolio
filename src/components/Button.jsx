import './Button.css'

function Button({ text, activeNumber, onClick , style}) {
    if (!activeNumber) {
        return (
            <button className="button-goto-projects" onClick={onClick} style={style}>
                {text}
            </button>
        )
    }

    return (
        <button className={`my-button ${activeNumber[0] === activeNumber[1] ? 'active' : ''}`} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button