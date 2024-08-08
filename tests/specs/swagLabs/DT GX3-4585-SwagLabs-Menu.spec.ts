import type { Page } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/SwagLabsLoginPage';
import { Productlist } from '@pages/SwagLabsProductsPage';
import { precondition, story } from '@pages/TestBase';

story('SwagLabs - Página de Listado de Productos (PLP)', () => {

	let page: Page;
	let loginPage: LoginPage;
	let productsPage: Productlist;

	precondition(async ({ browser }) => {
		page = await browser.newPage();
		loginPage = new LoginPage(page);
		productsPage = new Productlist(page);

		await loginPage.goto();
		await loginPage.login('standard_user', 'secret_sauce');
		await productsPage.goto();
	});

	test('TC1: Validar despliegue del menú en la Página de Listado de Productos (PLP)', async () => {
		test.info().annotations.push({
			type: 'TC1',
			description: 'Se observa el  despliega correctamente en la Página de Listado de Productos (PLP).'
		});
		await test.step('Abrir la opcion del menu', async () => {
			await productsPage.openBurgerMenu();
		});
		await test.step('Verificar que el menú es visible', async () => {
			await expect(productsPage.burguerMenu).toBeVisible();
		});
		await test.info().attach('screenshot', { 
			body: await page.screenshot(),
			contentType: 'image/png',
		});

	});

	test('TC2: Validar que el menú ya está desplegado y no cambia al hacer clic en cualquier parte de la página', async () => {
		test.info().annotations.push({
			type: 'TC2',
			description: 'Se mantiene visible después de hacer clic en cualquier parte de la página.'
		});
		await test.step('Abrir el menú', async () => {
			await productsPage.openBurgerMenu();
		});
		await test.step('Verificar que el menú está visible', async () => {
			await expect(productsPage.burguerMenu).toBeVisible();
		});
		await test.step('Hacer clic en cualquier parte de la página', async () => {
			await page.click('body');
		});
		await test.step('Verificar que el menú sigue visible y no ha cambiado', async () => {
			await expect(productsPage.burguerMenu).toBeVisible();
		});
		await test.info().attach('screenshot', { 
			body: await page.screenshot(),
			contentType: 'image/png',
		});

		await test.step('Cerrar el menú', async () => {
			await productsPage.closeBurgerMenu();
		});
	});

	test('TC3: Validar cierre del menú cuando está desplegado', async () => {
		test.info().annotations.push({
			type: 'TC3',
			description: 'El menú se cierra correctamente cuando se hace clic en el botón de cerrar.'
		});
		await test.step('Abrir el menú', async () => {
			await productsPage.openBurgerMenu();
		});
		await test.step('Verificar que el menú está visible', async () => {
			await expect(productsPage.burguerMenu).toBeVisible();
		});
		await test.step('Cerrar el menú', async () => {
			await productsPage.closeBurgerMenu();
		});
		await test.step('Verificar que el menú no está visible', async () => {
			await expect(productsPage.burguerMenu).not.toBeVisible();
		});
		await test.info().attach('screenshot', { 
			body: await page.screenshot(),
			contentType: 'image/png',
		});

	});

	test('TC5: Validar redirección a Sauce Labs con clic en "About"', async () => {
		test.info().annotations.push({
			type: 'TC5',
			description: 'Se realiza la redireccion desde  "About" a la página de Sauce Labs.'
		});
		await test.step('Abrir el menú', async () => {
			await productsPage.openBurgerMenu();
		});
		await test.step('Hacer clic en el enlace "About"', async () => {
			await productsPage.clickAbout();
		});
		await test.step('Verificar redirección a Sauce Labs', async () => {
			await expect(page).toHaveURL('https://saucelabs.com/');
		});
		await test.info().attach('screenshot', { 
			body: await page.screenshot(),
			contentType: 'image/png',
		});

	});

	test('TC6: Validar cierre de sesión con clic en "Logout"', async () => {
		test.info().annotations.push({
			type: 'TC6',
			description: 'al cerrar "Logout" se redirige a la página de login.'
		});
		await test.step('Abrir el menú', async () => {
			await productsPage.openBurgerMenu();
		});
		await test.step('Hacer clic en el enlace "Logout"', async () => {
			await productsPage.clickLogout();
		});
		await test.step('Verificar redirección a la página de login', async () => {
			await expect(page).toHaveURL('https://www.saucedemo.com/');
		});
		await test.info().attach('screenshot', { 
			body: await page.screenshot(),
			contentType: 'image/png',
		});

	});

	test('TC7: Validar restablecimiento del estado con productos en el carrito', async () => {
		test.info().annotations.push({
			type: 'TC7',
			description: 'El estado de la aplicación se restablece correctamente cuando hay productos en el carrito.'
		});
		await test.step('Añadir producto al carrito', async () => {
			await page.click('.inventory_item button'); // Ajusta el selector según sea necesario
		});
		await test.step('Abrir el menú', async () => {
			await productsPage.openBurgerMenu();
		});
		await test.step('Hacer clic en "Reset App State"', async () => {
			await productsPage.clickResetAppState();
		});
		await test.step('Verificar que el carrito está vacío', async () => {
			await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
		});
		await test.info().attach('screenshot', { 
			body: await page.screenshot(),
			contentType: 'image/png',
		});

	});

	test('TC8: Validar restablecimiento del estado sin productos en el carrito', async () => {
		test.info().annotations.push({
			type: 'TC8',
			description: 'El estado de la aplicación se restablece correctamente cuando no hay productos en el carrito.'
		});
		await test.step('Abrir el menú', async () => {
			await productsPage.openBurgerMenu();
		});
		await test.step('Hacer clic en "Reset App State"', async () => {
			await productsPage.clickResetAppState();
		});
		await test.step('Verificar que no haya cambios adicionales', async () => {
			await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
		});
	});

	test('TC9: Validar redirección a PLP desde la Página de Producto (PDP)', async ({ page }) => {
		test.info().annotations.push({
			type: 'TC9',
			description: 'Se puede navegar de la página de producto (PDP) a la página de listado de productos (PLP) usando el menú.'
		});
		await test.step('Navegar a la PLP', async () => {
			await productsPage.goto();
		});
		await test.step('Seleccionar un producto para ir a la PDP', async () => {
			await productsPage.inventoryList.first().click();
		});
		await test.step('Validar el nombre del artículo en la PDP', async () => {
			await page.locator('[data-test="inventory-item-name"]').isVisible();
		});
		await test.step('Abrir el menú', async () => {
			await productsPage.openBurgerMenu();
			await expect(productsPage.burguerMenu).toBeVisible();
		});
		await test.step('Hacer clic en "All Items" para volver a la PLP', async () => {
			await productsPage.clickAllItems();
		});
		await test.info().attach('screenshot', { 
			body: await page.screenshot(),
			contentType: 'image/png',
		});

	});

	test.afterEach(async ({ page }) => {
		await page.close();
	});
        
});
