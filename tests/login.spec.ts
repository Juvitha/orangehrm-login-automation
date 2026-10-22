import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

test('valid login shows the Dashboard page', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  await dashboardPage.checkDashboardIsVisible();
});

test('invalid username and valid password show an error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('WrongUser', 'admin123');

  await expect(loginPage.getErrorMessage()).toBeVisible();
});

test('valid username and invalid password show an error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'wrongPassword');

  await expect(loginPage.getErrorMessage()).toBeVisible();
});

test('invalid username and password show an error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('WrongUser', 'wrongPassword');

  await expect(loginPage.getErrorMessage()).toBeVisible();
});

test('empty username and password show required messages under both fields', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('', '');

  await expect(loginPage.getUsernameRequiredMessage()).toBeVisible();
  await expect(loginPage.getPasswordRequiredMessage()).toBeVisible();
});

test('empty username shows a required message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('', 'admin123');

  await expect(loginPage.getUsernameRequiredMessage()).toBeVisible();
});

test('empty password shows a required message', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', '');

  await expect(loginPage.getPasswordRequiredMessage()).toBeVisible();
});

test('username with leading and trailing spaces is rejected', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('  Admin  ', 'admin123');

  await expect(loginPage.getErrorMessage()).toBeVisible();
});

test('very long username shows an invalid credentials error', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const longUsername = 'A'.repeat(120);

  await loginPage.goto();
  await loginPage.login(longUsername, 'admin123');

  await expect(loginPage.getErrorMessage()).toBeVisible();
});

test('special characters in username and password show an error', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('!@#$%^&*()_+-=', '<>?:{}[];');

  await expect(loginPage.getErrorMessage()).toBeVisible();
});
