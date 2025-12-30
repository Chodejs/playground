import { NavLink } from 'react-router-dom';
import { devLog } from '../../Cfunc/app';

export default function Nav() {
    const links = [
        { id: 1, title: 'Home', path: '/' },
        { id: 2, title: 'Docs', path: '/docs' },
        { id: 3, title: 'Contact', path: '/contact' },
    ];

    return (
        <nav className="bg-surface border-b border-border py-2">
            <ul className="flex justify-center gap-8">
                {links.map(link => (
                    <li key={link.id}>
                        <NavLink 
                            to={link.path} 
                            className={({ isActive }) => 
                                /* logic for active state using Tailwind colors */
                                isActive 
                                    ? "text-primary font-semibold no-underline" 
                                    : "text-text-muted font-semibold hover:text-primary transition-colors"
                            }
                        >
                            {link.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}