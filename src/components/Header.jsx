import { useEffect, useState } from 'react';
import './Header.css';
import logo from '../assets/react.svg';

const NAV_ITEMS = [
    { label: 'About', href: '#about' },
    { label: 'Mission', href: '#mission' },
    { label: 'People', href: '#voices' },
    { label: 'Support', href: '#support' },
    { label: 'Contacts', href: '#contacts' },
];

const LANGUAGES = ['DE', 'EN'];

const Header = ({ aboutTextRef }) => {
    const [scrolled, setScrolled] = useState(false);
    const [lang, setLang] = useState('EN');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 16);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
                window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleNavigation = (href) => {
        if (href === '#about' && aboutTextRef?.current) {
            const element = aboutTextRef.current;

            const elementPosition =
                element.getBoundingClientRect().top;

            const targetPosition =
                window.scrollY +
                elementPosition -
                50;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });

            return;
        }

        document.querySelector(href)?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    // Add a dedicated function to handle the Support button click
    const handleSupportClick = () => {
        window.open('https://www.paypal.com/donate?hosted_button_id=EXAMPLE', '_blank');
    };

    return (
        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
            <div className="header__inner">
                <div className="header__brand">
                    <img
                        src={logo}
                        alt="Logo"
                        className="header__logo-image"
                    />

                    <span className="header__wordmark">
                        Test
                    </span>
                </div>

                <div className="header__right">
                    <nav className="header__nav">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.href}
                                className="header__nav-item"
                                onClick={() => {
                                    if (item.label === 'Support') {
                                        handleSupportClick();
                                    } else {
                                        handleNavigation(item.href);
                                    }
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div
                        className="header__lang"
                        role="group"
                        aria-label="Language switch"
                    >
                        <span
                            className="header__lang-thumb"
                            style={{
                                transform:
                                    lang === 'EN'
                                        ? 'translateX(100%)'
                                        : 'translateX(0)',
                            }}
                        />

                        {LANGUAGES.map((code) => (
                            <button
                                key={code}
                                className={`header__lang-item ${
                                    lang === code
                                        ? 'header__lang-item--active'
                                        : ''
                                }`}
                                onClick={() => setLang(code)}
                            >
                                {code}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="header__hero">
                <p className="header__hero-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
        </header>
    );
};

export default Header;