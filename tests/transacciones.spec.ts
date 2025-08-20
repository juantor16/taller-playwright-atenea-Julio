import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';
import { PaginaDashboard } from '../pages/paginaDashboard';
import { ModalCrearCuenta } from '../pages/modalCrearCuenta';
import { ModalEnviarTransferencia } from '../pages/modalEnviarTransferencia';

let paginaLogin: PaginaLogin
let paginaDashboard: PaginaDashboard
let modalCrearCuenta: ModalCrearCuenta
let modalEnviarTransferencia: ModalEnviarTransferencia

const testUsuarioEnvia = test.extend({
  storageState: require.resolve('../playwright/.auth/usuarioEnvia.json')
});

const testUsuarioRecibe = test.extend({
  storageState: require.resolve('../playwright/.auth/usuarioRecibe.json')
});

test.beforeEach(async ({ page }) => {
  paginaLogin = new PaginaLogin(page);
  paginaDashboard = new PaginaDashboard(page);
  modalCrearCuenta = new ModalCrearCuenta(page);
  modalEnviarTransferencia = new ModalEnviarTransferencia(page);
  await paginaDashboard.visitar();
});

// test('TC5 - Verificar que el usuario pueda crear una cuenta exitosamente', async ({}) => {
//   await paginaLogin.logueoExitoso("Juan.torres333@example.com", "contraseña123");
//   await paginaDashboard.botonAgregarCuenta.click()
//   await modalCrearCuenta.crearCuenta('Débito', '150');
// });

testUsuarioEnvia('TC6 - Verificar que el usuario pueda enviar dinero a otro usuario', async ({ page }) => {
  await expect(paginaDashboard.tituloDePagina).toBeVisible();
  await paginaDashboard.botonEnviarDinero.click();
  await modalEnviarTransferencia.completarYEnviarTransferencia('usuarioRecibe@dinero.com', '100');
})

testUsuarioRecibe('TC7 - Verificar que el usuario receptor vea reflejado el dinero en su cuenta', async ({ page }) => {
  await expect(paginaDashboard.tituloDePagina).toBeVisible();
  await expect(page.getByText('Transferencia de rickyricon@dinero.com').first()).toBeVisible();
});

