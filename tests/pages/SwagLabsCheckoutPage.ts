import { type Locator, type Page } from '@playwright/test';

export class SwagCheckoutPage {
	readonly page: Page;
	readonly firstNameInput: Locator;
	readonly lastNameInput: Locator;
	readonly zipPostalCodeInput: Locator;
	readonly continueButton: Locator;
	readonly cancelButton: Locator;
	readonly finishButton: Locator;

	constructor(page: Page) {
		this.page = page;
		this.firstNameInput = page.locator('#first-name');
		this.lastNameInput = page.locator('#last-name');
		this.zipPostalCodeInput = page.locator('[data-test="postalCode"]');
		this.continueButton = page.locator('#continue');
		this.cancelButton = page.locator('#cancel');
		this.finishButton = page.locator('#finish');
        
	}
        
	async formbuy(firstname: string, lastName: string, zipPostalCode: string) {
		await this.firstNameInput.fill(firstname);
		await this.lastNameInput.fill(lastName);
		await this.zipPostalCodeInput.fill(zipPostalCode);
	}

	async clickContinueButton() {
		await this.continueButton.click();
	}

	async clickCancelButton() {
		await this.cancelButton.click();
	}

	async clickfinishButton() {
		await this.finishButton.click();
	}
}
