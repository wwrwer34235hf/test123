import { useState, useEffect } from 'react';
import './Directions.css';

const DIRECTIONS = [
    {
        id: 'holidays',
        icon: '/test123/src/assets/balloons-balloon-svgrepo-com.svg',
        title: 'Feiertage',
        shortText: 'Organisation und Begleitung von Feiertagen und Feierlichkeiten.',
        fullText:
            'Wir organisieren und begleiten unterschiedliche Feiertage und Feierlichkeiten für Kinder und Familien. Von der Planung bis zur Durchführung sorgen wir für ein unvergessliches Erlebnis mit Spielen, Musik und kreativen Aktivitäten für alle Altersgruppen.',
    },
    {
        id: 'clubs',
        icon: '/test123/src/assets/gui-palette-svgrepo-com.svg',
        title: 'Kreise',
        shortText: 'Kreative und thematische Kreise für unterschiedliche Interessen.',
        fullText:
            'Unsere Kreise bieten kreative und thematische Aktivitäten für unterschiedliche Interessen an — von Malerei und Handwerk bis hin zu naturwissenschaftlichen Experimenten. Jede Gruppe wird von erfahrenen Betreuern geleitet und fördert die individuelle Entwicklung.',
    },
    {
        id: 'german',
        icon: '/test123/src/assets/graduation-cap-svgrepo-com.svg',
        title: 'Deutschunterricht',
        shortText: 'Deutschkurse für Erwachsene auf unterschiedlichen Niveaus.',
        fullText:
            'Wir bieten strukturierten Deutschunterricht für Erwachsene an, angepasst an unterschiedliche Sprachniveaus — von Anfängern bis Fortgeschrittenen. Der Unterricht kombiniert Grammatik, Konversation und praktische Übungen für den Alltag.',
    },
    {
        id: 'youth',
        icon: '/test123/src/assets/raising-hands-light-skin-tone-svgrepo-com.svg',
        title: 'Jugend',
        shortText: 'Aktivitäten und Projekte speziell für Jugendliche.',
        fullText:
            'Für Jugendliche bieten wir eine Vielzahl an Aktivitäten und Projekten an, die soziale Kompetenzen stärken, Kreativität fördern und Raum für Austausch schaffen. Regelmäßige Treffen und Workshops gehören zum festen Programm.',
    },
    {
        id: 'adults',
        icon: '/test123/src/assets/people-nearby-svgrepo-com.svg',
        title: 'Erwachsene',
        shortText: 'Unterstützung und Programme für Erwachsene.',
        fullText:
            'Wir bieten Erwachsenen Unterstützung in Form von Beratung, Workshops und gemeinschaftlichen Programmen an. Ziel ist es, Integration, persönliche Entwicklung und den Aufbau eines stabilen sozialen Netzwerks zu fördern.',
    },
    {
        id: 'music',
        icon: '/test123/src/assets/music-svgrepo-com.svg',
        title: 'Musikgruppe',
        shortText: 'Gemeinsames Musizieren in einer aktiven Musikgruppe.',
        fullText:
            'Unsere Musikgruppe bringt Menschen jeden Alters zusammen, um gemeinsam zu musizieren. Regelmäßige Proben, Auftritte bei Veranstaltungen und der Austausch mit anderen musikalischen Gruppen stehen im Mittelpunkt.',
    },
];

const Directions = () => {
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setActiveItem(null);
        };
        if (activeItem) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [activeItem]);

    return (
        <section id="mission" className="directions">
            <div className="directions__inner">
                <h2 className="directions__title">Unsere Richtungen</h2>

                <div className="directions__grid">
                    {DIRECTIONS.map((item) => (
                        <div key={item.id} className="direction-card">
                            <div className="direction-card__corner">
                                <img
                                    src={item.icon}
                                    alt={item.title}
                                    className="direction-card__icon"
                                />
                            </div>

                            <h3 className="direction-card__title">{item.title}</h3>
                            <p className="direction-card__text">{item.shortText}</p>

                            <button
                                className="direction-card__more"
                                onClick={() => setActiveItem(item)}
                            >
                                mehr...
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {activeItem && (
                <div
                    className="directions-modal__overlay"
                    onClick={() => setActiveItem(null)}
                >
                    <div
                        className="directions-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="directions-modal__close"
                            onClick={() => setActiveItem(null)}
                            aria-label="Schließen"
                        >
                            ×
                        </button>

                        <h3 className="directions-modal__title">{activeItem.title}</h3>
                        <p className="directions-modal__text">{activeItem.fullText}</p>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Directions;