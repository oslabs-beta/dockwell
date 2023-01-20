import {
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from '@testing-library/react';
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import renderer from 'react-test-renderer';
import getAppStats from '../src/client/pages/App';

jest.mock('axios');

// axios utils function to text axios functionality
describe('AXIOS', () => {
  describe('when the call is successful', () => {
    it('should return users list', async () => {
      const fakeUser = ['bgte', 'arch']; //memory location 0

      axios.get.mockResolvedValueOnce(fakeUser);
      // axios.get.mockResolvedValueOnce(['bgte', 'arch']); //memory location 1

      const result = await fetchUsers();
      console.debug(result === fakeUser);

      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/user');
      expect(result).toEqual(fakeUser); //YES //memory location 0
      expect(result).toBe(fakeUser); //YES //memory location 0
      // expect(result).toEqual(['bgte', 'arch']); //YES //memory location 2
      // expect(result).toBe(['bgte', 'arch']); //NO //memory location 3
    });
    describe('when API call fails', () => {
      it('should return empty users list', async () => {
        // given
        const message = 'Network Error';
        axios.get.mockRejectedValueOnce(new Error(message));

        // when
        const result = await fetchUsers();

        // then
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/user');
        expect(result).toEqual([]);
      });
    });
  });
});
