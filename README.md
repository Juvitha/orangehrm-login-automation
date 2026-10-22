# orangehrm-login-automation

Beginner-friendly browser automation tests for the OrangeHRM demo login page.

## Tools used

- TypeScript
- Playwright Test
- Node.js and npm

## Install

Install project dependencies and the Chromium browser:

```bash
npm install
npx playwright install chromium
```

## Run tests

Run the full test suite:

```bash
npm test
```

Run tests in headed mode (the browser is visible):

```bash
npm run test:headed
```

The Playwright configuration also runs tests in headed mode by default. Screenshots are saved only when a test fails.

## Test cases

1. Valid login displays the Dashboard page.
2. Invalid username with a valid password displays "Invalid credentials".
3. Valid username with an invalid password displays "Invalid credentials".
4. Invalid username and password display "Invalid credentials".
5. Empty username and password show a "Required" message under both fields.
6. Empty username shows a "Required" message.
7. Empty password shows a "Required" message.
8. A username with leading and trailing spaces is rejected.
9. A username with 120 characters displays "Invalid credentials".
10. Special characters in both fields display "Invalid credentials".
