import React from 'react';
import './Header.css';
import img1 from '../../resources/images/joshua-rawson-harris-YNaSz-E7Qss-unsplash.jpg';
import img2 from '../../resources/images/brooke-lark-W1B2LpQOBxA-unsplash.jpg';
import img3 from '../../resources/images/freestocks-VFrcRtEQKL8-unsplash.jpg';
import img4 from '../../resources/images/justin-lim-JKjBsuKpatU-unsplash.jpg';

const Header = () => {
    let timeout;
    let slideIndex = 0;

    const handleClick = ({ target }) => {
        if (target.id === 'dot1') {
            slideIndex = 0;
        }
        else if (target.id === 'dot2') {
            slideIndex = 1;
        }
        else if (target.id === 'dot3') {
            slideIndex = 2;
        }
        else if (target.id === 'dot4') {
            slideIndex = 3;
        }
        clearTimeout(timeout);
        showSlides();
    };
    
    const showSlides = () => {
        let i;
        const slides = document.getElementsByClassName('Header__slide');
        const dots = document.getElementsByClassName('Header__dots');
        if (slides.length > 0 && dots.length > 0) {
            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = 'none';
            }
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(' -active', '');
            }
            slides[slideIndex-1].style.display = 'block';
            dots[slideIndex-1].className += ' -active';
        }
        timeout = setTimeout(showSlides, 5000);
    };

    showSlides();

    return (
        <header className="Header">
            <div className="Header__slides">
                <img id="img1" className="Header__slide" src={img1} alt="" style={{display:'block'}}/>
                <img id="img2" className="Header__slide" src={img2} alt="" />
                <img id="img3" className="Header__slide" src={img3} alt="" />
                <img id="img4" className="Header__slide" src={img4} alt="" />
            </div>
            <div className="Header__dots__nav">
                <span id="dot1" className="Header__dots -active" onClick={handleClick}></span>
                <span id="dot2" className="Header__dots" onClick={handleClick}></span>
                <span id="dot3" className="Header__dots" onClick={handleClick}></span>
                <span id="dot4" className="Header__dots" onClick={handleClick}></span>
            </div>
        </header>
    );
}

export default Header;