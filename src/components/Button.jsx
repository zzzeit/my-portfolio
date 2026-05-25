import './Button.css'

function Button({ Text, activeNumber, onClick }) {
    return (
        <button className={`my-button ${activeNumber[0] === activeNumber[1] ? 'active' : ''}`} onClick={onClick}>
            {Text}
        </button>
    )
}

export default Button