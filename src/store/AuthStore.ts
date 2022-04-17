import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { Token } from "../Token";
import { LKRootStore } from "./lk/LKRootStore";
import { RootStore } from "./RootStore";
import { LoginModel } from "./_types/LoginModel";
import { TypeAuth } from "./_types/TypeAuth";

export class AuthStore {

    rootStore: RootStore;
    typeAuth: TypeAuth = TypeAuth.Loading;
    id?: number;
    email?: string;
    birthDate?: Date;

    constructor(rootStore : RootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this);
    }

    initStore = () => {
        runInAction(() => {
            this.typeAuth = TypeAuth.Loading;
            this.id = undefined;
            this.email = undefined;
            this.birthDate = undefined;
        })
    }

    makeUnAuthState = () => {
        runInAction(() => {
            this.typeAuth = TypeAuth.NoAuth;
        })
    }

    login = async (loginModel: LoginModel) => {
        const promise = axios.post('/api/user/login', loginModel)
            .then(async result => {
                Token.getInstance().content = result?.data.accessToken;
            
                runInAction(() => {
                    this.typeAuth = TypeAuth.Auth;
                })
                await this.getUserInfo();
            })

        return promise;
    }

    logout = async () => {
        const result = await axios.put('/api/user/revoke-refresh-token');
        runInAction(() => {
            this.typeAuth = TypeAuth.NoAuth;
        })

        return result;
    }

    getUserInfo = async () => {
        const { data } = await axios.get('/api/user/me');

        runInAction(() => {
            this.typeAuth = TypeAuth.Auth
            this.id = data.id
            this.email = data.email;
            this.birthDate = data.birthDate;
        })
    }
}
