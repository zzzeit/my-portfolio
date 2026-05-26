import './Header.css'
import Button from './Button'
import { useEffect, useState } from 'react'
import useOnScreen from '../hooks/useOnScreen'

function scrollTo(id, setActiveHeaderButton, num) {
    const element = document.getElementById(id)
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
    }
    // setActiveHeaderButton(num)
}

function Header() {
    const [activeHeaderButton, setActiveHeaderButton] = useState(1)

    const homeOn = useOnScreen('#homeTitle', '-70px 0px 0px 0px')
    const projectsOn = useOnScreen('#projectsTitle', '-70px 0px 0px 0px')
    const contactOn = useOnScreen('#contactTitle', '-70px 0px 0px 0px')

    useEffect(() => {
        if (homeOn) setActiveHeaderButton(1)
        else if (projectsOn) setActiveHeaderButton(2)
        else if (contactOn) setActiveHeaderButton(3)
    }, [homeOn, projectsOn, contactOn])

    return (
        <>
            <div className="my-header">
                <div className="buttons-container">
                    <Button text="Home" activeNumber={[activeHeaderButton, 1]} onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                        }} />
                    <Button text="Projects" activeNumber={[activeHeaderButton, 2]} onClick={() => scrollTo('projects')} />
                    <Button text="Contact" activeNumber={[activeHeaderButton, 3]} onClick={() => scrollTo('contact')} />
                </div>
            </div>

        </>
        
    )
}

export default Header