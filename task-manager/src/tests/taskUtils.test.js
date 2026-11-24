import { describe, it, expect } from 'vitest'
import {
    createTask,
    completeTask,
    deleteTask,
    countCompleted
} from '../taskUtils'

describe('Task Manager', () => {
    it('ska skapa en uppgift med korrekt information', () => {
        const task = createTask('Testuppgift', 'Min beskrivning')

        expect(task.title).toBe('Testuppgift')
        expect(task.description).toBe('Min beskrivning')
        expect(task.status).toBe('Pågående')
        expect(task.id).toBeDefined()
    })

    it('ska inte kunna skapa en uppgift utan titel', () => {
        expect(() => createTask('', 'Beskrivning')).toThrow('Titel krävs')
    })

    it('ska kunna ändra status till Slutförd', () => {
        const task = createTask('Test', 'Beskrivning')

        const updatedTasks = completeTask([task], task.id)

        expect(updatedTasks[0].status).toBe('Slutförd')
    })

    it('ska kunna ta bort en uppgift', () => {
        const task = createTask('Test', 'Beskrivning')

        const updatedTasks = deleteTask([task], task.id)

        expect(updatedTasks).toHaveLength(0)
    })

    it('ska räkna antalet slutförda uppgifter', () => {
        const tasks = [
            { id: '1', status: 'Slutförd' },
            { id: '2', status: 'Pågående' },
            { id: '3', status: 'Slutförd' }
        ]

        expect(countCompleted(tasks)).toBe(2)
    })
})
