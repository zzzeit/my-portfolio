import './Notification.css'

function Notification({ message, onClose }) {
    return (
        <div className="my-notification">
            <p>{message}</p>
        </div>
    )
}

export default Notification