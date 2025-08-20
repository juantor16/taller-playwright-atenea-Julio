// importaciones de Playwright
import { Page, Locator, expect } from '@playwright/test';

export class ModalEnviarTransferencia {
    readonly page: Page;
    // Definimos los localizadores que vamos a usar
    readonly emailDestinatarioInput: Locator;
    readonly cuentaOrigenCombobox: Locator;
    readonly montoInput: Locator;
    readonly botonEnviar: Locator;
    readonly botonCancelar: Locator;
    readonly tipoDeCuentaOption: Locator;


    // Constructor que recibe el page y define los localizadores
    constructor(page: Page) {
        // Asignamos el page a la propiedad de la clase
        this.page = page;
        this.emailDestinatarioInput = this.page.getByRole('textbox', { name: 'Email del destinatario *' })
        this.cuentaOrigenCombobox = this.page.getByRole('combobox', { name: 'Cuenta origen *' })
        this.montoInput = this.page.getByRole('spinbutton', { name: 'Monto a enviar *' })
        this.botonEnviar = this.page.getByRole('button', { name: 'Enviar' })
        this.botonCancelar = this.page.getByRole('button', { name: 'Cancelar' })
        this.tipoDeCuentaOption = this.page.getByRole('option', { name: '••••' })
    }

    async completarYEnviarTransferencia(emailDestinatario: string, monto: string) {
        await this.emailDestinatarioInput.fill(emailDestinatario);
        await this.cuentaOrigenCombobox.click();
        await this.tipoDeCuentaOption.click();
        await this.montoInput.fill(monto);
        await this.botonEnviar.click();
        await expect(this.page.getByText('Transferencia enviada a ' + emailDestinatario)).toBeVisible();
    }

}