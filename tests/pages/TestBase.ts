import { test as driver } from '@playwright/test';
import { SpaceLoginPage } from './SpaceLoginPage';
import { SpaceProductPage } from './SpaceProductPage';
import { SpaceCheckoutPage } from './SpaceCheckoutPage';
import { OrangeLoginPage } from './OrangeLoginPage';
import { SwagLoginPage } from './SwagLabsLoginPage';
import { SwagCartPage } from './SwagLabsCartPage';
import { SwagCheckoutPage } from './SwagLabsCheckoutPage';
import { SwagInventoryPage } from './SwagLabsInventoryPage';

const test = driver.extend<{
    orangeLoginPage: OrangeLoginPage;
    loginPage: SpaceLoginPage;
    productPage: SpaceProductPage;
    checkoutPage: SpaceCheckoutPage;
    swagLoginPage: SwagLoginPage;
    swagCartPage: SwagCartPage;
    swagcheckoutPage: SwagCheckoutPage;
    swaginventoryPage: SwagInventoryPage;
}>({
	orangeLoginPage: async ({ page }, use) => await use(new OrangeLoginPage(page)),
	loginPage: async ({ page }, use) => await use(new SpaceLoginPage(page)),
	productPage: async ({ page }, use) => await use(new SpaceProductPage(page)),
	checkoutPage: async ({ page }, use) => await use(new SpaceCheckoutPage(page)),
	swagLoginPage: async ({ page }, use) => await use(new SwagLoginPage(page)),
	swagCartPage: async ({ page }, use) => await use(new SwagCartPage(page)),
	swagcheckoutPage: async ({ page }, use) => await use(new SwagCheckoutPage(page)),
	swaginventoryPage: async ({ page }, use) => await use(new SwagInventoryPage(page)),
});

export { test };
// Main utilities:
export const story = test.describe;
export const expect = test.expect;
// Hooks:
export const beforeAll = test.beforeAll;
export const precondition = test.beforeEach;
export const afterEach = test.afterEach;
export const afterAll = test.afterAll;
