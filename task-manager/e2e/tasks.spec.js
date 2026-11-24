import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.evaluate(() => {
        localStorage.clear()
    })

    await page.reload()
})

test('ska kunna skapa en uppgift', async ({ page }) => {
    await page.getByLabel('Titel *').fill('Min testuppgift')
    await page.getByLabel('Beskrivning').fill('Testbeskrivning')

    await page.getByRole('button', { name: 'Skapa uppgift' }).click()

    await expect(page.getByText('Min testuppgift')).toBeVisible()
    await expect(page.getByText('Testbeskrivning')).toBeVisible()
})

test('ska kunna slutföra en uppgift', async ({ page }) => {
    await page.getByLabel('Titel *').fill('Slutför test')
    await page.getByRole('button', { name: 'Skapa uppgift' }).click()

    await page.getByRole('button', { name: 'Slutför Slutför test' }).click()

    const task = page.locator('.task').filter({
        hasText: 'Slutför test'
    })

    await expect(task.locator('.status')).toHaveText('Slutförd')
})

test('ska kunna ta bort en uppgift', async ({ page }) => {
    await page.getByLabel('Titel *').fill('Ta bort test')
    await page.getByRole('button', { name: 'Skapa uppgift' }).click()

    await page.getByRole('button', { name: 'Ta bort Ta bort test' }).click()

    await expect(page.getByText('Ta bort test')).toHaveCount(0)
})
