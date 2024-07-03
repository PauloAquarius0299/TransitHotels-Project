import { test, expect } from '@playwright/test';
import path from 'path';

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
    await page.goto(UI_URL, { timeout: 60000 });


    await page.waitForSelector('role=link[name="Sign In"]', { timeout: 60000 });
    await page.getByRole("link", { name: "Sign In" }).click();

    await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

    await page.locator("[name=email]").fill("1@1.com");
    await page.locator("[name=password]").fill("password123");

    await page.getByRole("button", { name: "Login" }).click();

    await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test('Should allow user to add a hotel', async ({ page }) => {
    await page.goto(`${UI_URL}/add-hotel`);

    await page.locator("[name='name']").fill('Test Hotel');
    await page.locator("[name='city']").fill('Test City');
    await page.locator("[name='country']").fill('Test Country');
    await page.locator('[name="description"]').fill('This is a description for the test Hotel');
    await page.locator("[name='pricePerNight']").fill('100');
    await page.selectOption("select[name='starRating']", '3');
    await page.getByText('Boutique').click();
    await page.getByLabel('Wifi').check();
    await page.getByLabel('Parking').check();

    await page.locator('[name="adultCount"]').fill('2');
    await page.locator('[name="childCount"]').fill('4');

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, 'files', '1.png'),
        path.join(__dirname, 'files', '2.png'),
    ]);

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Hotel Saved!')).toBeVisible();
});

test('should display hotels', async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`);

    await expect(page.getByText('Praia')).toBeVisible();
    await expect(page.getByText("ontrary to popular belief")).toBeVisible();
    await expect(page.getByText('Rio de Janeiro, Brasil')).toBeVisible();
    await expect(page.getByText('Orçamento')).toBeVisible();
    await expect(page.getByText('$600 por noite')).toBeVisible();
    await expect(page.getByText('2 adultos, 3 crianças')).toBeVisible();
    await expect(page.getByText('3 avaliação')).toBeVisible();

    await expect(page.getByRole('link', { name: '+ Detalhes' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Hotel' })).toBeVisible();
});
