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
            <div className="my-home min-h-[750px] h-[calc(100svh-73px)] lg:h-[calc(100vh-73px)] lg:height-auto pl-5 pr-5 lg:pl-20 lg:pr-20 gap-10 lg:gap-35 flex-col-reverse lg:flex-row mt-[70px]">
                <div className="home-details gap-1 lg:gap-4">
                    <h1 className="text-center lg:text-left leading-10 lg:leading-1.2" id="homeTitle">Hi, I'm <span className="gradient-text">Neil Anthony</span></h1>
                    <h2 className="text-center lg:text-left mb-4">Aspiring Software Developer</h2>
                    <p className="max-w-[500px] lg:max-w-[600px]">I'm a software developer specializing in building exceptional digital experiences. Currently, I'm focused on building responsive web applications.</p>
                    <div className="home-buttons justify-center lg:justify-start max-[405px]:flex-col">
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