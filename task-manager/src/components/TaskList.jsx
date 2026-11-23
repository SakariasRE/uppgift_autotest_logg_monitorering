function TaskList({ tasks, onComplete, onDelete }) {
    return (
        <section className="card task-list">
            <h2>☷ Mina uppgifter</h2>

            {tasks.length === 0 ? (
                <p className="empty-message">
                    Inga uppgifter ännu. Skapa din första uppgift!
                </p>
            ) : (
                <div className="tasks">
                    {tasks.map((task) => (
                        <article className="task" key={task.id}>
                            <div className="task-content">
                                <h3
                                    className={
                                        task.status === 'Slutförd'
                                            ? 'completed'
                                            : ''
                                    }
                                >
                                    {task.title}
                                </h3>

                                <p>{task.description}</p>

                                <span
                                    className={
                                        task.status === 'Slutförd'
                                            ? 'status completed-status'
                                            : 'status ongoing-status'
                                    }
                                >
                                    {task.status}
                                </span>
                            </div>

                            <div className="task-actions">
                                <button
                                    className="complete-btn"
                                    onClick={() => onComplete(task.id)}
                                    disabled={task.status === 'Slutförd'}
                                    aria-label={`Slutför ${task.title}`}
                                >
                                    ✓ Slutför
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={() => onDelete(task.id)}
                                    aria-label={`Ta bort ${task.title}`}
                                >
                                    Ta bort
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    )
}

export default TaskList
