// source: https://primereact.org/galleria/#advanced

import { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { Galleria } from 'primereact/galleria';
import { classNames } from 'primereact/utils';
import './Gallery.css';

export default function GalleryReact({images}) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showThumbnails, setShowThumbnails] = useState(false);
    const [isAutoPlayActive, setAutoPlayActive] = useState(false);
    const [isFullScreen, setFullScreen] = useState(false);
    
    const galleria = useRef(null);

    const responsiveOptions = [
        { breakpoint: '1024px', numVisible: 5 },
        { breakpoint: '960px', numVisible: 4 },
        { breakpoint: '768px', numVisible: 3 },
        { breakpoint: '560px', numVisible: 2 }
    ];


    useEffect(() => {
        bindDocumentListeners();
        return () => unbindDocumentListeners();
    },[]);

    useEffect(() => {
        setAutoPlayActive(galleria.current.isAutoPlayActive())
    },[isAutoPlayActive]);

    const onItemChange = (event) => {
        setActiveIndex(event.index)
    }

    const toggleFullScreen = () => {
        if (isFullScreen) {
            closeFullScreen();
        }
        else {
            openFullScreen();
        }
    }

    const onFullScreenChange = () => {
        setFullScreen(prevState => !prevState )
    }

    const openFullScreen = () => {
        let elem = galleria.current?.getElement();
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
        else if (elem.mozRequestFullScreen) { /* Firefox */
            elem.mozRequestFullScreen();
        }
        else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
            elem.webkitRequestFullscreen();
        }
        else if (elem.msRequestFullscreen) { /* IE/Edge */
            elem.msRequestFullscreen();
        }
    }

    const closeFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }

    const bindDocumentListeners = () => {
        document.addEventListener("fullscreenchange", onFullScreenChange);
        document.addEventListener("mozfullscreenchange", onFullScreenChange);
        document.addEventListener("webkitfullscreenchange", onFullScreenChange);
        document.addEventListener("msfullscreenchange", onFullScreenChange);
    }

    const unbindDocumentListeners = () => {
        document.removeEventListener("fullscreenchange", onFullScreenChange);
        document.removeEventListener("mozfullscreenchange", onFullScreenChange);
        document.removeEventListener("webkitfullscreenchange", onFullScreenChange);
        document.removeEventListener("msfullscreenchange", onFullScreenChange);
    }

    const thumbnailTemplate = (item) => {
        return (
            <div>
                <img src={item.image} alt={item.alt} style={{ display: 'block' }} />
            </div>
        );
    }

    const itemTemplate = (item) => {
        if (isFullScreen) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <img src={item.image} alt={item.alt} style={{ maxWidth: '100%', height: 'auto' }} />
                    <div className="caption">{item.caption}</div>
                </div>
            );
        }

        return (
            <div >
                <img src={item.image} alt={item.alt} style={{ width: '100%', display: 'block' }} />
            </div>
        );
    }

    const renderFooter = () => {
        let autoPlayClassName = classNames('pi', {
            'pi-play': !isAutoPlayActive,
            'pi-pause': isAutoPlayActive
        });

        let fullScreenClassName = classNames('pi', {
            'pi-window-maximize': !isFullScreen,
            'pi-window-minimize': isFullScreen
        });

        return (
            <div className="custom-galleria-footer">
                <Button icon="pi pi-list" onClick={() => setShowThumbnails(prevState => !prevState)} />
                <Button icon={autoPlayClassName} onClick={() => {
                    if (!isAutoPlayActive) {
                        galleria.current.startSlideShow();
                        setAutoPlayActive(true);
                    } else {
                        galleria.current.stopSlideShow();
                        setAutoPlayActive(false);
                    }
                }} />
                {images && (
                    <span className="title-container">
                        <span>{activeIndex + 1}/{images.length}</span>
                        <span className="title">{images[activeIndex].alt}</span>
                    </span>
                )}
                <Button icon={fullScreenClassName} onClick={() => toggleFullScreen()} className="fullscreen-button" />
            </div>
        );
    }

    const footer = renderFooter();
    const galleriaClassName = classNames('custom-galleria', {
        'fullscreen': isFullScreen
    });

    return (
        <div style={{ marginBottom: '2em' }}>
            <Galleria
                ref={galleria}
                value={images}
                activeIndex={activeIndex}
                onItemChange={onItemChange}
                showThumbnails={showThumbnails}
                showItemNavigators
                showItemNavigatorsOnHover
                numVisible={5}
                circular
                transitionInterval={3000}
                responsiveOptions={responsiveOptions}
                item={itemTemplate}
                thumbnail={thumbnailTemplate}
                footer={footer}
                className={galleriaClassName}
            />
        </div>
    );
}
