import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest'; // Import 'vi' for mocking
import Home from './Home';

// We mock the hook module so it doesn't trigger real state updates
vi.mock('../hooks/useFetch', () => ({
    useFetch: () => ({
        data: null,
        loading: false, 
        error: null,
        refetch: vi.fn() // A fake function that does nothing
    })
}));

describe('Home Page', () => {
  it('renders the welcome message', () => {
    render(<Home />);
    
    // Check if the h1 exists
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Welcome Home/i);
    
    // Check if the paragraph exists
    expect(screen.getByText(/starting point/i)).toBeInTheDocument();
  });
});