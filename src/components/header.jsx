import './Header.css'
import Button from './Button'
import { act, useState } from 'react'

function Header() {
    const [activeHeaderButton, setActiveHeaderButton] = useState(1)

    return (
        <>
            <div className="my-header">
                <div className="buttons-container">
                    <Button text="Home" activeNumber={[activeHeaderButton, 1]} onClick={() => setActiveHeaderButton(1)} />
                    <Button text="Projects" activeNumber={[activeHeaderButton, 2]} onClick={() => setActiveHeaderButton(2)} />
                    <Button text="Contact" activeNumber={[activeHeaderButton, 3]} onClick={() => setActiveHeaderButton(3)} />
                </div>
            </div>

        </>
        
    )
}

export default Header