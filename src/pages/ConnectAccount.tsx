import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { sendEmail } from "../services/api";
import "../styles/ConnectAccount.css";

const ConnectAccount: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [marketingOptIn, setMarketingOptIn] = useState<boolean>(false);

  const mutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      navigate("/verify", { state: { email } });
    },
    onError: (error: any) => {
      setError(error.response?.data?.error || "Something went wrong");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    mutation.mutate(email);
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${e.clientY - button.offsetTop - radius}px`;
    ripple.classList.add("connect-ripple");

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div className="connect-page">
      <div className="connect-container">
        <h1 className="connect-h1">
          Connect Your Account
          <br />
          <span style={{ fontSize: "0.75rem", fontWeight: 400, color: "var(--text-secondary)" }}>
            ...and unlock your benefits!
          </span>
        </h1>
        <div className="connect-benefits-list">
          <div className="connect-benefit-item">
            <span className="connect-checkmark">✔</span>
            <span>Access to 100+ GAMES for FREE thanks to ads</span>
          </div>
          <div className="connect-benefit-item">
            <span className="connect-checkmark">✔</span>
            <span>Log In Across All Your Devices</span>
          </div>
          <div className="connect-benefit-item">
            <span className="connect-checkmark">✔</span>
            <span>Skip the Line with Customer Support</span>
          </div>
        </div>
        <form className="connect-form" onSubmit={handleSubmit}>
          <input
            className="connect-input input"
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Email Address"
            disabled={mutation.isPending}
          />
          {error && <div className="connect-error">{error}</div>}
          <div className="connect-marketing-optin">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMarketingOptIn(e.target.checked)
              }
            />
            <span>Send Me Offers, News, and Fun Stuff!</span>
          </div>
          <button
            className="connect-button btn"
            type="submit"
            onClick={handleRipple}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Connecting..." : "Connect"}
          </button>
        </form>
        <div className="connect-terms">
          By continuing, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
};

export default ConnectAccount;
