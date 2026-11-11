import { useId, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Field({ label, error, hint, type = "text", multiline = false, className = "", ...props }) {
  const id = useId();
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const describedBy = error ? `${id}-err` : hint ? `${id}-hint` : undefined;
  const common = {
    id,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    className: `input ${error ? "input-error" : ""} ${isPassword ? "pr-12" : ""}`,
    ...props,
  };

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea rows={3} {...common} />
        ) : (
          <input type={isPassword && show ? "text" : type} {...common} />
        )}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? "Hide password" : "Show password"}
            aria-pressed={show}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted transition hover:text-ink"
          >
            {show ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-err`} className="mt-1.5 text-xs text-danger" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
