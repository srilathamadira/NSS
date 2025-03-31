import LightGallery from 'lightgallery/react';
import '../Gallery.css';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';
import 'lightgallery/css/lg-rotate.css';


// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay'
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import lgRotate from 'lightgallery/plugins/rotate';

const images = [
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410934/g1_nyvnsz.jpg", alt: "Flag of India" },
    { src: "shttps://res.cloudinary.com/dpizcjqcb/image/upload/v1743410983/g4_ylkdc7.jpg", alt: "2" },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410983/g3_nhiehk.jpg", alt: "3" },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410983/g6_ffeeuu.jpg", alt: "4", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410983/g7_ie3zax.jpg", alt: "5", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410983/g7_ie3zax.jpg", alt: "6", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410983/g5_ufapuc.jpg", alt: "7", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410984/g8_wrigoy.jpg", alt: "8", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410984/g9_mtk9j8.jpg", alt: "9", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410984/g12_mrejcp.jpg", alt: "10", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410984/g11_g8qliy.jpg", alt: "11", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410984/g10_i1zmsk.jpg", alt: "12", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410984/g13_emkyb3.jpg", alt: "13", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410985/g2_clitsf.jpg", alt: "14", },
    { src: "https://res.cloudinary.com/dpizcjqcb/image/upload/v1743410985/g1_wmcmih.jpg", alt: "15", },
   
]

export default function Gallery() {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div className="App">
            <LightGallery
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgRotate, lgShare]}
            >

                {images.map((image, index) => {
                    return (
                        <a href={image.src} key={index}>
                            <img className="galleryImg" alt={image.alt} src={image.src} />
                        </a>
                    )
                })}


            </LightGallery>
        </div>
    );
}
