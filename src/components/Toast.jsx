import { useEffect } from 'react'

const Toast = ({ message, onClose, durationMs = 2800 }) => {
  useEffect(() => {
    if (!message) return
    const t = window.setTimeout(() => onClose?.(), durationMs)
    return () => window.clearTimeout(t)
  }, [message, onClose, durationMs])

  if (!message) return null

  return (
    <div className="toast" role="status" aria-live="polite">
      <div className="toast-inner">
        <p className="toast-text">{message}</p>
        <button type="button" className="toast-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}

export default Toast

