# playwright-e2e-ui-api-test-suite
Build an automated test suite that validates the functionality of both a real website and a public API with Playwright.

## Setup

# 1. Clone the repo: 
git clone https://github.com/umerfarooq43/playwright-e2e-ui-api-test-suite.git

# 2. Change directory:  
cd playwright-e2e-ui-api-test-suite

# 3. Install dependencies: 
npm install

# 4. Install Playwright browsers:
npx playwright install

# 5. Run tests
# UI Tests
npx playwright test tests/ui

# API Tests
npx playwright test tests/api

# Run all
npx playwright test

# Run tests in headed mode
npx playwright test --headed


# View reports
npx playwright show-report

# The Internet Test Automation Suite

This project provides automated tests for:
1. The Internet website (https://the-internet.herokuapp.com)
2. JSONPlaceholder API (https://jsonplaceholder.typicode.com)

## Features

- Page Object Model (POM) design pattern
- Fixtures for test data and URLs
- API and UI tests in TypeScript
- CI/CD integration with GitHub Actions
- HTML reporting

