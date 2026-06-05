import './Projects.css'
import Section from './Section'
import Button from './Button'
import Hootline from '../assets/hootline.png'
import Webssis from '../assets/webssis.png'
import Cybersentience from '../assets/cybersentience.png'
import SampleVid from '../assets/sample-vid2.mp4'
import Typewriter from 'typewriter-effect'
import { useState, useEffect } from 'react'

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// function projectTag(text) {
//     return (
//         <div className="project-tag">
//             <p>
//                 {text}
//             </p>
//         </div>
//     )
// }

function ProjectDefinitions({title, text, tech, link}) {

    const [activeText, setActiveText] = useState(0)

    return (
        <div className="project-definitions">
            <div className={activeText > 0 ? 'hide-cursor' : ''}>
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
            <div className="flex flex-col gap-[16px] max-h-[100%] overflow-y-auto [scrollbar-width:none]">
                { activeText >= 1 && 
                    <div className={activeText > 1 ? 'hide-cursor' : ''}>
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
                    <div className={activeText > 2 ? 'hide-cursor' : ''}>
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
            <div className="mt-auto" >
                <Button text="Source Code" style={{ backgroundColor: '#252525', height: '40px', fontSize: '14px', width: '100%' }} link={link} onClick={() => window.open(link, '_blank')} />
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
                "This is a dual-interface enrollment and scheduling web platform exclusive to MSU-IIT developed using React, Flask, and PostgreSQL. It features full CRUDL workflows, real-time messaging, interactive calendars for session scheduling, and student verification logic.",
            tags: "Technologies: React, Flask, SQLAlchemy, PostgreSQL, Bitbucket, Jira",
            link: 'https://github.com/Operator-Syn/peer-tutoring-platform.git',
            category: 'Web',
        },
        {
            id: 'webssis',
            image: Webssis,
            title: 'Simple Student Information System',
            description:
                "This full-stack management application utilizes Next.js and Supabase to establish secure JWT authentication and comprehensive data workflows. It includes a protected profile media storage pipeline with file validation alongside a responsive server-side frontend interface. This full-stack management application utilizes Next.js and Supabase to establish secure JWT authentication and comprehensive data workflows. It includes a protected profile media storage pipeline with file validation alongside a responsive server-side frontend interface.",
            tags: "Technologies: PostgreSQL, Supabase, React.js, Next.js",
            link: 'https://github.com/zzzeit/SSIS-Web.git',
            category: 'Web',
        },
        {
            id: 'cybersentience',
            image: Cybersentience,
            title: 'Cybersentience',
            description:
                "This retro-styled survival-horror capstone project was built using Python and Pygame. It integrates resource management mechanics and stamina systems within an atmospheric, pseudo-3D environment powered by a custom 2D raycasting engine.",
            tags: "Technologies: Python, Pygame",
            link: 'https://github.com/zzzeit/Capstone-Game-Project.git',
            category: 'Game',
        },
    ]


    return (
        <Section id="projects">
            <div className="my-projects h-[900px] lg:h-[calc(100svh - 73px)] pl-5 pr-5 lg:pl-20 lg:pr-20">
                <h1 id="projectsTitle">Featured Projects</h1>
                <div className="decorator-divider"/>
                <h3 style={{ margin: '0' }}>Take a look at some representative applications I built or contributed to in order to polish my skills.</h3>

                <div className="flex flex-row gap-5 pt-10">
                    <ProjectDefinitions key={projects[currentSlide].id} title={projects[currentSlide].title} text={projects[currentSlide].description} tech={projects[currentSlide].tags} link={projects[currentSlide].link} />
                    <Swiper
                        className="my-swiper"
                        modules={[Autoplay, Pagination]}
                        spaceBetween={50}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 15000, disableOnInteraction: false }}
                        onSlideChange={(e) => setCurrentSlide(e.activeIndex)}>
                        <SwiperSlide><img src={Hootline} width="100%" height="100%" /></SwiperSlide>
                        <SwiperSlide><img src={Cybersentience} width="100%" height="100%" /></SwiperSlide>
                        <SwiperSlide><video src={SampleVid} autoPlay muted loop playsInline className="w-full h-full object-cover" /></SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </Section>
    )
}

export default Projects