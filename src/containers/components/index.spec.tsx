import { render, screen } from '@testing-library/react';
import { Component } from '.';

describe(nameof(Component), () => {
  it('Simple test', () => {
    render(<Component />);

    const component = screen.getByTestId('test');
    expect(component.textContent).toBe('Hello');
  });
});
