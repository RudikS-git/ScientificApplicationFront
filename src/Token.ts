import dayjs from "dayjs";
import jwt_decode, { JwtPayload } from "jwt-decode";

export class Token {
    private static instance?: Token;

    private _content?: string; // token
    private _dateExpiration?: number; // unix time

    private constructor() {
        // do nothing
    }

    static getInstance() {
        if(!Token.instance) {
            Token.instance = new Token();

            // const accessToken = localStorage.getItem('access');
            
            // if(accessToken) {
            //     Token.instance._content = accessToken;
            //     Token.instance._dateExpiration = jwt_decode<JwtPayload>(accessToken).exp;
            // }
            
        }

        return Token.instance;
    }

    static deleteInstance() {
        // localStorage.removeItem('access');
        Token.instance = undefined;
    }

    public get content(): string | undefined {
        return this._content;
    }
  
    public set content(content: string | undefined) {
        this._content = content;

        if(content) {
            // localStorage.setItem('access', content)
            this._dateExpiration = jwt_decode<JwtPayload>(content).exp;
        }
        else {
            this._dateExpiration = undefined;
        }
    }

    public get dateExpiration() {
        return this._dateExpiration;
    }

    public get hasTokenExpired() : boolean {
    
        if(this._dateExpiration) {
            const diff = dayjs.unix(this._dateExpiration).diff(dayjs(), 'minute'); // откидывает секунды
        
            if(diff <= 1) { // если осталось до окончания меньше 1 минуты
                return true;
            }
    
            return false;
        }
    
        return true;
    }
}