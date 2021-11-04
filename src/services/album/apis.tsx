import axios from 'axios';

import * as API from 'src/private/constants';
import { FetchAlbumRequest, IAlbum } from './types';

export default class AlbumAPI {
  static async findAll(payload: FetchAlbumRequest['payload']) {
    try {
      const response = await axios({
        method: 'get',
        url: API.API_GET_ALBUMS_URL,
        params: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return {
        data: '',
        message: error,
        success: false,
      };
    }
  }

  static async create(payload: IAlbum) {
    try {
      const response = await axios({
        method: 'POST',
        url: API.API_GET_ALBUMS_URL,
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return {
        data: '',
        message: error,
        success: false,
      };
    }
  }

  static async update(payload: IAlbum) {
    try {
      const response = await axios({
        method: 'PUT',
        url: API.API_UPDATE_ALBUMS_URL(payload?.id),
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return {
        data: '',
        message: error,
        success: false,
      };
    }
  }

  static async delete(payload: IAlbum) {
    try {
      const response = await axios({
        method: 'DELETE',
        url: API.API_UPDATE_ALBUMS_URL(payload?.id),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      return {
        data: '',
        message: error,
        success: false,
      };
    }
  }
}
