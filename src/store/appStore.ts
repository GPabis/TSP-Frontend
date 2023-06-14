import {makeAutoObservable, toJS} from "mobx";
import {createContext} from "react";

const URL = import.meta.env.VITE_API_URL;

class AuthState {
    public username: string;
    public email: string;
    public isAuth: boolean;

    public emailFormInput: string;
    public passwordFormInput: string;

    public constructor() {
        this.username = '';
        this.email = '';
        this.emailFormInput = '';
        this.passwordFormInput = '';
        this.isAuth = false;
        makeAutoObservable(this);
    }

    public setPasswordFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        this.passwordFormInput = e.target.value;
    }

    public setEmailFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        this.emailFormInput = e.target.value;
    }

    public async whoAmI() {
        try {
            const response = await fetch(`${URL}/auth/whoami`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if(response.ok) {
                const result = await response.json();
                this.isAuth = true;
                this.email = result.email;
                this.username = result.name;
                return;
            }

            this.isAuth = false;
        } catch (e) {
            throw new Error('Something went wrong');
        }
    }

    public login = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = {
            email: this.emailFormInput,
            password: this.passwordFormInput,
        }

        if(body.email && body.password) {
            try {
                const response = await fetch(`${URL}/auth/login`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    }
                });

                if(response.ok) {
                    const result = await response.json();
                    this.isAuth = true;
                    this.email = result.email;
                    this.username = result.name;
                }
            } catch (e) {
                console.log(e)
                throw new Error('Something went wrong');
            }
        }
    }
}

export class AppState {
    public auth: AuthState;
    public constructor() {
        this.auth = new AuthState();
        makeAutoObservable(this);
    }
}

export const AppContext = createContext<AppState>({} as AppState);