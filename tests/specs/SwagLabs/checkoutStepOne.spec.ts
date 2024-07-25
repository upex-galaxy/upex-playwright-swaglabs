import { expect } from '@playwright/test';
import { SwagLabsLoginPage } from '@pages/SwagLoginPage';
import { SwagLabsInventoryPage } from '@pages/SwagProductsPage';
import { SwagLabsCartPage } from '@pages/SwagCartPage';
import { SwagLabsCheckoutPage } from '@pages/SwagLabsCheckouPage';
import { precondition, story, test } from '@pages/TestBase';

story('DT GX3-4336 SwagLabs | Checkout Info | Insertar información del comprador.', () => {
	let loginPage: SwagLabsLoginPage;
	let inventoryPage: SwagLabsInventoryPage;
	let cartPage: SwagLabsCartPage;
	let checkoutPage: SwagLabsCheckoutPage;

	precondition(async ({ page }) => {
		loginPage = new SwagLabsLoginPage(page);
		inventoryPage = new SwagLabsInventoryPage(page);
		cartPage = new SwagLabsCartPage(page);
		checkoutPage = new SwagLabsCheckoutPage(page);

		await loginPage.navigate();
		await loginPage.login('standard_user', 'secret_sauce');

		await inventoryPage.navigate();
		await inventoryPage.addProductToCart();
		await inventoryPage.goToCart();

		await cartPage.navigate();
		await cartPage.proceedToCheckout();
	});

	test('TC1: Validar ingresar datos válidos en todos los campos del formulario checkout-step-one (Happy Path)', async () => {
		await test.step('Se Ingresa un nombre válido', async () => {
			await checkoutPage.enterFirstName('Claud');
		});

		await test.step('Se Ingresa un apellido válido', async () => {
			await checkoutPage.enterLastName('Hernandez');
		});

		await test.step('Se Ingresa un código postal válido', async () => {
			await checkoutPage.enterPostalCode('789654');
		});

		await test.step('Hacer clic en el botón "Continuar"', async () => {
			await checkoutPage.clickContinue();
		});

		await test.step('Verificamos  que la URL se ha actualizado a la página checkout-step-two', async () => {
			await expect(checkoutPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
		});
	});

	test('TC2: Validar acción de hacer clic en el botón "Cancelar"', async () => {
		await test.step('Ingresa datos válidos en todos los campos', async () => {
			await checkoutPage.enterFirstName('Claud');
			await checkoutPage.enterLastName('Hernandez');
			await checkoutPage.enterPostalCode('789654');
		});

		await test.step('Hacer clic en el botón "Cancelar"', async () => {
			await checkoutPage.clickCancel();
		});

		await test.step('Verifica que la URL se ha actualizado a la página del carrito', async () => {
			await expect(checkoutPage.page).toHaveURL('https://www.saucedemo.com/cart.html');
		});
	});

	test('TC3: Validar ingresar caracteres especiales en "First name" con otros campos válidos del formulario', async () => {
		await test.step('Ingresa caracteres especiales en el campo "First name"', async () => {
			await checkoutPage.enterFirstName('@#$');
		});

		await test.step('Ingresa un apellido válido', async () => {
			await checkoutPage.enterLastName('Hernandez');
		});

		await test.step('Ingresa un código postal válido', async () => {
			await checkoutPage.enterPostalCode('789654');
		});

		await test.step('Hacer clic en el botón "Continuar"', async () => {
			await checkoutPage.clickContinue();
		});

		await test.step('Verificamos  que la URL se ha actualizado a la página checkout-step-two', async () => {
			await expect(checkoutPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
		});
		
	});

	test('TC4: Validar ingresar caracteres especiales en "Zip/Postal Code" con otros campos válidos del formulario', async () => {
		await test.step('Ingresa un nombre válido', async () => {
			await checkoutPage.enterFirstName('Claud');
		});

		await test.step('Ingresa un apellido válido', async () => {
			await checkoutPage.enterLastName('Hernandez');
		});

		await test.step('Ingresa caracteres especiales en el campo "Postal Code"', async () => {
			await checkoutPage.enterPostalCode('@#$');
		});

		await test.step('Hacer clic en el botón "Continuar"', async () => {
			await checkoutPage.clickContinue();
		});

		await test.step('Verificamos  que la URL se ha actualizado a la página checkout-step-two', async () => {
			await expect(checkoutPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
		});
		
	});

	test('TC5: Validar dejar campo vacío en "First name" con otros campos válidos del formulario', async () => {
		await test.step('Deja el campo "First name" vacío', async () => {
			await checkoutPage.enterFirstName('');
		});

		await test.step('Ingresa un apellido válido', async () => {
			await checkoutPage.enterLastName('Hernandez');
		});

		await test.step('Ingresa un código postal válido', async () => {
			await checkoutPage.enterPostalCode('789654');
		});

		await test.step('Hacer clic en el botón "Continuar"', async () => {
			await checkoutPage.clickContinue();
		});

		await test.step('Verifica que se muestra el mensaje de error', async () => {
			const errorMessage = await checkoutPage.getErrorMessage();
			expect(errorMessage).toContain('Error: First Name is required'); 
		});
	});
});
