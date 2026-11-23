export function createTask(title, description) {
    if (!title.trim()) {
        throw new Error('Titel krävs')
    }

    return {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        status: 'Pågående'
    }
}

export function completeTask(tasks, id) {
    return tasks.map((task) =>
        task.id === id ? { ...task, status: 'Slutförd' } : task
    )
}

export function deleteTask(tasks, id) {
    return tasks.filter((task) => task.id !== id)
}

export function countCompleted(tasks) {
    return tasks.filter((task) => task.status === 'Slutförd').length
}
