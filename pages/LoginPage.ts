import { Locator, Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private usernameRequiredMessage: Locator;
  private passwordRequiredMessage: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    const inputGroups = page.locator('.oxd-form').locator('.oxd-input-group');
    this.usernameRequiredMessage = inputGroups.nth(0).getByText('Required', { exact: true });
    this.passwordRequiredMessage = inputGroups.nth(1).getByText('Required', { exact: true });
    this.errorMessage = page.getByText('Invalid credentials', { exact: true });
  }

  async goto(): Promise<void> {
    await this.page.goto('/', { waitUntil: 'commit' });
    await this.usernameInput.waitFor({ state: 'visible' });
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  getErrorMessage(): Locator {
    return this.errorMessage;
  }

  getUsernameRequiredMessage(): Locator {
    return this.usernameRequiredMessage;
  }

  getPasswordRequiredMessage(): Locator {
    return this.passwordRequiredMessage;
  }
}
