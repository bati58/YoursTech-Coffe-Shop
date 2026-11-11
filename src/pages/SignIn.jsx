import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/ui/Field";
import { site } from "../config/site";

export default function SignIn() {
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/";

  const [form, setForm] = useState({ email: location.state?.email || "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user && !loading) return <Navigate to={redirectTo} replace />;

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((x) => ({ ...x, [e.target.name]: undefined }));
    setFormError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const found = {};
    if (!/^\S+@\S+\.\S+$/.test(form.email)) found.email = "Enter a valid email address.";
    if (!form.password) found.password = "Enter your password.";
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    const result = await signIn(form.email, form.password);
    if (!result.ok) {
      setLoading(false);
      setFormError(result.error);
      return;
    }
    navigate(redirectTo, { replace: true });
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your order and view your history."
      footer={
        <>
          New to {site.name}?{" "}
          <Link to="/signup" state={{ from: location.state?.from }} className="font-semibold text-accent-deep hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      {location.state?.registered && !formError && (
        <p className="mb-5 flex items-start gap-2 rounded-xl bg-success/10 px-4 py-3 text-sm text-success" role="status">
          <FiCheckCircle className="mt-0.5 shrink-0" /> Account created. Please sign in to continue.
        </p>
      )}
      {formError && (
        <p className="mb-5 flex items-start gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
          <FiAlertCircle className="mt-0.5 shrink-0" /> {formError}
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={change} error={errors.email} />
        <Field label="Password" name="password" type="password" autoComplete="current-password" value={form.password} onChange={change} error={errors.password} />
        <button type="submit" disabled={loading} className="btn-dark w-full py-3.5">
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthLayout>
  );
}
