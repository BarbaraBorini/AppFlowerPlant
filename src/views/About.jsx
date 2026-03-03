const About = () => {
  return (
    <div className="page page-about">
      <section className="section">
        <header className="section-header">
          <h1 className="section-heading">About FlowerPlant</h1>
          <p className="section-subtitle">
            FlowerPlant is a friendly corner of the internet for everyone who
            loves plants – from first-time plant parents to seasoned growers.
          </p>
        </header>

        <div className="about-grid">
          <article className="about-card">
            <h2>Our vision</h2>
            <p>
              We imagine cities, balconies, and homes filled with thriving
              plants – helping people feel more connected to nature, more calm
              in their daily lives, and more aware of the impact of their
              choices on the environment.
            </p>
          </article>
          <article className="about-card">
            <h2>Our mission</h2>
            <p>
              FlowerPlant makes plant care approachable by turning complex
              information into simple, practical guides. We bring together
              enthusiasts, gardeners, and beginners who want to share tips,
              stories, and sustainable habits.
            </p>
          </article>
          <article className="about-card">
            <h2>Our purpose</h2>
            <p>
              We believe that caring for plants is also caring for yourself and
              the planet. By helping people understand light, soil, water, and
              seasonality, we support healthier homes and greener cities.
            </p>
          </article>
        </div>

        <section className="contact-panel" aria-label="Contact FlowerPlant">
          <h2>Contact us</h2>
          <p>
            Have ideas, questions, or suggestions for new guides? We would love
            to hear from you.
          </p>
          <ul className="contact-list">
            <li>
              <strong>Address:</strong> 123 Botanical Lane, Green City, 2345
              Copenhagen, Denmark
            </li>
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:flowplant123@flowerplant2026.dk">
                flowplant123@flowerplant2026.dk
              </a>
            </li>
            <li>
              <strong>Mobile:</strong>{' '}
              <a href="tel:+452076765">+45 20 76 76 5</a>
            </li>
          </ul>
        </section>
      </section>
    </div>
  )
}

export default About

