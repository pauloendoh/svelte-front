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
 * @summary Get all users
 */
export const getAllUsers200ResponseItem = zod.object({
  "id": zod.number(),
  "username": zod.string(),
  "email": zod.string()
})
export const getAllUsers200Response = zod.array(getAllUsers200ResponseItem)

