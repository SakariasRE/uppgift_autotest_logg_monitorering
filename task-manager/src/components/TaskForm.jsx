import { useState } from 'react'

function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        const success = onAddTask(title, description)

        if (success) {
            setTitle('')
            setDescription('')
        }
    }

    return (
        <section className="card">
            <h2>＋ Ny uppgift</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titel *</label>
                <input
                    id="title"
                    type="text"
                    placeholder="Ange titel på uppgiften"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="description">Beskrivning</label>
                <textarea
                    id="description"
                    placeholder="Ange beskrivning av uppgiften"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                />

                <button type="submit" className="primary-btn">
                    ＋ Skapa uppgift
                </button>
            </form>
        </section>
    )
}

export default TaskForm
