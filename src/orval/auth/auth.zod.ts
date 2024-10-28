/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * My API
 * OpenAPI spec version: 1.0.0
 */
import {
  z as zod
} from 'zod'

/**
 * @summary Create user account
 */
export const signUpHeader = zod.object({
  "x-custom-header": zod.string()
})

export const signUpBodyUsernameMin = 3;

export const signUpBodyUsernameMax = 16;
export const signUpBodyPassword1Min = 6;
export const signUpBodyPassword2Min = 6;


export const signUpBody = zod.object({
  "username": zod.string().min(signUpBodyUsernameMin).max(signUpBodyUsernameMax),
  "email": zod.string().email(),
  "password1": zod.string().min(signUpBodyPassword1Min),
  "password2": zod.string().min(signUpBodyPassword2Min)
})

export const signUp201Response = zod.object({
  "id": zod.number(),
  "username": zod.string(),
  "email": zod.string(),
  "token": zod.string(),
  "tokenExpiresAt": zod.string()
})

export const signUp404Response = zod.enum(['Not found'])

export const signUp409Response = zod.enum(['The email address you entered is already in use. Please use a different email address.', 'The username you entered is already in use. Please use a different username.'])

/**
 * @summary Log in user
 */
export const logInBodyUsernameOrEmailMin = 3;

export const logInBodyUsernameOrEmailMax = 16;
export const logInBodyPasswordMin = 6;


export const logInBody = zod.object({
  "usernameOrEmail": zod.string().min(logInBodyUsernameOrEmailMin).max(logInBodyUsernameOrEmailMax),
  "password": zod.string().min(logInBodyPasswordMin)
})

export const logIn200Response = zod.object({
  "id": zod.number(),
  "username": zod.string(),
  "email": zod.string(),
  "token": zod.string(),
  "tokenExpiresAt": zod.string()
})

export const logIn400Response = zod.enum(['Invalid username, email, or password.'])

/**
 * @summary Get current user
 */
export const getMe200Response = zod.object({
  "id": zod.number(),
  "username": zod.string(),
  "email": zod.string(),
  "token": zod.string(),
  "tokenExpiresAt": zod.string()
})

