import type { Page, Locator } from '@playwright/test';

export class SwagLabsCartPage {
	readonly page: Page;
	checkoutButton: () => Locator;

	constructor(page: Page) {
		this.page = page;
		this.checkoutButton = () => page.locator('[data-test="checkout"]');
	}

	async navigate() {
		await this.page.goto('https://www.saucedemo.com/cart.html');
	}

	async proceedToCheckout() {
		await this.checkoutButton().click();
	}
}
