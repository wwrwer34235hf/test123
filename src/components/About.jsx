import { forwardRef } from 'react';
import './About.css';

const About = forwardRef((props, ref) => {
    return (
        <section id="about" className="about">
            <div className="about__inner">

                <div className="about__eyebrow">
                    <div
                        ref={ref}
                        className="about__scroll-target"
                    >
                        <span className="about__eyebrow-number">
                            01
                        </span>

                        <span className="about__eyebrow-line" />

                        <span className="about__eyebrow-label">
                            About project
                        </span>
                    </div>
                </div>

                <h2 className="about__title">
                    Lorem ipsum dolor sit amet. Consectetur
                    adipiscing elit sed do eiusmod
                </h2>

                <div className="about__content">
                    <p className="about__text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur.
                    </p>

                    <p className="about__text">
                        Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium.
                    </p>

                    <p className="about__text">
                        Totam rem aperiam, eaque ipsa quae ab illo inventore
                        veritatis et quasi architecto beatae vitae dicta sunt
                        explicabo. Nemo enim ipsam voluptatem quia voluptas sit
                        aspernatur aut odit aut fugit.
                    </p>
                </div>

            </div>
        </section>
    );
});

export default About;