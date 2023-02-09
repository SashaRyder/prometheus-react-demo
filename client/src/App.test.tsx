import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders time loading', () => {
  render(<App />);
  const loadingElement = screen.getByText(/loading latest epoch from server/i);
  expect(loadingElement).toBeInTheDocument();
});

test('renders metrics loading', () => {
  render(<App />);
  const loadingElement = screen.getByText(/loading latest metrics from server!/i);
  expect(loadingElement).toBeInTheDocument();
});

test('renders network', async () => {
  render(<App />);
  const errorElements = await screen.findAllByText(/loading latest metrics from server!/i);
  expect(errorElements).toHaveLength(2);
});