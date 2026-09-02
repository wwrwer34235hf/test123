import { useCallback, useEffect, useRef, useState } from 'react';
import './Gallery.css';

const DEFAULT_IMAGES = [
    { src: 'https://picsum.photos/seed/gallery1/800/600', alt: 'Project view 1' },
    { src: 'https://picsum.photos/seed/gallery2/800/600', alt: 'Project view 2' },
    { src: 'https://picsum.photos/seed/gallery3/800/600', alt: 'Project view 3' },
    { src: 'https://picsum.photos/seed/gallery4/800/600', alt: 'Project view 4' },
    { src: 'https://picsum.photos/seed/gallery5/800/600', alt: 'Project view 5' },
    { src: 'https://picsum.photos/seed/gallery6/800/600', alt: 'Project view 6' },
];

const AUTOPLAY_DELAY = 4000;
const RESUME_DELAY = 5000;

const Gallery = ({ images = DEFAULT_IMAGES, autoplay = true }) => {
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const trackRef = useRef(null);
    const dragState = useRef({ dragging: false, startX: 0, scrollLeft: 0, moved: false });
    const resumeTimer = useRef(null);

    const goTo = useCallback(
        (next) => {
            const clamped = ((next % images.length) + images.length) % images.length;
            setIndex(clamped);
        },
        [images.length]
    );

    // Pauses autoplay, then schedules it to resume after RESUME_DELAY of no manual interaction.
    const pauseAndScheduleResume = useCallback(() => {
        setIsPaused(true);
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
        resumeTimer.current = setTimeout(() => {
            setIsPaused(false);
        }, RESUME_DELAY);
    }, []);

    useEffect(() => {
        return () => {
            if (resumeTimer.current) clearTimeout(resumeTimer.current);
        };
    }, []);

    const prev = useCallback(() => {
        pauseAndScheduleResume();
        goTo(index - 1);
    }, [goTo, index, pauseAndScheduleResume]);

    const next = useCallback(() => {
        pauseAndScheduleResume();
        goTo(index + 1);
    }, [goTo, index, pauseAndScheduleResume]);

    const handleDotClick = (i) => {
        pauseAndScheduleResume();
        goTo(i);
    };

    // Keep the track scrolled so the active slide is centered.
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        const slide = track.children[index];
        if (slide) {
            const target =
                slide.offsetLeft - track.clientWidth / 2 + slide.clientWidth / 2;
            track.scrollTo({ left: target, behavior: 'smooth' });
        }
    }, [index]);

    // Autoplay: advance to the next slide on a timer, unless paused.
    useEffect(() => {
        if (!autoplay || isPaused || images.length <= 1) return;
        const timer = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, AUTOPLAY_DELAY);
        return () => clearInterval(timer);
    }, [autoplay, isPaused, images.length]);

    // Keyboard navigation when the gallery has focus.
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') prev();
        if (e.key === 'ArrowRight') next();
    };

    // Drag / swipe support.
    const onPointerDown = (e) => {
        const track = trackRef.current;
        dragState.current = {
            dragging: true,
            moved: false,
            startX: e.clientX,
            scrollLeft: track.scrollLeft,
        };
        track.setPointerCapture?.(e.pointerId);
        pauseAndScheduleResume();
    };

    const onPointerMove = (e) => {
        const state = dragState.current;
        if (!state.dragging) return;
        const track = trackRef.current;
        const delta = e.clientX - state.startX;
        if (Math.abs(delta) > 4) state.moved = true;
        track.scrollLeft = state.scrollLeft - delta;
    };

    const onPointerUp = () => {
        const state = dragState.current;
        if (!state.dragging) return;
        state.dragging = false;

        const track = trackRef.current;
        if (!track) return;

        // Snap to the slide whose center is closest to the track's center.
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let closestDist = Infinity;
        Array.from(track.children).forEach((child, i) => {
            const childCenter = child.offsetLeft + child.clientWidth / 2;
            const dist = Math.abs(childCenter - trackCenter);
            if (dist < closestDist) {
                closestDist = dist;
                closest = i;
            }
        });
        setIndex(closest);
        pauseAndScheduleResume();
    };

    return (
        <section id="gallery" className="gallery">
            <div className="gallery__inner">

                <div className="gallery__stage">
                    <button
                        type="button"
                        className="gallery__arrow gallery__arrow--prev"
                        onClick={prev}
                        aria-label="Previous image"
                    >
                        ‹
                    </button>

                    <div
                        className="gallery__track"
                        ref={trackRef}
                        role="listbox"
                        tabIndex={0}
                        aria-label="Project gallery"
                        onKeyDown={handleKeyDown}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerLeave={onPointerUp}
                    >
                        {images.map((img, i) => (
                            <div
                                className={`gallery__slide${i === index ? ' gallery__slide--active' : ''}`}
                                key={img.src + i}
                                role="option"
                                aria-selected={i === index}
                            >
                                <img
                                    src={img.src}
                                    alt={img.alt || `Gallery image ${i + 1}`}
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        className="gallery__arrow gallery__arrow--next"
                        onClick={next}
                        aria-label="Next image"
                    >
                        ›
                    </button>
                </div>

                <div className="gallery__dots">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            type="button"
                            className={`gallery__dot${i === index ? ' gallery__dot--active' : ''}`}
                            onClick={() => handleDotClick(i)}
                            aria-label={`Go to image ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;