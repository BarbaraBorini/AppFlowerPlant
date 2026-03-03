const Footer = () => {

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-section">
          <h2 className="footer-subheading">FlowerPlant</h2>
          <p className="footer-text">
            A community for plant lovers, beginners, and experts 
            who want to grow greener spaces together.
          </p>
        </div>
        <div className="footer-section">
          <h3 className="footer-subheading">Contact</h3>
          <p className="footer-text">
            123 Botanical Lane
            <br />
            Green City, 2345 Copenhagen, Denmark
          </p>
          <p className="footer-text">
            Email:{' '}
            <a href="mailto:flowerplant123@flowerplant2026.dk">
              flowerplant123@flowerplant2026.dk
            </a>
            <br />
            Mobile:{' '}
            <a href="tel:+452076765" aria-label="Call FlowerPlant">
              +45 20 76 76 5
            </a>
          </p>
        </div>
        <div className="footer-section">
          <h3 className="footer-subheading">Stay inspired</h3>
          <p className="footer-text">
            Follow us on social media to get tips and inspiration for your plants.
          </p>
          <a href="Instagram.com">
            Instagram
          </a>
          <br />
          <a href="Facebook.com">
            Facebook
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

