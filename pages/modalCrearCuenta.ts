// importaciones de Playwright
import { Page, Locator, expect } from '@playwright/test';

export class ModalCrearCuenta {
    readonly page: Page;
    // Definimos los localizadores que vamos a usar
    readonly tipoDeCuentaCombobox: Locator;
    readonly opcionDebito: Locator;
    readonly montoInicialInput: Locator;
    readonly botonCrearCuenta: Locator;


    // Constructor que recibe el page y define los localizadores
    constructor(page: Page) {
        // Asignamos el page a la propiedad de la clase
        this.page = page;
        this.tipoDeCuentaCombobox = this.page.getByRole('combobox', { name: 'Tipo de cuenta *' })
        this.montoInicialInput = this.page.getByRole('spinbutton', { name: 'Monto inicial *' })
        this.botonCrearCuenta = this.page.getByTestId('boton-crear-cuenta')
    }

    async seleccionarTipoDeCuenta(tipoDeCuenta: string) {
        await this.tipoDeCuentaCombobox.click();
        try {
            await this.page.getByRole('option', { name: tipoDeCuenta }).click();
        } catch (error) {
            console.log(`La opcion ${tipoDeCuenta} no existe en el combobox`);
        }
    }

    async completarMontoInicial(monto: string) {
        await this.montoInicialInput.fill(monto);
    }

    async crearCuenta(tipoDeCuenta: string, montoInicial: string) {
        await this.seleccionarTipoDeCuenta(tipoDeCuenta);
        await this.completarMontoInicial(montoInicial);
        await this.botonCrearCuenta.click();
        // Validar que la cuenta se haya creado exitosamente
        await expect(this.page.getByText('Cuenta creada exitosamente')).toBeVisible();
    }

}