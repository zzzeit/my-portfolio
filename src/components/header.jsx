import './Header.css'
import Button from './Button'
import { act, useState } from 'react'

function scrollTo(id, setActiveHeaderButton, num) {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveHeaderButton(num)
}

function Header() {
    const [activeHeaderButton, setActiveHeaderButton] = useState(1)

    return (
        <>
            <div className="my-header">
                <div className="buttons-container">
                    <Button text="Home" activeNumber={[activeHeaderButton, 1]} onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                            setActiveHeaderButton(1)
                        }} />
                    <Button text="Projects" activeNumber={[activeHeaderButton, 2]} onClick={() => scrollTo('projects', setActiveHeaderButton, 2)} />
                    <Button text="Contact" activeNumber={[activeHeaderButton, 3]} onClick={() => scrollTo('contact', setActiveHeaderButton, 3)} />
                </div>
            </div>

        </>
        
    )
}

export default Header