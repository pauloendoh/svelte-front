/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * My API
 * OpenAPI spec version: 1.0.0
 */
import type {
  CreateTodo200,
  CreateTodoBody,
  DeleteTodo204,
  GetUserTodos200Item,
  UpdateTodo200,
  UpdateTodoBody
} from '../myAPI.schemas'
import { myRequest } from '../../lib/utils/myAxios';


type SecondParameter<T extends (...args: any) => any> = Parameters<T>[1];


  /**
 * @summary Get user todos
 */
export const getUserTodos = (
    
 options?: SecondParameter<typeof myRequest>,) => {
      return myRequest<GetUserTodos200Item[]>(
      {url: `/todos`, method: 'GET'
    },
      options);
    }
  /**
 * @summary Create todo
 */
export const createTodo = (
    createTodoBody: CreateTodoBody,
 options?: SecondParameter<typeof myRequest>,) => {
      return myRequest<CreateTodo200>(
      {url: `/todos`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createTodoBody
    },
      options);
    }
  /**
 * @summary Update todo
 */
export const updateTodo = (
    todoId: number | null,
    updateTodoBody: UpdateTodoBody,
 options?: SecondParameter<typeof myRequest>,) => {
      return myRequest<UpdateTodo200>(
      {url: `/todos/${todoId}`, method: 'PATCH',
      headers: {'Content-Type': 'application/json', },
      data: updateTodoBody
    },
      options);
    }
  /**
 * @summary Delete todo
 */
export const deleteTodo = (
    todoId: number | null,
 options?: SecondParameter<typeof myRequest>,) => {
      return myRequest<DeleteTodo204>(
      {url: `/todos/${todoId}`, method: 'DELETE'
    },
      options);
    }
  export type GetUserTodosResult = NonNullable<Awaited<ReturnType<typeof getUserTodos>>>
export type CreateTodoResult = NonNullable<Awaited<ReturnType<typeof createTodo>>>
export type UpdateTodoResult = NonNullable<Awaited<ReturnType<typeof updateTodo>>>
export type DeleteTodoResult = NonNullable<Awaited<ReturnType<typeof deleteTodo>>>
