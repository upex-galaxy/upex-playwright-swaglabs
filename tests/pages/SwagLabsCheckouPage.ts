import { type Locator, type Page } from '@playwright/test';

export class SwagLabsCheckoutPage {
	readonly page: Page;
	firstNameField: () => Locator;
	lastNameField: () => Locator;
	postalCodeField: () => Locator;
	continueButton: () => Locator;
	cancelButton: () => Locator;
	errorMessage: () => Locator;

	constructor(page: Page) {
		this.page = page;
		this.firstNameField = () => this.page.locator('[data-test="firstName"]');
		this.lastNameField = () => this.page.locator('[data-test="lastName"]');
		this.postalCodeField = () => this.page.locator('[data-test="postalCode"]');
		this.continueButton = () => this.page.locator('[data-test="continue"]');
		this.cancelButton = () => this.page.locator('[data-test="cancel"]');
		this.errorMessage = () => this.page.locator('[data-test="error"]');
	}

	async navigate() {
		await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
	}

	async enterFirstName(firstName: string) {
		await this.firstNameField().fill(firstName);
	}

	async enterLastName(lastName: string) {
		await this.lastNameField().fill(lastName);
	}

	async enterPostalCode(postalCode: string) {
		await this.postalCodeField().fill(postalCode);
	}

	async clickContinue() {
		await this.continueButton().click();
	}

	async clickCancel() {
		await this.cancelButton().click();
	}

	async getErrorMessage() {
		return await this.errorMessage().textContent();
	}
}
