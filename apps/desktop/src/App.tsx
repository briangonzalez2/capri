
import { useState } from 'react'

function App() {
  const [composerOpen, setComposerOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [bubbleText, setBubbleText] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!message.trim()) return

    setBubbleText(
      '¡Te escucho! La conexión con el sistema de conversación llegará en una próxima etapa.',
    )

    setMessage('')
  }

  return (
    <main className="capri-stage">
      {bubbleText && (
        <div className="dialog-bubble">
          <p>{bubbleText}</p>
          <button
            className="bubble-close"
            onClick={() => setBubbleText('')}
            aria-label="Cerrar diálogo"
          >
            ×
          </button>
        </div>
      )}

      <button
        className="capri-character"
        onClick={() => setComposerOpen(!composerOpen)}
        aria-label="Interactuar con Capri"
        title="Interactuar con Capri"
      >
        <span className="character-glow" />
        <span className="character-face">
          <span className="character-eyes">
            <span />
            <span />
          </span>
          <span className="character-mouth" />
        </span>
      </button>

      {composerOpen && (
        <form className="message-composer" onSubmit={handleSubmit}>
          <input
            autoFocus
            type="text"
            placeholder="Habla con Capri..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <button type="submit" aria-label="Enviar mensaje">
            ↑
          </button>

          <button
            type="button"
            className="composer-close"
            onClick={() => setComposerOpen(false)}
            aria-label="Cerrar campo de texto"
          >
            ×
          </button>
        </form>
      )}
    </main>
  )
}

export default App
