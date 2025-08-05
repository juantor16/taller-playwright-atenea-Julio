// importaciones de Playwright
import { Page, Locator, expect } from '@playwright/test';

export class PaginaLogin {
    readonly page: Page;
    // Definimos los localizadores que vamos a usar
    readonly emailInput: Locator;
    readonly contrasenaInput: Locator;
    readonly botonIniciarSesion: Locator;
    readonly linkRegistrarse: Locator;
    readonly botonCrearCuenta: Locator;

    //variables de mensajes
    readonly loginExitoso: string;


    // Constructor que recibe el page y define los localizadores
    constructor(page: Page) {
        // Asignamos el page a la propiedad de la clase
        this.page = page;
        // Definimos el localizador para el campo de nombre
        this.emailInput = page.getByRole('textbox', { name: 'Correo electrónico' })
        this.contrasenaInput = page.getByRole('textbox', { name: 'Contraseña' })
        this.botonIniciarSesion = page.getByTestId('boton-login')
        this.linkRegistrarse = page.getByTestId('link-registrarse-login')
        this.botonCrearCuenta = page.getByTestId('boton-signup-header')
        this.loginExitoso = "Inicio de sesión exitoso"
    }

    async visitarPaginaLogin() {
        await this.page.goto('http://localhost:3000/login');
        await this.page.waitForLoadState('domcontentloaded')
    }

    async completarFormularioLogin(email: string, contraseña: string) {
        await this.emailInput.fill(email)
        await this.contrasenaInput.fill(contraseña)
    }

    async hacerClickBotonLogin() {
        await this.botonIniciarSesion.click()
    }

    async logueoExitoso(email: string, contraseña: string) {
        await this.completarFormularioLogin(email, contraseña)
        await this.hacerClickBotonLogin();
        await expect(this.page.getByText(this.loginExitoso)).toBeVisible()
    }
}