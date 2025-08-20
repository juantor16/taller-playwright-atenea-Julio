// importaciones de Playwright
import { Page, Locator, expect } from '@playwright/test';

export class PaginaDashboard {
    readonly page: Page;
    // Definimos los localizadores que vamos a usar
    readonly botonAgregarCuenta: Locator;
    readonly tituloDePagina: Locator;
    readonly botonEnviarDinero: Locator;


    // Constructor que recibe el page y define los localizadores
    constructor(page: Page) {
        // Asignamos el page a la propiedad de la clase
        this.page = page;
        this.botonAgregarCuenta = this.page.getByTestId('tarjeta-agregar-cuenta')
        this.tituloDePagina = this.page.getByTestId('titulo-dashboard')
        this.botonEnviarDinero = this.page.getByTestId('boton-enviar')
    }

    async visitar() {
        await this.page.goto('http://localhost:3000/dashboard');
        await this.page.waitForLoadState('domcontentloaded')
    }

}