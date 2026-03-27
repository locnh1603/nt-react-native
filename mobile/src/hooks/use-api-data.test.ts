import {renderHook} from '@testing-library/react-native';
import useApiData from './use-api-data';

const mockDispatch = jest.fn();
const mockFetchApiData = jest.fn(() => ({type: 'api/fetchData'}));

interface MockApiState {
  api: {
    data: Array<{id: number; title: string}>;
    loading: boolean;
    error: string | null;
  };
}

const mockState: MockApiState = {
  api: {
    data: [{id: 1, title: 'Item'}],
    loading: false,
    error: null,
  },
};

jest.mock('../features/api', () => ({
  fetchApiData: () => mockFetchApiData(),
  selectApiData: (state: MockApiState) => state.api.data,
  selectApiLoading: (state: MockApiState) => state.api.loading,
  selectApiError: (state: MockApiState) => state.api.error,
}));

jest.mock('../app/hooks', () => ({
  useAppDispatch: () => mockDispatch,
  useAppSelector: (selector: (state: MockApiState) => unknown) =>
    selector(mockState),
}));

describe('useApiData', () => {
  beforeEach(() => {
    mockDispatch.mockReset();
    mockFetchApiData.mockClear();
  });

  it('should dispatch fetchApiData on mount and return selector data', () => {
    const {result} = renderHook(() => useApiData());

    expect(mockFetchApiData).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith({type: 'api/fetchData'});
    expect(result.current).toEqual({
      apiData: [{id: 1, title: 'Item'}],
      loading: false,
      error: null,
    });
  });
});
