import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { validateEmail, sendEmail } from "../services/api";
import "../styles/VerifyEmail.css";

interface LocationState {
  email?: string;
}

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const email = state?.email || "";
  const [code, setCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(30);

  const validateMutation = useMutation({
    mutationFn: validateEmail,
    onSuccess: (data) => {
      navigate("/plans", { state: { userId: data.data.user_id } });
    },
    onError: (error: any) => {
      setError(error.response?.data?.error || "Invalid code");
    },
  });

  const resendMutation = useMutation({
    mutationFn: sendEmail,
    onSuccess: () => {
      setCountdown(30);
    },
    onError: (error: any) => {
      setError(error.response?.data?.error || "Failed to resend code");
    },
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(countdown - 1), 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    validateMutation.mutate({ email, code });
  };

  const handleResend = () => {
    if (countdown === 0) {
      resendMutation.mutate(email);
    }
  };

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    ripple.style.top = `${e.clientY - button.offsetTop - radius}px`;
    ripple.classList.add("verify-ripple");

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);

    console.log("Ripple effect triggered:", {
      buttonSize: { width: button.clientWidth, height: button.clientHeight },
      clickPosition: { x: e.clientX, y: e.clientY },
      rippleSize: { width: diameter, height: diameter },
    });
  };

  return (
    <div className="verify-page">
      <div className="verify-container">
        <h1 className="verify-h1">Get Verified!</h1>
        <form className="verify-form" onSubmit={handleSubmit}>
          <input
            className="verify-input input"
            type="text"
            value={code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value)
            }
            placeholder="Enter 6-digit code"
            disabled={validateMutation.isPending}
            maxLength={6}
            pattern="[0-9]*"
            inputMode="numeric"
          />
          {error && <div className="verify-error">{error}</div>}
          <button
            className="verify-button btn"
            type="submit"
            onClick={handleRipple}
            disabled={validateMutation.isPending}
          >
            {validateMutation.isPending ? "Verifying..." : "Verify"}
          </button>
          <div
            className={`verify-resend ${countdown > 0 ? "disabled" : ""}`}
            onClick={handleResend}
          >
            {countdown > 0
              ? `Resend code in ${countdown}s`
              : "Didn't get an email? Resend code"}
          </div>
        </form>
      </div>
      <a href="/" className="back-button">
        Modify Email
      </a>
    </div>
  );
};

export default VerifyEmail;
