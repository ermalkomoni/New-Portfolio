import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function NotFound() {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-xl shadow-red-500/25">
          <AlertTriangle className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Go back home
        </Link>
      </div>
    </div>
  );
}
