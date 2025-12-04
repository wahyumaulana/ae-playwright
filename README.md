# 🎭 AE-Playwright Automation Framework

A comprehensive Playwright automation framework for testing [AutomationExercise.com](https://automationexercise.com/) using JavaScript, following Page Object Model (POM) design pattern and industry best practices.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Test Scenarios](#test-scenarios)
- [Reporting](#reporting)
- [CI/CD Integration](#cicd-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## ✨ Features

- ✅ **Page Object Model (POM)** - Clean and maintainable test architecture
- ✅ **Multi-browser Support** - Chrome, Firefox, Safari (WebKit)
- ✅ **Environment Configuration** - Dev, Stage, Prod environments
- ✅ **Comprehensive Reporting** - HTML, JSON, JUnit, Allure reports
- ✅ **Screenshot & Video** - Automatic capture on test failure
- ✅ **CI/CD Ready** - GitHub Actions workflow included
- ✅ **Code Quality** - ESLint and Prettier integration
- ✅ **Parallel Execution** - Run tests in parallel for faster execution
- ✅ **Test Data Management** - Dynamic test data generation
- ✅ **Logging** - Detailed test execution logs

## 🛠 Technology Stack

- **Test Framework**: Playwright v1.48.0
- **Language**: JavaScript (Node.js 18+)
- **Test Runner**: Playwright Test
- **Reporting**: HTML, Allure, JUnit, JSON
- **Code Quality**: ESLint, Prettier
- **CI/CD**: GitHub Actions

## 📁 Project Structure

```
ae-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD workflow
├── config/
│   ├── dev.config.js              # Dev environment config
│   ├── stage.config.js            # Stage environment config
│   └── prod.config.js             # Prod environment config
├── fixtures/
│   ├── pageFixtures.js            # Page object fixtures
│   └── testData.js                # Test data management
├── pages/
│   ├── BasePage.js                # Base page with common methods
│   ├── HomePage.js                # Home page object
│   ├── SignupLoginPage.js         # Signup/Login page object
│   ├── SignupPage.js              # Registration page object
│   ├── AccountCreatedPage.js      # Account created page object
│   ├── ProductsPage.js            # Products listing page object
│   ├── CartPage.js                # Shopping cart page object
│   ├── CheckoutPage.js            # Checkout page object
│   ├── PaymentPage.js             # Payment page object
│   └── OrderSuccessPage.js        # Order success page object
├── tests/
│   ├── homePage.spec.js           # Home page tests
│   ├── registration.spec.js       # User registration tests
│   ├── login.spec.js              # Login/logout tests
│   ├── products.spec.js           # Products and cart tests
│   └── orderPlacement.spec.js     # E2E order placement tests
├── utils/
│   ├── testDataHelper.js          # Test data generation utilities
│   └── logger.js                  # Logging utility
├── reports/                        # Test reports directory
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── .prettierrc                     # Prettier configuration
├── eslint.config.js               # ESLint configuration
├── package.json                    # Project dependencies
├── playwright.config.js            # Playwright configuration
└── README.md                       # Project documentation
```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd ae-playwright
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` file with your configurations:

```env
ENV=dev
TEST_USER_EMAIL=testuser@example.com
TEST_USER_PASSWORD=TestPassword123
HEADLESS=true
BROWSER=chromium
```

## ⚙️ Configuration

### Environment Configuration

The framework supports multiple environments (Dev, Stage, Prod). Configure each environment in the `config/` directory:

```javascript
// config/dev.config.js
module.exports = {
  baseURL: 'https://automationexercise.com',
  environment: 'dev',
  timeout: 60000,
  retries: 1,
};
```

### Playwright Configuration

Main configuration is in `playwright.config.js`. Key settings:

- **Browsers**: Chromium, Firefox, WebKit
- **Parallel Execution**: Enabled
- **Retries**: 2 (in CI), 0 (locally)
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On first retry

## 🏃 Running Tests

### Run All Tests

```bash
npm test
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Tests in Debug Mode

```bash
npm run test:debug
```

### Run Tests in Specific Browser

```bash
npm run test:chrome    # Chromium
npm run test:firefox   # Firefox
npm run test:webkit    # Safari/WebKit
```

### Run Tests in Specific Environment

```bash
npm run test:dev      # Dev environment
npm run test:stage    # Stage environment
npm run test:prod     # Prod environment
```

### Run Specific Test File

```bash
npx playwright test tests/homePage.spec.js
```

### Run Tests with UI Mode

```bash
npm run test:ui
```

### Run Tests with Tags

```bash
npx playwright test --grep @smoke
```

## 🧪 Test Scenarios

### Current Test Coverage

1. **Home Page Tests** (`homePage.spec.js`)
   - TC001: Verify home page loads successfully
   - TC002: Verify navigation menu elements
   - TC003: Verify newsletter subscription

2. **Registration Tests** (`registration.spec.js`)
   - TC004: Register a new user successfully
   - TC005: Verify signup with existing email

3. **Login Tests** (`login.spec.js`)
   - TC006: Login with valid credentials
   - TC007: Login with invalid credentials
   - TC008: Logout functionality

4. **Products Tests** (`products.spec.js`)
   - TC009: Verify products page and add products to cart
   - TC010: Verify product quantity in cart
   - TC011: Remove products from cart
   - TC012: Search product functionality

5. **Order Placement Tests** (`orderPlacement.spec.js`)
   - TC013: Complete order flow (Register → Add to Cart → Place Order)
   - TC014: Place order with existing account

## 📊 Reporting

### View HTML Report

```bash
npm run test:report
```

The framework generates multiple report formats:

- **HTML Report**: `reports/html-report/index.html`
- **JSON Report**: `reports/test-results.json`
- **JUnit Report**: `reports/junit-results.xml`
- **Allure Report**: `reports/allure-results/`

### Generate Allure Report

```bash
# Install Allure (if not installed)
npm install -g allure-commandline

# Generate and open report
allure generate reports/allure-results --clean -o reports/allure-report
allure open reports/allure-report
```

## 🔄 CI/CD Integration

### GitHub Actions

The project includes a complete GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

- ✅ Runs on push/pull request to main/develop branches
- ✅ Scheduled daily runs at 2 AM UTC
- ✅ Manual trigger with environment selection
- ✅ Matrix strategy for multi-browser testing
- ✅ Uploads test artifacts and reports
- ✅ PR comments with test results
- ✅ Failure notifications

### Triggering CI/CD

#### Automatic Triggers
- Push to `main` or `develop` branch
- Create pull request to `main` or `develop`
- Daily scheduled run at 2 AM UTC

#### Manual Trigger
1. Go to Actions tab in GitHub
2. Select "Playwright Tests CI" workflow
3. Click "Run workflow"
4. Select environment and browser
5. Click "Run workflow" button

## 📝 Code Quality

### Run Linting

```bash
npm run lint
```

### Fix Linting Issues

```bash
npm run lint:fix
```

### Format Code

```bash
npm run format
```

### Check Formatting

```bash
npm run format:check
```

## 🎯 Best Practices

### Writing Tests

1. **Use Page Objects**: Always use page object methods, never direct selectors in tests
2. **Descriptive Names**: Use clear, descriptive test and variable names
3. **Single Responsibility**: Each test should verify one specific functionality
4. **Test Independence**: Tests should not depend on each other
5. **Clean Up**: Always clean up test data (e.g., delete test accounts)

### Page Objects

1. **Inheritance**: Extend BasePage for common functionality
2. **Selectors**: Define all selectors in constructor
3. **Methods**: Create reusable methods for page interactions
4. **Waiting**: Use appropriate wait strategies
5. **Returns**: Return values for assertions in tests

### Test Data

1. **Dynamic Generation**: Use TestDataHelper for generating unique test data
2. **Environment Variables**: Store sensitive data in `.env` file
3. **Test Fixtures**: Use fixtures for reusable test data
4. **Cleanup**: Remove test data after test execution

## 🐛 Troubleshooting

### Common Issues

#### Tests Failing Locally

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx playwright install
```

#### Browser Not Found

```bash
# Install specific browser
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

#### Timeout Issues

Increase timeout in `playwright.config.js`:

```javascript
timeout: 90 * 1000, // 90 seconds
```

#### Screenshot/Video Not Capturing

Check configuration in `playwright.config.js`:

```javascript
use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}
```

### Debug Mode

Run tests in debug mode to pause execution:

```bash
npm run test:debug
```

Or add `await page.pause()` in your test code.

## 🔐 Security

- Never commit `.env` file with sensitive data
- Use environment variables for credentials
- Rotate test credentials regularly
- Review security advisories: `npm audit`

## 📈 Performance

- Use parallel execution for faster test runs
- Optimize wait strategies (avoid hard waits)
- Use network idle state judiciously
- Clean up resources after tests

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Guidelines

- Follow existing code style
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Run linting and tests before submitting

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- - **Wahyu Maulana** - *Initial work* - [GitHub](https://github.com/wahyumaulana)

## 🙏 Acknowledgments

- [Playwright Documentation](https://playwright.dev/)
- [AutomationExercise.com](https://automationexercise.com/)
- Testing Community

## 📞 Support

For support, please:
- Open an issue in the repository
- Contact the team at: support@example.com
- Check the [Playwright Discord](https://discord.gg/playwright)

## 🗺️ Roadmap

- [ ] Add API testing support
- [ ] Integrate with test management tools (TestRail, Zephyr)
- [ ] Add visual regression testing
- [ ] Implement custom reporters
- [ ] Add mobile testing support
- [ ] Performance testing integration

---

**Happy Testing! 🎭✨**
