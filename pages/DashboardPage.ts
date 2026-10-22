import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  private dashboardHeading: Locator;

  constructor(page: Page) {
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', exact: true });
  }

  async checkDashboardIsVisible(): Promise<void> {
    await expect(this.dashboardHeading).toBeVisible();
  }
}
