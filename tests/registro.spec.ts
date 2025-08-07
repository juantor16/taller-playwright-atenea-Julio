import { test, expect, request } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';
import TestData from '../data/testData.json';

let paginaRegistro: PaginaRegistro;

// se ejecuta antes de cada test
test.beforeEach(async ({ page }) => {
  /*usos comunes son:
  navegar a una pagina inicial del feature
  inicializar page objects
  autenticacion de usuario
  limpiar el local storage y cache
  */

  paginaRegistro = new PaginaRegistro(page);
  await paginaRegistro.visitarPaginaRegistro();
})


test('TC1 - registro exitoso', async ({ page }) => {
  const emailAleatorio = 'Juan.torres' + Math.floor(Math.random() * 1000) + '@example.com';

  await paginaRegistro.registrarUsuario(
    "Juan",
    "Torres",
    emailAleatorio,
    "contraseña123"
  );
  await expect(page.getByText(paginaRegistro.mensajeDeCreacionDeCuenta)).toBeVisible();
});

test('TC2 - registro no exitoso, mail existente', async ({ page }) => {
  await paginaRegistro.registrarUsuario(
    "Juan",
    "Torres",
    "juan.torres@example.com",
    "Contraseña123"
  );
  await expect(page.getByText(paginaRegistro.mensajeEmailUtilizado)).toBeVisible();
});

test('TC3 - verificar redireccionamiento a login despues de crear un usuario', async ({ page }) => {
  const emailAleatorio = 'Juan.torres' + Math.floor(Math.random() * 1000) + '@example.com';
  await paginaRegistro.registrarUsuario(
    "Juan",
    "Torres",
    emailAleatorio,
    "contraseña123"
  );
  await expect(page.getByText(paginaRegistro.mensajeDeCreacionDeCuenta)).toBeVisible();
  await page.waitForURL('http://localhost:3000/login')
})

test('TC6 - verificar que podemos crear un usuario desde la API', async ({ page, request }) => {
  const email = (TestData.usuarioValido.email.split('@'))[0] + Math.floor(Math.random() * 1000) + '@' + TestData.usuarioValido.email.split('@')[1];
  const response = await request.post('http://localhost:6007/api/auth/signup', {
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      firstName: TestData.usuarioValido.nombre,
      lastName: TestData.usuarioValido.apellido,
      email: email,
      password: TestData.usuarioValido.contrasena
    }
  })
  //guardamos la respuesta en una variable
  const responseBody = await response.json();
  expect(response.status()).toBe(201);
  expect(responseBody).toHaveProperty('token');
  expect(typeof responseBody.token).toBe('string');
  expect(responseBody).toHaveProperty('user');
  expect(responseBody.user).toEqual(expect.objectContaining({
    id: expect.any(String),
    firstName: TestData.usuarioValido.nombre,
    lastName: TestData.usuarioValido.apellido,
    email: email,
  }))
})

test('TC7 -  Verificar registro exitoso con datos vallidos verificando respuesta de API', async ({ page }) => {
  await test.step('Completar el formaulario de registro', async () => {
    const email = (TestData.usuarioValido.email.split('@'))[0] + Math.floor(Math.random() * 1000) + '@' + TestData.usuarioValido.email.split('@')[1];
    await paginaRegistro.completarFormularioRegistro(
      TestData.usuarioValido.nombre,
      TestData.usuarioValido.apellido,
      email,
      TestData.usuarioValido.contrasena
    );
    const mensajeDeCreacionDeCuenta = page.waitForResponse('**/api/auth/signup');
    await paginaRegistro.hacerClickEnBotonRegistro();
    const respuesta = await mensajeDeCreacionDeCuenta;
    const responseBody = await respuesta.json();

    expect(respuesta.status()).toBe(201);
    expect(responseBody).toHaveProperty('token');
    expect(typeof responseBody.token).toBe('string');
    expect(responseBody).toHaveProperty('user');
    expect(responseBody.user).toEqual(expect.objectContaining({
      id: expect.any(String),
      firstName: TestData.usuarioValido.nombre,
      lastName: TestData.usuarioValido.apellido,
      email: email,
    }))
    await expect(page.getByText('Registro exitoso')).toBeVisible();
  })
})

test('TC8 -  Verificar comportamiento front ante un mail ya utilizado', async ({ page }) => {
  const email = (TestData.usuarioValido.email.split('@'))[0] + Math.floor(Math.random() * 1000) + '@' + TestData.usuarioValido.email.split('@')[1];
  // Interceptar la solicitud de registro y devolver un 409
  // trampa que redirecciona la respuesta de la API
  await page.route('**/api/auth/signup', route => {
    route.fulfill({
      status: 409,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Email already in use' })
    })
  })

  // llenar el formuario de registro
  await paginaRegistro.registrarUsuario(
    TestData.usuarioValido.nombre,
    TestData.usuarioValido.apellido,
    email,
    TestData.usuarioValido.contrasena
  );

  // verificar que se muestre el mensaje de error
  await expect(page.getByText('Email already in use')).toBeVisible();


})
