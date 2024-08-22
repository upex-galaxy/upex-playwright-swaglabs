import { type Locator, type Page } from '@playwright/test';

export class SwagInventoryPage {
	readonly page: Page;
	readonly addToCart: Locator;
	readonly removed: Locator;
	readonly shoppingCartBadge: Locator;

	constructor(page: Page) {
		this.page = page;
		this.addToCart = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'); 
		this.removed = page.locator('[data-test="remove-sauce-labs-backpack"]'); 
		this.shoppingCartBadge = page.locator('.shopping_cart_link'); 
	}

	async clickAddToCart() {
		await this.addToCart.click();
	}

	async clickRemoved() {
		await this.removed.click();
	}

	async cleanCartIfNeeded() {
		if (await this.removed.isVisible()) 
			await this.clickRemoved(); 
        
	}

	async shoppingCart() {
		await this.shoppingCartBadge.click();
	}
}
