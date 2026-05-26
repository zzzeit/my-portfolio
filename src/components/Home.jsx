import './Home.css'
import Section from './Section'
import ProfileIMG from '../assets/profile.jpg'
import Button from './Button'

function Home() {

    const scrollToProjects = () => {
        document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
    }

    const scrollToContact = () => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <Section>
            <div className="my-home">
                <div className="home-details">
                    <h1 id="homeTitle">Hi, I'm <span className="gradient-text">Neil Anthony</span></h1>
                    <h2>Aspiring Software Developer</h2>
                    <p>I'm a software developer specializing in building exceptional digital experiences. Currently, I'm focused on building responsive web applications.</p>
                    <div className="home-buttons">
                        <Button text="View My Projects" onClick={scrollToProjects} />
                        <Button text="Lets Connect" style={{ backgroundColor: '#252525' }} onClick={scrollToContact} />
                    </div>
                    
                </div>
                <div className="home-image">
                    <img src={ProfileIMG} alt="Neil's Profile" className="profile-image" />
                </div>
            </div>
        </Section>
    )
}

export default Home