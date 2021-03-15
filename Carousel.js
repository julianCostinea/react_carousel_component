import React, { useEffect } from 'react';
import ArrowLeft from './arrowLeft';
import ArrowRight from './arrowRight';

import './Carousel.css';

const Carousel = React.memo((props) => {
    useEffect(() => {
        const track = document.querySelector('.carousel__track');
        const slides = Array.from(track.children);
        const slideWidth = slides[0].getBoundingClientRect().width;

        // slides[0].style.left = 0;
        // slides[1].style.left = slideWidth + 'px';
        // slides[2].style.left = slideWidth * 2 + 'px';

        const setSlidePosition = (slide, index) => {
            slide.style.left = slideWidth * index + 'px';
        }

        slides.forEach(setSlidePosition);

        const moveToSlide = (track, currentSlide, targetSlide) => {
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        }

        const updateDots = (currentDot, targetDot)=>{
            currentDot.classList.remove('current-slide');
            targetDot.classList.add('current-slide');
        }

        const hideShowArrows = (slides, prevButton, nextButton, targetIndex)=>{
            if (targetIndex === 0) {
                prevButton.classList.add('is-hidden');
                nextButton.classList.remove('is-hidden');
            } else if (targetIndex === slides.length - 1) {
                nextButton.classList.add('is-hidden');
                prevButton.classList.remove('is-hidden');
            } else{
                prevButton.classList.remove('is-hidden');
                nextButton.classList.remove('is-hidden');
            }
        }

        //next Slide
        const nextButton = document.querySelector('.carousel__button--right');
        nextButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;
            const currentDot = dotsNav.querySelector('.current-slide');
            const nextDot = currentDot.nextElementSibling;
            const nextIndex = slides.findIndex(slide=>slide === nextSlide);

            moveToSlide(track, currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
            hideShowArrows(slides, prevButton, nextButton, nextIndex);
        })

        //prev Slide
        const prevButton = document.querySelector('.carousel__button--left');
        prevButton.addEventListener('click', e => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;
            const currentDot = dotsNav.querySelector('.current-slide');
            const prevDot = currentDot.previousElementSibling;
            const prevIndex = slides.findIndex(slide=>slide === prevSlide);

            moveToSlide(track, currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
            hideShowArrows(slides, prevButton, nextButton, prevIndex);
        })

        //indicator functionality
        const dotsNav = document.querySelector('.carousel__nav');
        const dots = Array.from(dotsNav.children);

        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');
            if (!targetDot) return;

            const currentSlide = track.querySelector('.current-slide');
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(track, currentSlide, targetSlide);

            updateDots(currentDot, targetDot);

            hideShowArrows(slides, prevButton, nextButton, targetIndex);
        });

        //maybe add automatic function here, if reused at a future time
    });

    return (
        <div className="carousel">
            <button className="carousel__button carousel__button--left is-hidden">
                {<ArrowLeft />}
            </button>
            <div className="carousel__track-container">
                <ul className="carousel__track">
                    <li className="carousel__slide current-slide">
                        {props.slide1}
                    </li>
                    <li className="carousel__slide">
                        {props.slide2}
                    </li>
                    <li className="carousel__slide">
                        {props.slide3}
                    </li>
                </ul>
            </div>
            <button className="carousel__button carousel__button--right">
                {<ArrowRight />}
            </button>

            <div className="carousel__nav">
                <button className="carousel__indicator current-slide"></button>
                <button className="carousel__indicator"></button>
                <button className="carousel__indicator"></button>
            </div>
        </div>
    );
});

export default Carousel;