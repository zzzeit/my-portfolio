import './Projects.css'
import Section from './Section'
import Button from './Button'
import Hootline from '../assets/hootline.png'
import Webssis from '../assets/webssis.png'
import Cybersentience from '../assets/cybersentience.png'
import SSISVid from '../assets/ssis.mp4'
import HootlineVid from '../assets/the_hootline.mp4'
import CyberSentienceGif from '../assets/cybersentience.gif'
import Typewriter from 'typewriter-effect'
import { useState, useEffect } from 'react'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

function ProjectDefinitions({ className, title, text, tech, link}) {

    const [activeText, setActiveText] = useState(0)

    return (
        <div className={`${className}`}>
            <div className={`${activeText > 0 ? 'hide-cursor' : ''} max-[1200px]:max-w-[600px] min-[1200px]:max-w-[400px] ${
                title === "The Hootline" ? 'hootline' : title === "Simple Student Information System" ? 'ssis' : title === "Cyber Sentience" ? 'cyber' : ''
            }`}>
                <Typewriter
                    
                    onInit={(typewriter) => {
                        typewriter
                            .typeString(`<h1>${title}</h1>`)
                            .pauseFor(0)
                            .callFunction(() => {
                                setActiveText(1)
                            })
                            .changeDelay(1)
                            .start()
                    }}

                    options={{
                        delay: 40,
                        cursor: '|',
                    }}
                />
            </div>
            <div className="flex flex-col w-full gap-[16px] max-h-[100%] overflow-y-auto [scrollbar-width:none]">
                { activeText >= 1 && 
                    <div className={`${activeText > 1 ? 'hide-cursor' : ''} max-[1200px]:max-w-[600px] md:max-w-[600px] min-[1200px]:max-w-[400px]`}>
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(text)
                                    .pauseFor(0)
                                    .callFunction(() => {
                                        setActiveText(2)
                                    })
                                    .changeDelay(1)
                                    .start()
                            }}

                            options={{
                                delay: 1,
                                cursor: '|',
                            }}
                        />
                    </div>
                }
                { activeText >= 2 && 
                    <div style={{width:'100%', height: '0px', border: '1px solid var(--ui-border)'}} />
                }
                { activeText >= 2 && 
                    <div className={`${activeText > 2 ? 'hide-cursor' : ''} max-[1200px]:max-w-[600px] min-[1200px]:max-w-[400px]`}>
                        <Typewriter
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(tech)
                                    .pauseFor(3000)
                                    .callFunction(() => {
                                        setActiveText(3)
                                    })
                                    .changeDelay(1)
                                    .start()
                            }}

                            options={{
                                delay: 1,
                                cursor: '|',
                            }}
                        />
                    </div>
                }
            </div>   
            <div className="w-full mt-auto w-max-[600px]" >
                <Button text="Source Code" style={{ backgroundColor: 'var(--title-font-premium)', color: 'var(--ui-bg)', height: '40px', fontSize: '14px', width: '100%' }} link={link} onClick={() => window.open(link, '_blank')} />
            </div>
            
        </div>
    )
}

function Projects() {

    const [currentSlide, setCurrentSlide] = useState(0)
 

    const projects = [
        {
            id: 'hootline',
            image: Hootline,
            title: 'The Hootline',
            description:
                "Developed in collaboration with a four-member team, this dual-interface enrollment and scheduling web platform was built exclusively for MSU-IIT using React, Flask, and PostgreSQL. The application features comprehensive CRUDL workflows and robust student verification logic to ensure secure, efficient data management. To optimize user experience across both interfaces, the platform seamlessly integrates real-time messaging alongside interactive calendars designed for streamlined session scheduling.",
            tags: "Technologies: Python, React, Flask, SQLAlchemy, PostgreSQL, Bitbucket, Jira",
            link: 'https://github.com/Operator-Syn/peer-tutoring-platform.git',
            category: 'Web',
        },
        {
            id: 'webssis',
            image: Webssis,
            title: 'Simple Student Information System',
            description:
                "This full-stack management application utilizes Next.js and Supabase to establish secure JWT authentication, featuring a dedicated admin login and comprehensive data workflows. Built with three interconnected databases—students, colleges, and programs—the system supports full CRUDL functions alongside advanced search, sort, and filter capabilities for seamless data navigation. Additionally, the platform integrates a server-side frontend interface with a protected profile media storage pipeline that features built-in file validation.",
            tags: "Technologies: Python, PostgreSQL, Supabase, React.js, Next.js",
            link: 'https://github.com/zzzeit/SSIS-Web.git',
            category: 'Web',
        },
        {
            id: 'cybersentience',
            image: Cybersentience,
            title: 'Cyber Sentience',
            description:
                "Developed as a high school final year capstone project, this retro-styled survival-horror game was built using Python and Pygame, plunging players into an atmospheric, pseudo-3D environment powered by a custom 2D raycasting engine. The gameplay integrates tense resource management mechanics and a stamina system, forcing players to carefully balance their pacing and supplies. To win, players must navigate the haunting environment and complete critical objectives while being relentlessly pursued by an enemy, ultimately managing their survival to secure an escape.",
            tags: "Technologies: Python, Pygame",
            link: 'https://github.com/zzzeit/Capstone-Game-Project.git',
            category: 'Game',
        },
    ]


    return (
        <Section id="projects">
            <div className="my-projects max-h-[1500px] lg:min-h-[calc(100svh-73px)] pl-5 pr-5 lg:pl-20 lg:pr-20">
                <h1 id="projectsTitle">Featured Projects</h1>
                <div className="decorator-divider"/>
                <h3 style={{ margin: '0' }}>Take a look at some representative applications I built or contributed to in order to polish my skills.</h3>

                <div className="flex flex-col flex-col-reverse mt-10 gap-10 max-[1200px]:w-full min-[1200px]:flex-row">
                    <div className="max-[1200px]:w-full">
                        <ProjectDefinitions 
                            className="project-definitions flex flex-col items-center mx-auto p-[16px] gap-[16px] text-justify max-w-[600px] max-h-[400px] lg:h-full lg:overflow-auto max-[1200px]:h-[398px] min-[1200px]:w-[420px] min-[1200px]:max-h-[600px]"
                            key={projects[currentSlide].id} title={projects[currentSlide].title} text={projects[currentSlide].description} tech={projects[currentSlide].tags} link={projects[currentSlide].link} />
                    </div>
                    <Swiper
                        className="my-swiper w-full max-w-[600px]"
                        modules={[Navigation, Autoplay, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        navigation={true}
                        autoplay={{ delay: 50000, disableOnInteraction: false }}
                        onSlideChange={(e) => setCurrentSlide(e.activeIndex)}>
                        <SwiperSlide><video src={HootlineVid} autoPlay muted loop playsInline controls className="w-full h-full object-cover" /></SwiperSlide>
                        <SwiperSlide><video src={SSISVid} autoPlay muted loop playsInline className="w-full h-full object-cover" /></SwiperSlide>
                        <SwiperSlide><img src={CyberSentienceGif} width="100%" height="100%" /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </Section>
    )
}

export default Projects