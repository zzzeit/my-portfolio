import './Projects.css'
import Section from './Section'
import Button from './Button'
import Hootline from '../assets/hootline.png'
import Webssis from '../assets/webssis.png'
import Cybersentience from '../assets/cybersentience.png'
import { useState } from 'react'

function projectTag(text) {
    return (
        <div className="project-tag">
            <p>
                {text}
            </p>
        </div>
    )
}

function projectCard(image, title, description, tags, link) {
    return (
        <div className="project-card min-w-[350px] lg:w-[400px]">
            <img src={image} alt={title} />
            <div className="card-text">
                <h3 style={{ marginBottom: '10px' }}>{title}</h3>
                <p className="description">{description}</p>
                <div className="tag-container">
                    {tags.map((tag, index) => projectTag(tag))}
                </div>

                <div className="button-container">
                    <Button text="Source Code" style={{ backgroundColor: '#252525', height: '40px', fontSize: '14px', width: '100%' }} link={link} onClick={() => window.open(link, '_blank')} />
                    {/* <Button text="View Project" style={{ height: '40px', fontSize: '14px' }} /> */}
                </div>
                
            </div>

        </div>
    )
}

function Projects() {

    const [activeFilter, setActiveFilter] = useState(1)
    const [filter, setFilter] = useState("All")

    const projects = [
        {
            id: 'hootline',
            image: Hootline,
            title: 'The Hootline',
            description:
                "This is a dual-interface enrollment and scheduling web platform exclusive to MSU-IIT developed using React, Flask, and PostgreSQL. It features full CRUDL workflows, real-time messaging, interactive calendars for session scheduling, and student verification logic.",
            tags: ["React", "Flask", "SQLAlchemy", "PostgreSQL", "Bitbucket", "Jira"],
            link: 'https://github.com/Operator-Syn/peer-tutoring-platform.git',
            category: 'Web',
        },
        {
            id: 'webssis',
            image: Webssis,
            title: 'Simple Student Information System',
            description:
                "This full-stack management application utilizes Next.js and Supabase to establish secure JWT authentication and comprehensive data workflows. It includes a protected profile media storage pipeline with file validation alongside a responsive server-side frontend interface.",
            tags: ["PostgreSQL", "Supabase", "React.js", "Next.js", "LottieFiles", "Vercel"],
            link: 'https://github.com/zzzeit/SSIS-Web.git',
            category: 'Web',
        },
        {
            id: 'cybersentience',
            image: Cybersentience,
            title: 'Cybersentience',
            description:
                "This retro-styled survival-horror capstone project was built using Python and Pygame. It integrates resource management mechanics and stamina systems within an atmospheric, pseudo-3D environment powered by a custom 2D raycasting engine.",
            tags: ["Python", "Pygame"],
            link: 'https://github.com/zzzeit/Capstone-Game-Project.git',
            category: 'Game',
        },
    ]

    const visibleProjects = projects.filter(p => filter === 'All' || p.category === filter)

    return (
        <Section id="projects">
            <div className="my-projects h-[900px] lg:h-[calc(100svh - 73px)] pl-5 pr-5 lg:pl-20 lg:pr-20">
                <h1 id="projectsTitle">Featured Projects</h1>
                <div className="decorator-divider"/>
                <h3 style={{ margin: '0' }}>Take a look at some representative applications I built to polish my skills.</h3>
                <div className="container-filter">
                    <Button text="All" activeNumber={[activeFilter, 1]} onClick={() => {
                        setActiveFilter(1)
                        setFilter("All")
                    }} type={3} />
                    <Button text="Web" activeNumber={[activeFilter, 2]} onClick={() => {
                        setActiveFilter(2)
                        setFilter("Web")
                    }} type={3} />
                    <Button text="Game" activeNumber={[activeFilter, 3]} onClick={() => {
                        setActiveFilter(3)
                        setFilter("Game")
                    }} type={3} />
                </div>
                <div className="max-w-[100%]">
                    <div className="cards-section">
                        {visibleProjects.map(p => (
                            projectCard(p.image, p.title, p.description, p.tags, p.link)
                        ))}
                    </div>
                </div>
                
                
            </div>
        </Section>
    )
}

export default Projects