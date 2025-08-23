import { ArrowLeft, Construction } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({ 
  title, 
  description = "This page is coming soon. Continue prompting to help me build out this section!" 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-xl shadow-brand-500/25">
          <Construction className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {title}
        </h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          {description}
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40 hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
