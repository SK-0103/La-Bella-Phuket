import './Menu.css'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import pizzaImg from './assets/pizza.jpg'
import cookieFont from './assets/Cookie-Regular.ttf';

function Menu() {
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false);
  const backToTopRef = useRef(null);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -80px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Small delay to ensure smooth animation timing
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, 50)
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

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (backToTopRef.current) {
      backToTopRef.current.classList.remove('clicked');
      backToTopRef.current.offsetHeight;
      backToTopRef.current.classList.add('clicked');
      setTimeout(() => {
        if (backToTopRef.current) {
          backToTopRef.current.classList.remove('clicked');
        }
      }, 800);
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleJumpTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return

    // Apply temporary slide-in animation
    el.classList.remove('slide-in')
    // Force reflow to restart animation if the class was present
    // eslint-disable-next-line no-unused-expressions
    el.offsetHeight
    el.classList.add('slide-in')
    el.addEventListener('animationend', () => el.classList.remove('slide-in'), { once: true })

    // Calculate scroll position, compensating for sticky header
    const headerOffset = document.querySelector('.site-header').offsetHeight || 0
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
    const targetPosition = elementPosition - headerOffset - 40 // Add 40px offset to show section title with more space

    // Clamp target position to prevent overscrolling
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const finalTargetPosition = Math.min(Math.max(0, targetPosition), maxScroll)

    const startPosition = window.pageYOffset
    const distance = finalTargetPosition - startPosition
    const duration = 800 // Duration for smooth scroll
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
  
  // Easy-to-manage dish images
  const dishImages = {
    // Appetizers
    'Serrano Ham Tartine': pizzaImg,
    'Smoke Salmon Bruschetta': pizzaImg,
    'Texas Chicken Wing': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
    'Calamari Rings': pizzaImg,
    'Truffle Arancini': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    'Cheese Garlic Bread': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=400&q=80',
    
    // // Soups & Salads
    // 'Tom Yam River Prawns': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
    // 'Minestrone Soup': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    // 'Tuna Nicoise Salad': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
    // 'Caesar Salad': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    // 'Quinoa Salad': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    
    // Pasta
    'Carbonara': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
    'Bolognese': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    'Tiger Prawn Spaghetti': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
    'Penne Arrabbiata': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    'Lobster Ravioli': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    
    // Pizza
    'Parma Ham & Burrata': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
    'Truffle Pizza': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    'Four Cheese': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
    'Margherita': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    'Pepperoni': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    
    // From The Land
    'Black Angus Tomahawk': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
    'Wagyu Striploin': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    'Pork Chop': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    'Lamb Rack': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    
    // From The Sea
    'Roasted Salmon': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
    'Grilled Sea Bass': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    'Lobster Thermidor': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80',
    'Prawn Risotto': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    
    // Desserts
    'Tiramisu': 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
    'Cheesecake': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80',
    'Chocolate Brownie': 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80',
    'Ice Cream': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80'
  }
  
  const menuCategories = [
    {
      id: 'appetizers',
      title: 'Appetizer & Nibbles',
      items: [
        {
          name: 'Serrano Ham Tartine',
          price: 270,
          description: 'Crispy sourdough bread - Ricotta - EVOO - Serrano ham - Spring onions - Heirloom tomatoes'
        },
        {
          name: 'Smoke Salmon Bruschetta',
          price: 330,
          description: 'Crispy sourdough bread - Avocado hash - Cucumber - Tzatziki sauce'
        },
        {
          name: 'Texas Chicken Wing',
          price: 165,
          description: 'Free-range chicken wings - Homemade spicy BBQ sauce - Oregano - Sesame seeds - Spring onion'
        },
        {
          name: 'Calamari Rings',
          price: 260,
          description: 'Homemade Tartar sauce - Grilled lemon - Smoked paprika'
        },
        {
          name: 'Truffle Arancini',
          price: 280,
          description: 'Arborio risotto - Parmigiano Reggiano - Truffle paste'
        },
        {
          name: 'Cheese Garlic Bread',
          price: 200,
          description: 'French baguette - Garlic - Parsley - Oregano - Parmigiano Reggiano - Mozzarella'
        }
      ]
    },
    // {
    //   id: 'soups',
    //   title: 'Soup & Salad',
    //   items: [
    //     {
    //       name: 'Tom Yam River Prawns',
    //       price: 320,
    //       description: 'River prawns - Lemongrass - Chili - Garlic - Red curry paste'
    //     },
    //     {
    //       name: 'Minestrone Soup',
    //       price: 180,
    //       description: 'Vegetables - Veggie broth - Italian basil - Croutons - Parmigiano Reggiano'
    //     },
    //     {
    //       name: 'Tuna Nicoise Salad',
    //       price: 350,
    //       description: 'Market medley salad - Grilled AAA tuna - Potatoes - Green beans - Kalamata olives'
    //     },
    //     {
    //       name: 'Classic Caesar Salad',
    //       price: 260,
    //       description: 'Romaine lettuce - Caesar dressing - Crispy bacon - Poached egg - Croutons - Parmigiano Reggiano'
    //     },
    //     {
    //       name: 'Quinoa Salad',
    //       price: 300,
    //       description: 'Roasted beetroot - Pomegranate - Heirloom tomato - Chickpea - Cucumber - Feta cheese - Vinaigrette'
    //     },
    //     {
    //       name: 'Heirloom Burrata Caprese Salad',
    //       price: 530,
    //       description: 'Heirloom tomatoes - Burrata - Italian basil - Pesto - EVOO - Balsamic glaze'
    //     }
    //   ]
    // },
    {
      id: 'pasta',
      title: 'Pasta',
      items: [
        {
          name: 'Spaghetti Carbonara',
          price: 340,
          description: 'Guanciale - Free-range yolk egg - Parmigiano Reggiano - Pecorino Romano - Black pepper'
        },
        {
          name: 'Pasta Bolognese',
          price: 350,
          description: 'AUS Beef ragout - Tomato sauce - Parsley - Garlic bread'
        },
        {
          name: 'Aglio Olio e Pepperoncino',
          price: 270,
          description: 'EVOO - Garlic - Dry chili - Italian parsley'
        },
        {
          name: 'Marinara',
          price: 360,
          description: 'EVOO - Garlic - Onion - Tiger prawns - Squids - Mussels - Tomato sauce - Italian basil - Garlic bread'
        },
        {
          name: 'Tiger Prawn Spaghetti',
          price: 790,
          description: 'EVOO - Capellini A.O.P. - Garlic - Fresh herbs - Parmigiano Reggiano - Tomato cherry'
        },
        {
          name: 'Wild Mushroom Ravioli',
          price: 450,
          description: 'EVOO - Truffle paste - Cream - Italian parsley - Rocket oil'
        }
      ]
    },
    {
      id: 'pizza',
      title: 'Pizza',
      items: [
        {
          name: 'Parma Ham and Burrata',
          price: 550,
          description: 'Fresh tomato sauce - Burrata cheese - Parma ham - Italian basil'
        },
        {
          name: 'Truffle',
          price: 450,
          description: 'White cream sauce - Truffle paste - Parmigiano Reggiano - Bocconcini cheese - Taleggio DOP - Black truffle slices'
        },
        {
          name: 'Four Cheese',
          price: 450,
          description: 'Fresh tomato sauce - Slow cooked chicken - Shiitake mushroom - Mozzarella cheese'
        },
        {
          name: 'Classic Margherita',
          price: 350,
          description: 'Fresh tomato sauce - Bocconcini cheese - Parmigiano Reggiano - Italian basil'
        },
        {
          name: 'Baby Spinach & Taleggio',
          price: 370,
          description: 'Fresh tomato sauce - Spinach - Garlic - Taleggio DOP - Mozzarella cheese'
        },
        {
          name: 'Seafood',
          price: 360,
          description: 'Fresh tomato sauce - Sauteed prawns - Squids - Mussels - Mozzarella cheese - Garlic oil'
        }
      ]
    },
    {
      id: 'grill',
      title: 'From The Land',
      items: [
        {
          name: 'Black Angus Tomahawk',
          price: 4900,
          description: 'Marbling 3+ - Sauteed potatoes - Char grilled corn - Confit garlic - Confit tomatoes'
        },
        {
          name: 'Black Angus Rib Eye',
          price: 1900,
          description: 'Marbling 3+ - Confit garlic - Roasted Tomatoes - Caffe de Paris sauce'
        },
        {
          name: 'AUS Tajima Wagyu Striploin',
          price: 1500,
          description: 'Marbling 4+ - EVOO - Confit garlic - Roasted potatoes - Your choice of sauce'
        },
        {
          name: 'AUS Wagyu Sirloin Tender',
          price: 990,
          description: 'Marbling score 8+ - EVOO - Confit garlic - Roasted tomatoes - Your sauce of sauce'
        },
        {
          name: 'AUS Tenderloin Steak',
          price: 950,
          description: 'EVOO - Garlic confit - Roasted tomatoes - Your choice of sauce'
        },
        {
          name: 'Grilled Kurobuta Pork Chop',
          price: 550,
          description: 'Marinated pork chop - EVOO - Fresh herbs - Grilled vegetables - Pepper sauce'
        }
      ]
    },
    {
      id: 'seafood',
      title: 'From The Sea',
      items: [
        {
          name: 'Roasted Salmon',
          price: 570,
          description: 'Roasted salmon fillet - EVOO - Confit vegetables - Grilled lemon - Butter sauce'
        },
        {
          name: 'Grilled Sea Bass',
          price: 470,
          description: 'Grilled sea bass fillet - Grilled vegetables - Grilled lemon - Virgin sauce'
        },
        {
          name: 'Fish & Chip',
          price: 320,
          description: 'Sea bass fillet - Tartar sauce - Grilled lemon - French fries'
        },
        {
          name: 'Grilled Tiger Prawns',
          price: 990,
          description: 'EVOO - Fresh herbs - Virgin sauce - Grilled lime'
        },
        {
          name: 'Lobster Thermidor',
          price: 1500,
          description: 'Phuket lobster - Truffle bechamel - Mushroom - Mozzarella - Grilled vegetables'
        },
        {
          name: 'Surf & Turf',
          price: 1750,
          description: 'Half Phuket lobster - Angus ribeye - Truffle mashed potatoes - Garlic confit - Roasted tomatoes'
        }
      ]
    },
    {
      id: 'desserts',
      title: 'Dessert',
      items: [
        {
          name: 'Sweet Treats Together',
          price: 450,
          description: '6 scoops of ice cream - Red berry coulis - Chantilly - Caramelized pop corn - French meringue - Biscotti - Salty caramel - Strawberry'
        },
        {
          name: 'Tropical Fruit Platter',
          price: 120,
          description: 'Pineapple - Watermelon - Papaya - Dragon fruit - Phuket mango'
        },
        {
          name: 'Italian Ricotta Cheesecake',
          price: 210,
          description: 'Ricotta - Cream Cheese - Eggs - Sugar - Passion fruit coulis'
        },
        {
          name: 'Tiramisu',
          price: 250,
          description: 'Chocolate Mousse & Mascarpone - Chocolate 70% - Mascarpone - eggs - Coffee powder - Biscotti'
        },
        {
          name: 'Fudgy Cacao Brownie',
          price: 220,
          description: 'Chocolate 70% - Peanuts - French butter - Salty caramel - Whipped cream - Cinnamon'
        },
        {
          name: 'Amarena Ice Cream',
          price: 200,
          description: 'Amarena ice cream 2 scoops - Red berry coulis - Whipped cream - Caramelized peanuts'
        }
      ]
    }
  ]

  const handleScrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      })
    }
  }

  return (
    <div className="menu-page">
      <header className="site-header">
        <div className="container">
          <div className="brand">La Bella Phuket</div>
          <nav className="nav">
            <button onClick={() => navigate('/')}>← Back</button>
            <button onClick={() => handleJumpTo('appetizers')}>Appetizers</button>
            <button onClick={() => handleJumpTo('pasta')}>Pasta</button>
            <button onClick={() => handleJumpTo('pizza')}>Pizza</button>
            <button onClick={() => handleJumpTo('grill')}>Grill</button>
            <button onClick={() => handleJumpTo('seafood')}>Seafood</button>
            <button onClick={() => handleJumpTo('desserts')}>Desserts</button>
          </nav>
          <button className="cta" onClick={() => navigate('/')}>BOOK NOW</button>
          <button className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <button onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>← Back to Home</button>
          <button onClick={() => { handleJumpTo('appetizers'); setMobileMenuOpen(false); }}>Appetizers</button>
          <button onClick={() => { handleJumpTo('pasta'); setMobileMenuOpen(false); }}>Pasta</button>
          <button onClick={() => { handleJumpTo('pizza'); setMobileMenuOpen(false); }}>Pizza</button>
          <button onClick={() => { handleJumpTo('grill'); setMobileMenuOpen(false); }}>Grill</button>
          <button onClick={() => { handleJumpTo('seafood'); setMobileMenuOpen(false); }}>Seafood</button>
          <button onClick={() => { handleJumpTo('desserts'); setMobileMenuOpen(false); }}>Desserts</button>
          <button className="mobile-cta" onClick={() => { navigate('/'); setMobileMenuOpen(false); }}>BOOK NOW</button>
        </div>
      </header>

      <div className="menu-hero fade-in-section fade-in-up">
        <div className="container">
          <h1 style={{ color: 'goldenrod', fontFamily: ' Cookie, cursive', fontSize: '75px' }}>Food Menu</h1>
          <p style={{ color: 'gold', fontFamily: ' Cookie, cursive', fontSize: '24px' }}>Discover our exquisite selection of handcrafted dishes</p>
        </div>
      </div>

      <div className="menu-content">
        <div className="container">
          <div className="menu-categories">
            {menuCategories.map((category) => (
              <section key={category.id} id={category.id} className="menu-category fade-in-section">
                <h2 className="category-title fade-in-section fade-in-up">{category.title}</h2>
                <div className="menu-items">
                  {category.items.map((item, index) => (
                    <div key={index} className="menu-item-card fade-in-section fade-in-up">
                      <div className="card-image">
                        <img 
                          src={dishImages[item.name] || `https://images.unsplash.com/photo-${1550000000000 + (index * 1000000)}?auto=format&fit=crop&w=400&q=80`} 
                          alt={item.name}
                          onError={(e) => {
                            e.target.src = `https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?auto=format&fit=crop&w=400&q=80&ix=${index}`
                          }}
                        />
                        <div className="card-overlay">
                          <span className="card-price">฿{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="card-content">
                        <h3 className="card-title">{item.name}</h3>
                        <p className="card-description">{item.description}</p>
                        <div className="card-footer">
                          <span className="card-price-mobile">฿{item.price.toLocaleString()}</span>
                          {/* <button className="card-btn">Order Now</button> */}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      <footer className="footer fade-in-section fade-in-up">
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
      {showBackToTop && (
        <button
          ref={backToTopRef}
          className="back-to-top"
          onClick={() => handleJumpTo('appetizers')}
          aria-label="Back to top"
        >
          ↑
        </button>
      )}
    </div>
    
  )
}

export default Menu
