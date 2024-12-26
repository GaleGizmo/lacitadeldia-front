import "./Footer.css";

const Footer = () => {
  return (
    <footer className="color-codes">
      <div className="color-code">
        <div className="phrase-box win footer-box"></div>
        <small>GANADA</small>{" "}
      </div>
      <div className="color-code">
        <div className="phrase-box lose footer-box"></div>
        <small>PERDIDA</small>{" "}
      </div>
      <div className="color-code">
        <div className="phrase-box np footer-box"></div>
        <small>NO JUGADA</small>{" "}
      </div>
      <div className="color-code">
        <div className="phrase-box playing footer-box"></div>
        <small>JUGANDO</small>{" "}
      </div>
    </footer>
  );
};
export default Footer;
