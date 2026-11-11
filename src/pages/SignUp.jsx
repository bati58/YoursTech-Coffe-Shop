import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import Field from "../components/ui/Field";
import { site } from "../config/site";

function validate(f) {
  const e = {};
  if (!f.firstName.trim()) e.firstName = "Enter your first name.";
  if (!f.lastName.trim()) e.lastName = "Enter your last name.";
  if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = "Enter a valid email address.";
  if (f.password.length < 8) e.password = "Use at least 8 characters.";
  if (f.confirmPassword !== f.password) e.confirmPassword = "Passwords do not match.";
  return e;
}

export default function SignUp() {
  const { user, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const change = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((x) => ({ ...x, [e.target.name]: undefined }));
    setFormError("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    setLoading(true);
    const result = await signUp(form);
    setLoading(false);
    if (!result.ok) {
      setFormError(result.error);
      return;
    }
    navigate("/signin", { state: { registered: true, email: form.email, from: location.state?.from } });
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle={`Join ${site.fullName} to order in a few taps.`}
      footer={
        <>
          Already have an account?{" "}
          <Link to="/signin" state={{ from: location.state?.from }} className="font-semibold text-accent-deep hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {formError && (
        <p className="mb-5 flex items-start gap-2 rounded-xl bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">
          <FiAlertCircle className="mt-0.5 shrink-0" /> {formError}
        </p>
      )}
      <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" name="firstName" autoComplete="given-name" value={form.firstName} onChange={change} error={errors.firstName} />
        <Field label="Last name" name="lastName" autoComplete="family-name" value={form.lastName} onChange={change} error={errors.lastName} />
        <Field label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={change} error={errors.email} className="sm:col-span-2" />
        <Field label="Password" name="password" type="password" autoComplete="new-password" hint="At least 8 characters." value={form.password} onChange={change} error={errors.password} className="sm:col-span-2" />
        <Field label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" value={form.confirmPassword} onChange={change} error={errors.confirmPassword} className="sm:col-span-2" />
        <button type="submit" disabled={loading} className="btn-dark w-full py-3.5 sm:col-span-2">
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthLayout>
  );
}
