import { test, expect, type Page } from '@playwright/test';

// This automation test only cover the important functionality of the app so it can be useable, any UI design and UI cosmetics is not tested because it can be changed easily as the app updated, but the app functinality usualy won't be changed easily because it will involve changing the flow design. Inconclusion, this automation only cover the app functinality because it won't changed as much as the app updated and the test will be reapeated each time there is an update in the app.

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
});

test.describe('Login positive test', () => {
    test('Positive Normal login test', async ({ page }) => {
        await page.locator('[data-test="username"]').click();
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').click();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    });
})

test.describe('Login negative test', () => {
    test('Negative empty user and password', async ({ page }) => {
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
    });

    test('Negative empty username', async ({ page }) => {
        await page.locator('[data-test="password"]').click();
        await expect(page.locator('[data-test="password"]')).toBeEditable();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username is required');
    });

    test('Negative empty password', async ({ page }) => {
        await page.locator('[data-test="username"]').click();
        await expect(page.locator('[data-test="username"]')).toBeEditable();
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Password is required');
    })

    test('Negative wrong username', async ({ page }) => {
        await page.locator('[data-test="username"]').click();
        await expect(page.locator('[data-test="username"]')).toBeEditable();
        await page.locator('[data-test="username"]').fill('wrong_user');
        await page.locator('[data-test="password"]').click();
        await expect(page.locator('[data-test="password"]')).toBeEditable();
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    test('Negative wrong password', async ({ page }) => {
        await page.locator('[data-test="username"]').click();
        await expect(page.locator('[data-test="username"]')).toBeEditable();
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').click();
        await expect(page.locator('[data-test="password"]')).toBeEditable();
        await page.locator('[data-test="password"]').fill('wrong_pass');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })

    test('Negative wrong user and password', async ({ page }) => {
        await page.locator('[data-test="username"]').click();
        await expect(page.locator('[data-test="username"]')).toBeEditable();
        await page.locator('[data-test="username"]').fill('wrong user');
        await page.locator('[data-test="password"]').click();
        await expect(page.locator('[data-test="password"]')).toBeEditable();
        await page.locator('[data-test="password"]').fill('wrong_pass');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    })
})