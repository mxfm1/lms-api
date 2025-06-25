import { BaseError } from "./error";

export class credError extends BaseError{
    constructor(message = 'Correo o contraseña inválidos..'){
        super(message,401)
    }
}

export class AuthError extends BaseError{
    constructor(message='No existe una cuenta asociada a este correo..'){
        super(message,404)
    }
}