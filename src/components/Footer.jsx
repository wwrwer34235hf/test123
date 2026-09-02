import './Footer.css';

const CONTACT_ITEMS = [
    { label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com' },
    { label: 'Phone', value: '+1 234 567 890', href: 'tel:+1234567890' },
    { label: 'Address', value: '123 Example St, City, Country' },
];

const SOCIAL_LINKS = [
    { label: 'Instagram', href: '#' },
    { label: 'Facebook', href: '#' },
    { label: 'Twitter', href: '#' },
];

const Footer = () => {
    return (
        <footer id="contacts" className="footer">
            <div className="footer__inner">

                <div className="footer__eyebrow">
                    <span className="footer__eyebrow-number">05</span>
                    <span className="footer__eyebrow-line" />
                    <span className="footer__eyebrow-label">Contacts</span>
                </div>

                <h2 className="footer__title">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </h2>

                <div className="footer__grid">
                    <div className="footer__contacts">
                        {CONTACT_ITEMS.map((item) => (
                            <div key={item.label} className="footer__contact-item">
                                <span className="footer__contact-label">
                                    {item.label}
                                </span>

                                {item.href ? (
                                    <a href={item.href} className="footer__contact-value">
                                        {item.value}
                                    </a>
                                ) : (
                                    <span className="footer__contact-value">
                                        {item.value}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="footer__social">
                        {SOCIAL_LINKS.map((link) => (
                            <a key={link.label} href={link.href} className="footer__social-link">
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="footer__bottom">
                    <span className="footer__copy">
                        © {new Date().getFullYear()} Test. All rights reserved.
                    </span>
                </div>

            </div>
        </footer>
    );
};

export default Footer;