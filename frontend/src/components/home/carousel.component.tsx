import React from 'react'
import "../../../node_modules/flickity/dist/flickity.min.css";
import styles from '../../styles/Flickity.module.scss'
import Flickity from 'react-flickity-component'

const Carousel = () => {

    const flickityOptions = {
        initialIndex: 0,
        freeScroll: false,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        groupCells: 2,
        autoPlay: 5000,
        pauseAutoPlayOnHover: true,
        fullscreen: false,
        lazyLoad: true,
        fade: true,
        dragThreshold: 10
    }

    const flickityOptions2 = {
        initialIndex: 0,
        freeScroll: false,
        pageDots: true,
        wrapAround: true,
        groupCells: 1,
        autoPlay: 5000,
        fullscreen: false,
        lazyLoad: true,
        fade: true,
        dragThreshold: 5
    }

    return (
        <div>
            <div className={styles.carouselDesktop}>
                <Flickity
                    className={'carousel'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityOptions} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                >
                    <img src="/images/electronics-carousal.jpg" />
                    <img src="/images/beauty-carousal.jpg" />
                    <img src="/images/toys-carousal.jpg" />
                </Flickity>
            </div>
            <div className={styles.carouselMobile}>
                <Flickity
                    className={'carousel carousel-mobile'} // default ''
                    elementType={'div'} // default 'div'
                    options={flickityOptions2} // takes flickity options {}
                    disableImagesLoaded={false} // default false
                    reloadOnUpdate // default false
                    static // default false
                >
                    <img src="/images/electronics-carousal-mobile.jpg" />
                    <img src="/images/beauty-carousal-mobile.jpg" />
                    <img src="/images/toys-carousal-mobile.jpg" />
                </Flickity>
            </div>
        </div>
    )
}

export default Carousel
