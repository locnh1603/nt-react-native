import React from 'react';
import {render, userEvent} from '@testing-library/react-native';
import {ErrorDisplay} from './ErrorDisplay';

describe('ErrorDisplay', () => {
  it('should render title, message and default retry label', () => {
    const {getByText} = render(
      <ErrorDisplay
        title="Error Loading"
        message="Something went wrong"
        onRetry={jest.fn()}
      />,
    );

    expect(getByText('Error Loading')).toBeTruthy();
    expect(getByText('Something went wrong')).toBeTruthy();
    expect(getByText('Retry')).toBeTruthy();
  });

  it('should invoke onRetry when retry is pressed', async () => {
    const onRetry = jest.fn();
    const {getByText} = render(
      <ErrorDisplay
        title="Error"
        message="Retry please"
        onRetry={onRetry}
        retryLabel="Try Again"
      />,
    );

    const user = userEvent.setup();
    await user.press(getByText('Try Again'));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
