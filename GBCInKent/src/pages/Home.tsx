import { useState, useEffect } from "react";
import "./pageStyling/Home.css";
import { Link } from "react-router-dom";

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
        }, 10000);

        return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <>
            <div className="home-container">
                <section className="introduction-section">
                    <div className="content-wrapper">
                        {/* Welcome Card */}
                        <div className="welcome-card">
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
                                        <h3 style={{marginBottom: '1rem'}} className="highlight-verse">{dailyVerse.reference}</h3>
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
                        <div className="auto-carousel">
                            <div className="carousel" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
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
                    <div className="verse-heading">
                        <h1 className="highlight-verse" style={{color: 'hsl(0, 0%, 20%'}}>1 John 5:12</h1>
                        <p className="footer-verse">
                            "He that hath the Son hath life; and he that hath not the Son of God hath not life."
                        </p>
                    </div>

                    {/* Social Media Links */}
                    <div className="socials-intro-footer">
                        <a className="social-link facebook-link-1" href="https://www.facebook.com/gbcinkent/" target="_blank" rel="noreferrer">
                            <img src={FacebookLogo} alt="Facebook" />
                        </a>
                        <a className="social-link youtube-link-1" href="https://www.youtube.com/@gbcinkent4118" target="_blank" rel="noreferrer">
                            <img src={YoutubeLogo} alt="YouTube" />
                        </a>
                    </div>
                </section>
            </div>
            <div className="welcome-container">
                <section className="context-welcome-container">
                    <h1>Welcome to Galilee Baptist Church!</h1>
                    <h2>A Baptist Church located in Kent, Washington.</h2>
                    <iframe id="googlemaps" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d496.96003131562924!2d-122.1875860613005!3d47.415471122906844!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54905da6f3554fc3%3A0x2dfe7de2bf5e973a!2sCascade%20Vista%20Baptist%20School!5e1!3m2!1sen!2sus!4v1710387638259!5m2!1sen!2sus" width="400" height="300" loading="lazy"></iframe>
                    <Link to="/about"><button>Read More About Us!</button></Link>
                </section>
                <section className="3d-container">
                    
                </section>
            </div>
        </>
    );
}
