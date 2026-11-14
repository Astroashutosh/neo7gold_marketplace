import "./Craftsmanship.scss";

export default function Craftsmanship() {
  return (
    <section className="craftsmanship-section">

      <div className="craftsmanship-bg">
        <div className="craft-glow craft-glow-one" />
        <div className="craft-glow craft-glow-two" />

        <div className="craft-orbit orbit-one" />
        <div className="craft-orbit orbit-two" />
        <div className="craft-orbit orbit-three" />

        <span className="craft-particle particle-one" />
        <span className="craft-particle particle-two" />
        <span className="craft-particle particle-three" />
        <span className="craft-particle particle-four" />
        <span className="craft-particle particle-five" />
      </div>

      <div className="craftsmanship-content">

        <p className="craftsmanship-label">
          The Art of Craftsmanship
        </p>

        <h2>
          Made with
          <span>intention.</span>
        </h2>

        <p className="craftsmanship-description">
          Every NEOS7 GOLD creation begins with an idea,
          shaped by skilled hands and refined through
          meticulous craftsmanship.
        </p>

        <div className="craftsmanship-line" />

        <div className="craftsmanship-details">

          <div className="craft-detail">
            <span>01</span>
            <h3>Pure Form</h3>
            <p>
              Elegant silhouettes designed to reveal
              the natural beauty of gold.
            </p>
          </div>

          <div className="craft-detail">
            <span>02</span>
            <h3>Fine Detail</h3>
            <p>
              Every curve and surface is refined with
              precision and care.
            </p>
          </div>

          <div className="craft-detail">
            <span>03</span>
            <h3>Timeless Design</h3>
            <p>
              Jewellery created to remain meaningful
              across generations.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}
