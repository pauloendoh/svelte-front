import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";




const signUp_Body = z.object({ username: z.string().min(3).max(16), email: z.string().email(), password1: z.string().min(6), password2: z.string().min(6) }).passthrough();
const logIn_Body = z.object({ usernameOrEmail: z.string().min(3).max(16), password: z.string().min(6) }).passthrough();

export const schemas = {
	signUp_Body,
	logIn_Body,
};

export const endpoints = makeApi([
	{
		method: "post",
		path: "/log-in",
		alias: "logIn",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				description: `Body`,
				type: "Body",
				schema: logIn_Body
			},
		],
		response: z.object({ id: z.number(), username: z.string(), email: z.string(), token: z.string(), tokenExpiresAt: z.string() }).passthrough(),
		errors: [
			{
				status: 400,
				description: `400`,
				schema: z.literal("Invalid username, email, or password.")
			},
		]
	},
	{
		method: "get",
		path: "/me",
		alias: "getMe",
		requestFormat: "json",
		response: z.object({ id: z.number(), username: z.string(), email: z.string(), token: z.string(), tokenExpiresAt: z.string() }).passthrough(),
		errors: [
			{
				status: 401,
				description: `401`,
				schema: z.object({ message: z.enum(["Missing authorization token", "Invalid token"]) }).passthrough()
			},
		]
	},
	{
		method: "post",
		path: "/sign-up",
		alias: "signUp",
		requestFormat: "json",
		parameters: [
			{
				name: "body",
				description: `Body`,
				type: "Body",
				schema: signUp_Body
			},
			{
				name: "x-custom-header",
				type: "Header",
				schema: z.string()
			},
		],
		response: z.object({ id: z.number(), username: z.string(), email: z.string(), token: z.string(), tokenExpiresAt: z.string() }).passthrough(),
		errors: [
			{
				status: 404,
				description: `404`,
				schema: z.literal("Not found")
			},
			{
				status: 409,
				description: `409`,
				schema: z.enum(["The email address you entered is already in use. Please use a different email address.", "The username you entered is already in use. Please use a different username."])
			},
		]
	},
	{
		method: "get",
		path: "/users",
		alias: "getAllUsers",
		requestFormat: "json",
		response: z.array(z.object({ id: z.number(), username: z.string(), email: z.string() }).passthrough()),
	},
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
    return new Zodios(baseUrl, endpoints, options);
}
