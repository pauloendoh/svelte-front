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
 * @summary Create a post
 */
export const createPostBody = zod.object({
  "title": zod.string(),
  "body": zod.string()
})

export const createPost201Response = zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "body": zod.string()
})

/**
 * @summary Get a post by id
 */
export const getPostParams = zod.object({
  "id": zod.string()
})

export const getPost200Response = zod.object({
  "id": zod.string(),
  "title": zod.string(),
  "body": zod.string()
})

export const getPost202Response = zod.object({
  "id": zod.string().optional(),
  "title": zod.string(),
  "body": zod.string()
})

export const getPost404Response = zod.string().nullable()

