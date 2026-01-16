import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header Component', () => {
    it('renders the application title', () => {
        const stats = { total: 5, completed: 2, pending: 3 };
        render(<Header stats={stats} />);

        expect(screen.getByText(/Task Manager Pro/i)).toBeDefined();
    });

    it('displays correct statistics', () => {
        const stats = { total: 10, completed: 4, pending: 6 };
        render(<Header stats={stats} />);

        expect(screen.getByText('10')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
        expect(screen.getByText('6')).toBeDefined();
    });
});
