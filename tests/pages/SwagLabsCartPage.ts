import { type Locator, type Page } from '@playwright/test';

export class SwagCartPage {
	readonly page: Page;
	readonly checkout: Locator;
	readonly continueShopping: Locator;

	constructor(page: Page) {
		this.page = page;
		this.checkout = page.locator('#checkout');
		this.continueShopping = page.locator('#continue-shopping'); 
	}

	async clickCheckout() {
		await this.checkout.click();
	}

	async clickContinueShopping() {
		await this.continueShopping.click();
	}
}
