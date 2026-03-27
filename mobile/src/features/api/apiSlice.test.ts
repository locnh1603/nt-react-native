import {configureStore} from '@reduxjs/toolkit';
import apiReducer, {
  fetchApiData,
  fetchDataFailure,
  fetchDataStart,
  fetchDataSuccess,
  selectApiData,
  selectApiError,
  selectApiLoading,
} from './apiSlice';

const mockGetProducts = jest.fn();

jest.mock('../../services/data/data-service', () => ({
  dataService: {
    getProducts: () => mockGetProducts(),
  },
}));

const createStore = () =>
  configureStore({
    reducer: {
      api: apiReducer,
    },
  });

describe('apiSlice', () => {
  beforeEach(() => {
    mockGetProducts.mockReset();
  });

  it('should handle reducer transitions', () => {
    const startState = apiReducer(undefined, fetchDataStart());
    expect(startState.loading).toBe(true);
    expect(startState.error).toBeNull();

    const successState = apiReducer(
      startState,
      fetchDataSuccess([
        {
          albumId: 1,
          id: 1,
          title: 'photo',
          url: 'https://cdn.test/photo',
          thumbnailUrl: 'https://cdn.test/thumb',
        },
      ]),
    );
    expect(successState.loading).toBe(false);
    expect(successState.data).toHaveLength(1);

    const failureState = apiReducer(successState, fetchDataFailure('Boom'));
    expect(failureState.loading).toBe(false);
    expect(failureState.error).toBe('Boom');
  });

  it('should fetch api data successfully', async () => {
    mockGetProducts.mockResolvedValue([
      {
        albumId: 1,
        id: 7,
        title: 'item',
        url: 'https://cdn.test/item',
        thumbnailUrl: 'https://cdn.test/item-thumb',
      },
    ]);

    const store = createStore();
    await store.dispatch(fetchApiData() as never);

    const state = store.getState();
    expect(selectApiLoading(state as never)).toBe(false);
    expect(selectApiData(state as never)).toHaveLength(1);
    expect(selectApiError(state as never)).toBeNull();
  });

  it('should handle fetch api data failure', async () => {
    mockGetProducts.mockRejectedValue(new Error('Network down'));

    const store = createStore();
    await store.dispatch(fetchApiData() as never);

    const state = store.getState();
    expect(selectApiLoading(state as never)).toBe(false);
    expect(selectApiError(state as never)).toContain('Network down');
  });
});
