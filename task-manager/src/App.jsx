import { useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Monitoring from './components/Monitoring'
import {
    createTask,
    completeTask,
    deleteTask,
    countCompleted
} from './taskUtils'
import { logInfo, logError } from './logger'
import './App.css'

function App() {
    const [tasks, setTasks] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem('tasks') || '[]')

            if (!Array.isArray(saved)) {
                throw new Error('Ogiltig uppgiftsdata')
            }

            return saved
        } catch (error) {
            logError(`Failed to load tasks: ${error.message}`)
            return []
        }
    })

    const [createdCount, setCreatedCount] = useState(
        () => Number(localStorage.getItem('createdCount')) || 0
    )

    const [errorCount, setErrorCount] = useState(
        () => Number(localStorage.getItem('errorCount')) || 0
    )

    const [simulateError, setSimulateError] = useState(false)
    const [message, setMessage] = useState('')

    function registerError(error) {
        logError(error.message)

        setErrorCount((previous) => {
            const next = previous + 1

            try {
                localStorage.setItem('errorCount', String(next))
            } catch (storageError) {
                logError(`Failed to save error count: ${storageError.message}`)
            }

            return next
        })

        setMessage(error.message)
    }

    function saveTasks(updatedTasks) {
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
        setTasks(updatedTasks)
    }

    function handleAddTask(title, description) {
        try {
            const newTask = createTask(title, description)

            if (simulateError) {
                throw new Error('Failed to save task (simulerat fel)')
            }

            const updatedTasks = [...tasks, newTask]
            const nextCount = createdCount + 1

            localStorage.setItem('tasks', JSON.stringify(updatedTasks))
            localStorage.setItem('createdCount', String(nextCount))

            setTasks(updatedTasks)
            setCreatedCount(nextCount)
            setMessage('')

            logInfo(`Task created: "${newTask.title}"`)
            return true
        } catch (error) {
            registerError(error)
            return false
        }
    }

    function handleCompleteTask(id) {
        try {
            const updatedTasks = completeTask(tasks, id)
            saveTasks(updatedTasks)

            const task = tasks.find((task) => task.id === id)
            logInfo(`Task completed: "${task?.title}"`)
            setMessage('')
        } catch (error) {
            registerError(error)
        }
    }

    function handleDeleteTask(id) {
        try {
            const task = tasks.find((task) => task.id === id)
            const updatedTasks = deleteTask(tasks, id)

            saveTasks(updatedTasks)

            logInfo(`Task deleted: "${task?.title}"`)
            setMessage('')
        } catch (error) {
            registerError(error)
        }
    }

    const completedCount = countCompleted(tasks)
    const ongoingCount = tasks.length - completedCount

    return (
        <div className="app">
            <header className="header">
                <div className="header-content">
                    <div className="header-icon">☑</div>
                    <div>
                        <h1>Task Manager</h1>
                        <p>Hantera dina arbetsuppgifter</p>
                    </div>
                </div>
            </header>

            <main className="dashboard">
                <div className="sidebar">
                    <TaskForm onAddTask={handleAddTask} />

                    <Monitoring
                        createdCount={createdCount}
                        errorCount={errorCount}
                        simulateError={simulateError}
                        setSimulateError={setSimulateError}
                    />
                </div>

                <div className="main-content">
                    <div className="stats">
                        <div className="stat-box total">
                            <p>Totalt antal uppgifter</p>
                            <h2>{tasks.length}</h2>
                        </div>

                        <div className="stat-box ongoing">
                            <p>Pågående</p>
                            <h2>{ongoingCount}</h2>
                        </div>

                        <div className="stat-box finished">
                            <p>Slutförda</p>
                            <h2>{completedCount}</h2>
                        </div>
                    </div>

                    {message && (
                        <p className="error-message" role="alert">
                            {message}
                        </p>
                    )}

                    <TaskList
                        tasks={tasks}
                        onComplete={handleCompleteTask}
                        onDelete={handleDeleteTask}
                    />
                </div>
            </main>
        </div>
    )
}

export default App
