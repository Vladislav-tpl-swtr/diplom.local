import { makeAutoObservable } from 'mobx';

export default class UserStore {
    
    constructor() {
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth = (bool) => { // Now an arrow function
        this._isAuth = bool;
    };

    setUser = (user) => {  // Now an arrow function
        this._user = user;
    };

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}
