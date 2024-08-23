import { test, expect } from '@pages/TestBase';
import credentials from '../../data/credencialesSwagLabs.json' assert {type: 'json' };

test.describe('[Automation] SwagLabs | Checkout | Finalizar o Cancelar la compra de un producto en la Website', () => {
	test.beforeEach(async ({ swagLoginPage }) => {
		await swagLoginPage.goto();
	});

	test('TC1 - Validar la Finalización de la Compra', async ({ swagLoginPage, swagCartPage, swagcheckoutPage, swaginventoryPage, page }) => {
		await test.step('Iniciar Sección con credenciales válidas', async () => {
			await swagLoginPage.usernameInput.fill('standard_user');
			await swagLoginPage.passwordInput.fill('secret_sauce');
			await swagLoginPage.loginButton.click();
			await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
		});

		await test.step('Agregar un producto al carrito de compra', async () => {
			const removedButtonProduct = swaginventoryPage.removed;
            
			if (await removedButtonProduct.isVisible()) {
				await removedButtonProduct.click(); 
				console.log('Producto eliminado del carrito.');
			}
			await swaginventoryPage.clickAddToCart();
			const shoppingCartBadge = swaginventoryPage.shoppingCartBadge;
			await expect(shoppingCartBadge).toHaveText('1');
		});

		await test.step('Ir al Módulo de Checkout para el llenado del formulario de compra', async () => {
			await swaginventoryPage.shoppingCart();
			await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
			await swagCartPage.clickCheckout();
			await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
		});

		await test.step('Completar el formulario de checkout con datos válidos', async () => {
			await swagcheckoutPage.formbuy(
				credentials.validUser.FirstName,
				credentials.validUser.LastName,
				credentials.validUser.ZipPostalCode
			);
			await swagcheckoutPage.clickContinueButton();
			await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
		});

		await test.step('Finalizar la compra', async () => {
			const confirmationMessage = page.locator('.complete-header');
			await swagcheckoutPage.clickfinishButton();
			await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
			await expect(confirmationMessage).toHaveText('Thank you for your order!');
		});
	});

	test('TC2 - Validar la Cancelación de la Compra con Redirección Adicional', async ({ swagLoginPage, swagCartPage, swagcheckoutPage, swaginventoryPage, page }) => {
		await test.step('Iniciar Sección con credenciales válidas', async () => {
			await swagLoginPage.usernameInput.fill('standard_user');
			await swagLoginPage.passwordInput.fill('secret_sauce');
			await swagLoginPage.loginButton.click();
			await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
		});

		await test.step('Agregar un producto al carrito de compra', async () => {
			const removedButtonProduct = swaginventoryPage.removed;
            
			if (await removedButtonProduct.isVisible()) {
				await removedButtonProduct.click(); 
				console.log('Producto eliminado del carrito.');
			}
			await swaginventoryPage.clickAddToCart();
			const shoppingCartBadge = swaginventoryPage.shoppingCartBadge;
			await expect(shoppingCartBadge).toHaveText('1');
		});

		await test.step('Ir al Módulo de Checkout para el llenado del formulario de compra', async () => {
			await swaginventoryPage.shoppingCart();
			await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
			await swagCartPage.clickCheckout();
			await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
		});

		await test.step('Completar el formulario de checkout con datos válidos', async () => {
			await swagcheckoutPage.formbuy(
				credentials.validUser.FirstName,
				credentials.validUser.LastName,
				credentials.validUser.ZipPostalCode
			);
			await swagcheckoutPage.clickContinueButton();
			await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
		});

		await test.step('Hacer clic en el botón de cancelar antes de la compra', async () => {
			await swagcheckoutPage.clickCancelButton();
		});

		await test.step('Validar la redirección de la página al PDP', async () => {
			await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
		});
	});
});
