/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * My API
 * OpenAPI spec version: 1.0.0
 */
import axios from 'axios'
import type {
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import type {
  GetAllUsers200Item
} from '../myAPI.schemas'



  /**
 * @summary Get all users
 */
export const getAllUsers = <TData = AxiosResponse<GetAllUsers200Item[]>>(
     options?: AxiosRequestConfig
 ): Promise<TData> => {
    return axios.get(
      `http://localhost:3123/users`,options
    );
  }
export type GetAllUsersResult = AxiosResponse<GetAllUsers200Item[]>