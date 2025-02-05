import { useState, useEffect } from "react";
import "./pageStyling/Home.css";

// Importing logos
import FacebookLogo from "../assets/icons/FacebookLogo.png";
import YoutubeLogo from "../assets/icons/YoutubeLogo.png";

// Importing carousel images
import Image1 from '../assets/carouselImg/1146713.png';
import Image2 from '../assets/carouselImg/667069.jpg';
import Image3 from '../assets/carouselImg/6157056.jpg';

const images = [Image1, Image2, Image3];

export default function Home() {
    const [dailyVerse, setDailyVerse] = useState<{ text: string; reference: string } | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [verseLoaded, setVerseLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const totalSlides = 3;

    useEffect(() => {
        const fetchVerse = async () => {
            try {
                const response = await fetch("https://beta.ourmanna.com/api/v1/get/?format=json");
                const data = await response.json();
                setDailyVerse({
                    text: data.verse.details.text,
                    reference: data.verse.details.reference,
                });
                setVerseLoaded(true);
            } catch (error) {
                console.error("Error fetching daily verse:", error);
            }
        };

        fetchVerse();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className="home-container entrance-anim">
            <section className="introduction-section">
                <div className="content-wrapper">
                    {/* Welcome Card */}
                    <div className="welcome-card entrance-anim">
                        <section className="intro-card-header">
                            <h2>Welcome to Galilee Baptist Church!</h2>
                            <hr className="gold-divider" />
                        </section>

                        <section className="intro-card-body">
                            <h2 className="volunteer-title">Come Volunteer!</h2>
                            <h3 className="volunteer-subtitle">Please contact:</h3>
                            <h4 className="contact-email">office@gbcinkent.com</h4>
                            <div className="verse-section">
                                <p className="verse-text">
                                    "As every man hath received the gift, even so minister the same one to another, as good stewards of the manifold grace of God."
                                </p>
                                <h3 className="highlight-verse">1 Peter 4:10</h3>
                            </div>
                            <hr className="gold-divider" />
                        </section>

                        <section className={`intro-card-daily-verse ${verseLoaded ? "fade-in" : ""}`}>
                            <h2>Daily Verse</h2>
                            {dailyVerse ? (
                                <>
                                    <p className="bold-verse">"{dailyVerse.text}"</p>
                                    <h3 className="highlight-verse">{dailyVerse.reference}</h3>
                                </>
                            ) : (
                                <p>Loading daily verse...</p>
                            )}
                        </section>
                        <section className="intro-card-give">
                            <hr className="gold-divider" />
                            <h2 className="intro-give-title">Give Online</h2>
                            <a href="/" className="give-button-link"><button className="intro-give-button">Give</button></a>
                        </section>
                    </div>

                    {/* Carousel */}
                    <div className="auto-carousel entrance-anim">
                        <div className="carousel">
                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Church Event"
                                    className={index === currentIndex ? "active" : ""}
                                />
                            ))}
                        </div>
                        <button className="prev-arrow" onClick={prevSlide}>‹</button>
                        <button className="next-arrow" onClick={nextSlide}>›</button>
                    </div>
                </div>

                {/* Footer Verse Section */}
                <div className="verse-heading entrance-anim">
                    <h1 className="highlight-verse" style={{color: 'hsl(0, 0%, 20%'}}>1 John 5:12</h1>
                    <p className="footer-verse">
                        "He that hath the Son hath life; and he that hath not the Son of God hath not life."
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="socials-intro-footer entrance-anim">
                    <a className="social-link facebook-link-1" href="https://www.facebook.com/gbcinkent/" target="_blank" rel="noreferrer">
                        <img src={FacebookLogo} alt="Facebook" />
                    </a>
                    <a className="social-link youtube-link-1" href="https://www.youtube.com/@gbcinkent4118" target="_blank" rel="noreferrer">
                        <img src={YoutubeLogo} alt="YouTube" />
                    </a>
                </div>
            </section>
        </div>
    );
}
