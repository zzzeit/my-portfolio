import './Contact.css'
import Section from './Section'
import { useEffect, useState } from 'react'
import Notification from './Notification'

function Contact() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [notificationMessage, setNotificationMessage] = useState('')

    useEffect(() => {
        if (!notificationMessage) {
            return
        }

        const timeoutId = setTimeout(() => {
            setNotificationMessage('')
        }, 5000)

        return () => clearTimeout(timeoutId)
    }, [notificationMessage])

    const handleCloseNotification = () => {
        setNotificationMessage('')
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email || !message) {
            setNotificationMessage('Please fill in all fields before submitting.')
            return
        }

        setNotificationMessage('Thanks for your message. I will get back to you soon.')
        setName('')
        setEmail('')
        setMessage('')
    }

    return (
        <Section id="contact">
            {notificationMessage ? (
                <Notification message={notificationMessage} onClose={handleCloseNotification} />
            ) : null}
            <div className="my-contact h-[780px] lg:h-[calc(100svh-73px)] pl-5 pr-5">
                <h1 id="contactTitle">Get in Touch</h1>
                <div className="decorator-divider"/>
                <h3 style={{ marginTop: '0', marginBottom: '40px' }}>Have a question or want to interview me? Drop me a line!</h3>
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