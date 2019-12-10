import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import CustomSelect from './components/CustomSelect';
import Loader from './components/Loader';

test('renders loader', () => {
  const { getByText } = render(<Loader />);
  const loader = getByText(/chargement/i);
  expect(loader).toBeInTheDocument();
});

test('renders label first input', () => {
  const { getByText } = render(<App />);
  const labelElement = getByText(/starting/i);
  expect(labelElement).toBeInTheDocument();
});

test('renders select', () => {
  const { container } = render(<CustomSelect />);

  expect(container.firstChild).toMatchInlineSnapshot(`
    <select
      class="uk-select"
      name=""
    />
  `);
});

// TODO
// test('loads and displays symbols', async () => {
//   
// })
