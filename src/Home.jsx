import './App.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Home() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    // Observe all sections with fade-in-section class
    const sections = document.querySelectorAll('.fade-in-section')
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])
  const handleScrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      // Add visual feedback to clicked button
      const buttons = document.querySelectorAll('.nav button, .cta')
      buttons.forEach(btn => btn.classList.remove('active'))
      
      const clickedButton = Array.from(buttons).find(btn => 
        btn.textContent.toLowerCase().includes(id.toLowerCase()) || 
        (id === 'booking' && btn.textContent.toLowerCase().includes('book'))
      )
      if (clickedButton) {
        clickedButton.classList.add('active')
        setTimeout(() => clickedButton.classList.remove('active'), 1000)
      }

      // Add temporary slide-in animation on target
      el.classList.remove('slide-in')
      // force reflow to restart animation if the class was present
      // eslint-disable-next-line no-unused-expressions
      el.offsetHeight
      el.classList.add('slide-in')
      el.addEventListener('animationend', () => el.classList.remove('slide-in'), { once: true })

      // Smooth scroll with easing
      const targetPosition = el.offsetTop - 100
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      const duration = 1000
      let start = null

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
      }

      function animation(currentTime) {
        if (start === null) start = currentTime
        const timeElapsed = currentTime - start
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easeInOutCubic(progress)
        
        window.scrollTo(0, startPosition + distance * ease)
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        }
      }

      requestAnimationFrame(animation)
    }
  }

  return (
    <div className="restaurant-home">
      <header className="site-header">
        <div className="container">
          <div className="brand">La Bella Phuket</div>
          <nav className="nav">
            <button onClick={() => handleScrollTo('home')}>Home</button>
            <button onClick={() => handleScrollTo('about')}>About</button>
            <button onClick={() => navigate('/menu')}>Menu</button>
            <button onClick={() => handleScrollTo('offers')}>Promotions</button>
            <button onClick={() => handleScrollTo('booking')}>Booking</button>
          </nav>
          <button className="cta" onClick={() => handleScrollTo('booking')}>BOOK NOW</button>
          <button className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <button onClick={() => { handleScrollTo('home'); setMobileMenuOpen(false); }}>Home</button>
          <button onClick={() => { handleScrollTo('about'); setMobileMenuOpen(false); }}>About</button>
          <button onClick={() => { navigate('/menu'); setMobileMenuOpen(false); }}>Menu</button>
          <button onClick={() => { handleScrollTo('offers'); setMobileMenuOpen(false); }}>Promotions</button>
          <button onClick={() => { handleScrollTo('booking'); setMobileMenuOpen(false); }}>Booking</button>
          <button className="mobile-cta" onClick={() => { handleScrollTo('booking'); setMobileMenuOpen(false); }}>BOOK NOW</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container hero-inner">
          <div className="hero-image">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80" alt="Restaurant interior" />
          </div>
          <div className="hero-content">
            <span className="eyebrow">Beachfront Dining · Est. 2012</span>
            <h1>La Bella Phuket | Italian & Cafe Bistro</h1>
            <div className="accent-line" />
            <h2>Savor One of the Best Beachfront Restaurant Experiences</h2>
            <p>
              Welcome to La Bella Phuket, a dining destination offering authentic flavors, 
              mouthwatering steaks, and globally inspired dishes. Our beachfront restaurant 
              offers a relaxed ambiance and stunning sunset views.
            </p>
            <ul className="highlights">
              <li>Wood‑fired pizzas and freshly made pasta</li>
              <li>Premium Wagyu & Black Angus steaks</li>
              <li>Curated wines and signature cocktails</li>
            </ul>
            <div className="hero-cta">
              <button className="primary-btn" onClick={() => handleScrollTo('booking')}>BOOK NOW</button>
              <button className="secondary-btn" onClick={() => navigate('/menu')}>VIEW MENU</button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about fade-in-section" id="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Have the Best Pizza and Steak Experience</h2>
              <p>
                At La Bella Phuket, we offer more than just a meal—we create an unforgettable dining experience. 
                Located conveniently on the beachfront, our restaurant combines stunning ocean views with an 
                elegant yet relaxed atmosphere.
              </p>
              <p>
                Whether for a casual gathering or a special celebration, our impeccable service and exceptional 
                cuisine provide the perfect setting for any occasion. Enjoy a memorable culinary journey where 
                every bite is crafted with care and dedication to excellence.
              </p>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" alt="Restaurant dining area" />
            </div>
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="promotions fade-in-section" id="offers">
        <div className="container">
          <h2>Explore Our Exclusive Offers</h2>
          <div className="promo-grid">
            <div className="promo-card">
              <h3>Pizza Day</h3>
              <p className="promo-date">Every Wednesday, All Day</p>
              <p>Order any 2 Pizzas from our menu and Get 1 Free</p>
              <p className="promo-note">Book ahead to get the promotion</p>
              <button className="promo-btn">Book Now</button>
            </div>
            <div className="promo-card">
              <h3>Pasta Day</h3>
              <p className="promo-date">Every Tuesday, All Day</p>
              <p>Order any 2 Pastas from our menu and Get 1 Free</p>
              <p className="promo-note">Book ahead to get the promotion</p>
              <button className="promo-btn">Book Now</button>
            </div>
            <div className="promo-card">
              <h3>Steak Night & Wine</h3>
              <p className="promo-date">Every Day</p>
              <p>Order any steak, and enjoy 15% OFF any bottle of wine</p>
              <p className="promo-note">Book ahead to get the promotion</p>
              <button className="promo-btn">Book Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews fade-in-section" id="reviews">
        <div className="container">
          <div className="reviews-header">
            <h2>What Our Guests Say</h2>
            <a
              href="https://share.google/x6o3vHNZONwarq7KZ"
              target="_blank"
              rel="noopener noreferrer"
              className="reviews-google-btn"
            >
              ★ View more on Google
            </a>
          </div>
          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">Absolutely loved the food and the beachfront ambience. The truffle pizza was a standout!</p>
              <div className="review-meta">
                <span className="reviewer">Priya</span>
                <span className="date">· 2 weeks ago</span>
              </div>
            </div>
            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">Great service and cocktails. We watched the sunset—perfect evening. Highly recommend!</p>
              <div className="review-meta">
                <span className="reviewer">James</span>
                <span className="date">· 1 month ago</span>
              </div>
            </div>
            <div className="review-card">
              <div className="review-stars">★★★★☆</div>
              <p className="review-text">Delicious pastas and friendly staff. Will definitely come back with friends.</p>
              <div className="review-meta">
                <span className="reviewer">Natalie</span>
                <span className="date">· 3 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking / Contact Section */}
      <section className="booking fade-in-section" id="booking">
        <div className="container">
          <div className="contact-section">
            <div className="contact-whatsapp">
              <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="wa-link">
                <svg height="34" width="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" style={{marginRight:'10px'}}>
                  <circle cx="17" cy="17" r="17" fill="#25D366"/>
                  <path d="M24.575 20.428c-.384-.192-2.276-1.112-2.627-1.24-.352-.128-.608-.192-.864.192-.256.384-.992 1.24-1.216 1.488-.224.256-.448.288-.832.096-.384-.192-1.62-.596-3.085-1.902-1.14-1.016-1.91-2.272-2.134-2.656-.224-.384-.024-.592.168-.784.172-.17.384-.448.576-.672.196-.224.262-.384.395-.64.133-.256.066-.48-.033-.672-.098-.192-.864-2.08-1.184-2.848-.31-.747-.626-.646-.857-.658-.22-.012-.473-.014-.726-.014-.253 0-.664.096-1.01.448-.347.352-1.328 1.297-1.328 3.168 0 1.87 1.36 3.67 1.548 3.921.188.251 2.678 4.095 6.49 5.585C20.18 25.003 21.062 25 21.898 25c1.545 0 2.487-1.035 2.734-1.513.247-.478.247-.885.17-.975-.076-.09-.353-.222-.737-.415z" fill="#fff"/>
                </svg>
                <strong>Contact us for bookings and queries:</strong>
                <span className="wa-number">+1 (555) 123‑4567</span>
              </a>
            </div>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.123456789!2d98.123456!3d7.123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30503bfce204d6ed%3A0x7a70badc6fbaa1b1!2sLa%20Bella%20Phuket%20%7C%20Italian%20and%20Cafe%20Bistro!5e0!3m2!1sen!2sth!4v1234567890123!5m2!1sen!2sth"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="La Bella Phuket Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>La Bella Phuket | Italian & Cafe Bistro</h3>
              <p>La Bella Phuket a welcoming atmosphere and a diverse menu filled with international comfort foods and freshly prepared dishes.</p>
            </div>
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><button onClick={() => handleScrollTo('home')}>Home</button></li>
                <li><button onClick={() => handleScrollTo('about')}>About</button></li>
                <li><button onClick={() => navigate('/menu')}>Menu</button></li>
                <li><button onClick={() => handleScrollTo('offers')}>Promotions</button></li>
                <li><button onClick={() => handleScrollTo('booking')}>Booking</button></li>
              </ul>
            </div>
            <div className="footer-contact">
              <h4>Contact</h4>
              <p>📍 236, 9 Phangmuang Sai Gor Road Pa Tong, Kathu District, Phuket 83150</p>
              <p>🕒 Everyday from 2 PM to 2 AM</p>
              <p>📧 info@gourmetbliss.com</p>
              <p>📞 +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>Copyright © {new Date().getFullYear()} La Bella Phuket – All Rights Reserved – <a style={{ color: "inherit", textDecoration: "none" }} href="https://www.linkedin.com/in/shaunit01/">Designed by SK</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
