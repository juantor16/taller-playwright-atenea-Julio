import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';
import { PaginaDashboard } from '../pages/paginaDashboard';
import { ModalCrearCuenta } from '../pages/modalCrearCuenta';

let paginaLogin: PaginaLogin
let paginaDashboard: PaginaDashboard
let modalCrearCuenta: ModalCrearCuenta

test.beforeEach(async ({page}) => {
  paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);
  modalCrearCuenta = new ModalCrearCuenta(page);
  await paginaLogin.visitarPaginaLogin();
  await page.waitForURL('http://localhost:3000/dashboard')
}); 

test('TC5 - Verificar que el usuario pueda crear una cuenta exitosamente', async ({ page }) => {
  await paginaLogin.logueoExitoso("Juan.torres333@example.com", "contraseña123");
  await paginaDashboard.botonAgregarCuenta.click()
  await modalCrearCuenta.tipoDeCuentaCombobox.click()
  await modalCrearCuenta.opcionDebito.click()
  await modalCrearCuenta.montoInicialInput.fill('150')
  await modalCrearCuenta.botonCrearCuenta.click();
  await page.waitForTimeout(5000)
});

