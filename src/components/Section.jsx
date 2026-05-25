import './Section.css'

function Section({ children, id }) {
    return (
        <div className="my-section" id={id}>
            {children}
        </div>
    )
}

export default Section