import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-page py-28 text-center">
      <p className="font-serif text-8xl font-semibold text-accent-light">404</p>
      <h1 className="mt-4 text-4xl font-semibold">This page has gone cold</h1>
      <p className="mt-3 text-muted">The page you're looking for doesn't exist or has moved.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="btn-primary">Back home</Link>
        <Link to="/menu" className="btn-outline">View menu</Link>
      </div>
    </div>
  );
}
