import type { Page, Locator } from '@playwright/test';

export class SwagLabsInventoryPage {
	readonly page: Page;
	addToCartButton: () => Locator;
	cartIcon: () => Locator;

	constructor(page: Page) {
		this.page = page;
		this.addToCartButton = () => page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
		this.cartIcon = () => page.locator('[data-test="shopping-cart-link"]');
	}

	async navigate() {
		await this.page.goto('https://www.saucedemo.com/inventory.html');
	}

	async addProductToCart() {
		await this.addToCartButton().click();
	}

	async goToCart() {
		await this.cartIcon().click();
	}
}
