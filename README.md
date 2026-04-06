# SauceDemo Cypress Test Suite

## Overview

This is a Cypress test suite that automates SauceDemo's main purchase flow with positive and negative scenarios

## Installation

### Prerequisites
- Node.js v14 or up
- npm or yarn package manager
- Cypress latest version

### Setup
```bash
# Clone the repository
git clone <repo-url>
cd saucedemo-test

# Install dependencies
npm install

# Verify installation
npx cypress --version
```

## Configuration

### Environment Variables
Create a `cypress.env.json` file in the root directory:
```json
{
  "username": "username",
  "password": "password",
  "baseUrl": "https://www.yourlink.com/"
}
```

## Running Tests

### Interactive Mode - Cypress test runner
# Open Cypress Test Runner
npx cypress open

### Headless Mode - CLI
# Run all tests
npx cypress run

# Run specific test file
npx cypress run --spec "cypress/e2e/saucedemo.cy.js"

# Run with specific browser
npx cypress run --browser chrome

## Test Scenarios

### 1. Negative Flow - Empty Basket
- Tests empty cart navigation
- Verifies checkout button is disabled (this will fail on purpose since there's a bug in the app)
- Ensures appropriate handling

### 2. Positive Flow - Full Purchase
- Adds two items to cart
- Verifies cart badge count
- Navigates through checkout process
- Total, tax and Item total validation
- Completes purchase and verifies success

### 3. Negative Flow - Missing Fields
- Tests form validation
- Verifies error messages for missing required fields
- Tests sequential field validation

### 4. Positive Flow - Paymen Screen
- Should test the payment screen
- Skipped for now since it's not implemented in the demo app

## Key Technical Features

- Used a hybrid approach to showcase both options (Cypress being POM agnostic) though POM is the recommended approach
- Centralized environment variable handling
- Hybrid mode for static values as well, recommended approach is to have them centralized
- Hybrid mode for commands/fucntions (made use of Cypress's native comands)
- Used testinglibrary to avoid creating the same commands and also showcase intgration with various opensource packages (https://testing-library.com/)
- Centralized login