import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from './App';

test("renders without crashing", function() {
  render(
  <MemoryRouter>
      <App />
  </MemoryRouter>);
});

test("matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
