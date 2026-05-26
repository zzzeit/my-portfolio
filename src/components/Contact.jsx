import './Contact.css'
import Section from './Section'
import { useState } from 'react'
import Notification from './Notification'

function Contact() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !message) {
            alert('Please fill in all fields before submitting.')
            return
        }
    }

    return (
        <Section id="contact">
            <div className="my-contact">
                <h1>Get in Touch</h1>
                <div className="decorator-divider"/>
                <h3 style={{ marginTop: '0' }}>Have a question or want to interview me? Drop me a line!</h3>
                <form className="form-contact" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" name="message" placeholder="Write something..." style={{ height: '200px' }} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                    </div>
                    <input className="button-submit" type="submit" value="Submit" />
                </form>
            </div>
        </Section>
    )
}

export default Contact