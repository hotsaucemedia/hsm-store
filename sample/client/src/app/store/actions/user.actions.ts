import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { type } from './utils/type-cache';
import { Observable } from 'rxjs/Observable';

// export const ActionTypes = {
//     USER_GET:                   type('[User] User Get'),
//     USER_GET_SUCCESS:           type('[User] User Get Success'),
//     USER_TRY_LOGIN:             type('[User] User Get Login'),
//     USER_TRY_LOGIN_SUCCESS:     type('[User] User Try Lofgin Success'),
//     USER_TRY_LOGIN_FAIL:        type('[User] User Try Login Fail'),
//     USER_TRY_REGISTER:          type('[User] User Try Register'),
//     USER_TRY_REGISTER_SUCCESS:  type('[User] User Try Register Success'),
//     USER_TRY_REGISTER_FAIL:     type('[User] User Try Register Fail'),
//     USER_TRY_RESET_PASSWORD:    type('[User] User Try Reset Password'),
//   };


export const USER_GET = 'Profile: get user';
export const USER_GET_SUCCESS = 'Profile: get user success';
export const USER_TRY_LOGIN = 'Profile: user try login';
export const USER_TRY_LOGIN_SUCCESS = 'Profile: user try login success';
export const USER_TRY_LOGIN_FAIL = 'Profile: user try login fail';
export const USER_TRY_REGISTER = 'Profile: user try register';
export const USER_TRY_REGISTER_SUCCESS = 'Profile: user try register success';
export const USER_TRY_REGISTER_FAIL = 'Profile: user try register fail';
export const USER_TRY_RESET_PASSWORD = 'Profile: user try reset password';


@Injectable()
export class UserActions {

    constructor(private store: Store<any>) {

    }

}