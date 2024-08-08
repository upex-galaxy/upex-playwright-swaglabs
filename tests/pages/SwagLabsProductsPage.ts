import { expect, type Locator, type Page } from '@playwright/test';

export class Productlist {
	readonly page: Page;
	readonly buttonMenu:Locator;
	readonly burguerMenu: Locator;
	readonly allItemsLink: Locator;
	readonly aboutLink: Locator;
	readonly logoutLink: Locator;
	readonly resetAppStateLink: Locator;
	readonly inventoryList: Locator;
	readonly shoppingCartLinks: Locator;

	constructor(page: Page) {
		this.page = page;
		this.buttonMenu = page.locator('#react-burger-menu-btn');
		this.burguerMenu = page.locator('.bm-menu-wrap');
		this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
		this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
		this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
		this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');
		this.inventoryList = page.locator('.inventory_list > .inventory_item').nth(0);
		this.shoppingCartLinks = page.locator('.shopping_cart_link');
    
	}

	async goto() {
		await this.page.goto('https://www.saucedemo.com/inventory.html');
	}

	async openBurgerMenu() {
		return await this.buttonMenu.click();
	}

	async verifyMenuIsOpen() {
		return await this.burguerMenu.isVisible();

	}

	async closeBurgerMenu() {
		await this.page.getByRole('button', { name: 'Close Menu' }).click();
	}

	async getProductsTitleText(): Promise<string[]> {
		const productTitles = await this.page.locator('.inventory_item_name').allTextContents();
		return productTitles.map(title => title.trim());
	}

	async productIsVisible(productsTitle: string): Promise<boolean> {
		const product = this.page.locator(`.inventory_item:has-text("${productsTitle}")`);
		return await product.isVisible();
	}

	async clickAbout() {
		await this.aboutLink.click();
		await expect(this.page).toHaveURL('https://saucelabs.com/');
	}

	async clickLogout() {
		await this.logoutLink.click();
		await expect(this.page).toHaveURL('https://www.saucedemo.com/');
	}

	async clickResetAppState() {
		await this.resetAppStateLink.click();
		
	}

	async verifyNoChangesAfterReset() {
		
	}

	async clickAllItems() {
		await this.allItemsLink.click();
		await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
	}
   
}