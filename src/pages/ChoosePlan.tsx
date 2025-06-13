import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProducts, startTrial } from "../services/api";
import "../styles/ChoosePlan.css";

interface LocationState {
  userId?: number;
}

interface Product {
  price: string;
  currency: string;
  trial_days: number;
}

interface Products {
  monthly: Product;
  year: Product;
}

const ChoosePlan: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;
  const userId = state?.userId;
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "year">(
    "monthly"
  );
  const [currency, setCurrency] = useState<"USD" | "EUR">("USD");

  const { data, isLoading, error } = useQuery<Products>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await getProducts();
      return response.data;
    },
  });

  const mutation = useMutation({
    mutationFn: startTrial,
    onSuccess: () => {
      navigate("/success");
    },
    onError: (error: any) => {
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId) {
      mutation.mutate({ user_id: userId });
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
    ripple.classList.add("choose-ripple");

    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  if (isLoading)
    return (
      <div className="choose-page">
        <div className="choose-container">
          <div className="loading-spinner">Loading plans...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="choose-page">
        <div className="choose-container">
          <div className="error-message">Error loading plans</div>
        </div>
      </div>
    );

  const plans = data || {};
  const plansArray = Object.entries(plans).map(([key, value]) => ({
    type: key,
    price: (value as Product).price,
    currency: (value as Product).currency,
    trial_days: (value as Product).trial_days,
  }));

  const formatPrice = (price: string): string =>
    currency === "USD"
      ? `$${price}`
      : `€${(parseFloat(price) * 0.85).toFixed(2)}`;

  return (
    <div className="choose-page">
      <div className="choose-container">
        <h1 className="choose-h1">Choose Your Plan</h1>
        <div className="choose-currency-select">
          <select
            value={currency}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setCurrency(e.target.value as "USD" | "EUR")
            }
            className="input"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div className="choose-plans-grid">
          {plansArray.map((plan) => (
            <div
              key={plan.type}
              className={`choose-plan-card ${
                selectedPlan === plan.type ? "selected" : ""
              }`}
              onClick={() => setSelectedPlan(plan.type as "monthly" | "year")}
            >
              <h3>
                {plan.type === "monthly" ? "Monthly Plan" : "Annual Plan"}
                {plan.type === "year" && " (Save 20%)"}
              </h3>
              <p>{formatPrice(plan.price)}</p>
              <p>
                <span role="img" aria-label="calendar">
                  📅
                </span>{" "}
                {plan.trial_days} days free trial
              </p>
              {plan.type === "year" && (
                <p>
                  <span role="img" aria-label="gift">
                    🎁
                  </span>{" "}
                  Best value
                </p>
              )}
            </div>
          ))}
        </div>
        <button
          className="choose-button btn"
          onClick={(e) => {
            handleRipple(e);
            handleSubmit(e);
          }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            "Starting trial..."
          ) : (
            <>
              <span role="img" aria-label="rocket">
                🚀
              </span>{" "}
              Start my free trial
            </>
          )}
        </button>
      </div>
      <a href="/verify" className="back-button">
        Back
      </a>
    </div>
  );
};

export default ChoosePlan;
