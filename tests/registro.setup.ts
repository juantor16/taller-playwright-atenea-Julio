import {test as setup} from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';
import { PaginaDashboard } from '../pages/paginaDashboard';
import { ModalCrearCuenta} from '../pages/modalCrearCuenta';
import { BackendUtils } from '../utils/backendUtils';
import TestData from '../data/testData.json';
 
//rickyricon@dinero.com envia dinero

// usuarioRecibe@dinero.com recibe dinero
let paginaLogin: PaginaLogin;
let paginaDashboard: PaginaDashboard;
let modalCrearCuenta: ModalCrearCuenta;

const usuarioEnviaAuthFile = 'playwright/.auth/usuarioEnvia.json'
const usuarioRecibeAuthFile = 'playwright/.auth/usuarioRecibe.json'

setup.beforeEach(async ({page}) => {
    paginaLogin = new PaginaLogin(page);
    paginaDashboard = new PaginaDashboard(page);
    modalCrearCuenta = new ModalCrearCuenta(page);
    await paginaLogin.visitarPaginaLogin()
});

setup('Generar usuario que envia dinero se loguea', async ({ page, request }) => {
    const nuevoUsuario = await BackendUtils.crearUsuarioPorAPI(request, TestData.usuarioValido)
    await paginaLogin.logueoExitoso(nuevoUsuario.email, nuevoUsuario.contrasena);
    await paginaDashboard.botonAgregarCuenta.click();
    await modalCrearCuenta.crearCuenta('Débito', '1000');
    await page.context().storageState({ path: usuarioEnviaAuthFile });
});

setup('Usuario que recibe dinero se loguea', async ({ page }) => {
    await paginaLogin.logueoExitoso('usuarioRecibe@dinero.com', '123456');
    await page.context().storageState({ path: usuarioRecibeAuthFile });
});
