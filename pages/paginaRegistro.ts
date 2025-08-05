// importaciones de Playwright
import { Page, Locator } from '@playwright/test';

// exponiendo la clase PaginaRegistro para poder usarla en los tests
export class PaginaRegistro {
    // Siempre necesitamos el page para interactuar con la página
    readonly page: Page;
    // Definimos los localizadores que vamos a usar
    readonly nombreInput: Locator;
    readonly apellidoInput: Locator;
    readonly emailInput: Locator;
    readonly contrasenaInput: Locator;
    readonly botonRegistrarse: Locator;
    readonly botonIniciarSesion: Locator;
    // variables de textos
    readonly mensajeDeCreacionDeCuenta: string;
    readonly mensajeEmailUtilizado: string;

    // Constructor que recibe el page y define los localizadores
    constructor(page: Page) {
        // Asignamos el page a la propiedad de la clase
        this.page = page;
        // Definimos el localizador para el campo de nombre
        this.nombreInput = page.getByRole('textbox', { name: 'Nombre' })
        this.apellidoInput = page.locator('[name="lastName"]');
        this.emailInput = page.getByRole('textbox', { name: 'Correo electrónico' });
        this.contrasenaInput = page.getByRole('textbox', { name: 'Contraseña' });
        this.botonRegistrarse = page.getByTestId('boton-registrarse');

        this.mensajeDeCreacionDeCuenta = "Registro exitoso!"
        this.mensajeEmailUtilizado = "Email already in use"
    }

    async visitarPaginaRegistro() {
        await this.page.goto('http://localhost:3000/signup');
        await this.page.waitForLoadState('domcontentloaded')
    }

    async completarFormularioRegistro(nombre: string, apellido: string, email: string, contraseña: string){
        await this.nombreInput.fill(nombre);
        await this.apellidoInput.fill(apellido)
        await this.emailInput.fill(email)
        await this.contrasenaInput.fill(contraseña)
    }

    async hacerClickEnBotonRegistro(){
        await this.botonRegistrarse.click()
    }

    async registrarUsuario(nombre: string, apellido: string, email: string, contraseña: string){
        await this.completarFormularioRegistro(nombre,apellido,email,contraseña)
        await this.hacerClickEnBotonRegistro();
    }
}