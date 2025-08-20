import { APIRequestContext, expect } from "@playwright/test";

export class BackendUtils {

    static async crearUsuarioPorAPI(request: APIRequestContext, usuario: any) {
        const email = (usuario.email.split('@'))[0] + Math.floor(Math.random() * 1000) + '@' + usuario.email.split('@')[1];
        const response = await request.post('http://localhost:6007/api/auth/signup', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                firstName: usuario.nombre,
                lastName: usuario.apellido,
                email: email,
                password: usuario.contrasena
            }
        })
        expect(response.status()).toBe(201);
        return { email: email, contrasena: usuario.contrasena }
    }

}