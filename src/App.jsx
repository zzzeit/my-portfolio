import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Home from './components/Home'
import Projects from './components/Projects'
import Repositories from './components/Repositories'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhiteCircle from './assets/white-circle.png'

function App() {

	return (
		<>	
			<img src={WhiteCircle} alt="White Circle" className="white-circle" />
			<Home />
			<Projects />
			<Repositories />
			<Contact />
			<Footer />
		</>
	)
}

export default App
