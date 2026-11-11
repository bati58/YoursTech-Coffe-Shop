import { useEffect, useState } from "react";
import { FiCheck, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

export default function AddToCartButton({ product, quantity = 1, variant = "primary", className = "" }) {
  const { addToCart } = useCart();
  const { notify } = useToast();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(t);
  }, [added]);

  function handleClick() {
    addToCart(product, quantity);
    setAdded(true);
    notify(`${quantity > 1 ? `${quantity} × ` : ""}${product.name} added to your cart`);
  }

  const style = added ? "btn bg-success text-white" : variant === "dark" ? "btn-dark" : "btn-primary";

  return (
    <button type="button" onClick={handleClick} className={`${style} ${className}`}>
      {added ? <FiCheck size={16} /> : <FiShoppingBag size={16} />}
      {added ? "Added" : "Add to Cart"}
    </button>
  );
}
