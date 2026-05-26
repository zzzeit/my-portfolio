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
        <div className="project-card">
            <img src={image} alt={title} />
            <div className="card-text">
                <h3 style={{ marginBottom: '10px' }}>{title}</h3>
                <p>{description}</p>
                <div className="tag-container">
                    {tags.map((tag, index) => projectTag(tag))}
                </div>

                <div className="button-container">
                    <Button text="Source Code" style={{ backgroundColor: '#252525', height: '30px', fontSize: '14px' }} link={link} />
                    <Button text="View Project" style={{ height: '30px', fontSize: '14px' }} link={link} />
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
                "This is a dual-interface enrollment and scheduling web platform exclusive to MSU-IIT developed using React, Flask, and PostgreSQL. It features full CRUDL workflows, real-time messaging, interactive calendars, and automatic student verification logic",
            tags: ["React", "Flask", "SQLAlchemy", "PostgreSQL", "Bitbucket"],
            link: 'https://example.com/project1',
            category: 'Web',
        },
        {
            id: 'webssis',
            image: Webssis,
            title: 'Web SSIS',
            description:
                "This full-stack management application utilizes Next.js and Supabase to establish secure JWT authentication and comprehensive data workflows. It includes a protected profile media storage pipeline with file validation alongside a responsive server-side frontend interface",
            tags: ["Python", "PostgreSQL", "Supabase", "HTML/CSS", "React.js", "Next.js"],
            link: 'https://example.com/project2',
            category: 'Web',
        },
        {
            id: 'cybersentience',
            image: Cybersentience,
            title: 'Cybersentience',
            description:
                "This retro-styled survival-horror capstone project was built using Python and Pygame. It integrates resource management mechanics and stamina systems within an atmospheric, pseudo-3D environment powered by a custom 2D raycasting engine",
            tags: ["Python", "Pygame"],
            link: 'https://example.com/project3',
            category: 'Game',
        },
    ]

    const visibleProjects = projects.filter(p => filter === 'All' || p.category === filter)

    return (
        <Section id="projects">
            <div className="my-projects">
                <h1>Featured Projects</h1>
                <div className="decorator-divider"/>
                <h3 style={{ marginTop: '0' }}>Take a look at some representative applications I built to polish my skills.</h3>
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
                <div className="cards-section">
                    {visibleProjects.map(p => (
                        projectCard(p.image, p.title, p.description, p.tags, p.link)
                    ))}
                </div>
                
            </div>
        </Section>
    )
}

export default Projects