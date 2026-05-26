import './Notification.css'

function Notification({ message, onClose }) {

    

    return (
        <div className="my-notification" onClick={onClose} role="alert" aria-live="polite">
            <p>{message}</p>
        </div>
    )
}

export default Notification