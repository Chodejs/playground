import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <section style={{ textAlign: 'center', color: 'var(--clr-text-muted)' }}>
            <h1 style={{ fontSize: '3rem', color: 'var(--clr-accent)' }}>404</h1>
            <p>Darling, you seem to be lost.</p>
            <Link to="/" style={{ marginTop: '1rem', display: 'inline-block' }}>
                Return to Safety
            </Link>
        </section>
    );
}