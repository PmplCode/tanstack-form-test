import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import "../styles/Success.css";

const Success: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confettiInterval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a084e8', '#8e70d7', '#4a90e2', '#5cb3ff']
      });
    }, 4000);

    // Initial confetti burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a084e8', '#8e70d7', '#4a90e2', '#5cb3ff']
    });

    // Cleanup interval on unmount
    return () => clearInterval(confettiInterval);
  }, []);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="success-page">
      <div className="success-container">
        <h1 className="success-h1">Congrats!</h1>
        <p className="success-p">
          You are now a <span className="yellow-text">subscriber</span>!
        </p>
        <button className="success-back-button btn" onClick={handleBack}>
          Home
        </button>
      </div>
    </div>
  );
};

export default Success;
