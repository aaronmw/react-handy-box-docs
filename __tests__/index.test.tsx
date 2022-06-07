import Home from '@/pages/index';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Launch your project to the entire Cosmos/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
