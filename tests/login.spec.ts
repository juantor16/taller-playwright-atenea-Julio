import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';

let paginaLogin: PaginaLogin

test('TC4 - login exitoso', async ({ page }) => {
  paginaLogin = new PaginaLogin(page)
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.logueoExitoso("Juan.torres333@example.com", "contraseña123");
});

