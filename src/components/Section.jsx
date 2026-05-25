import './Section.css'

function Section({ children }) {
    return (
        <div className="my-section">
            {children}
        </div>
    )
}

export default Section