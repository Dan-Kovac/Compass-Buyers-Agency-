import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Compass motif */}
        <div className="flex justify-center">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[var(--hills)] opacity-40">
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1" opacity="0.5" />
            {/* Compass needle */}
            <path d="M32 10 L35 32 L32 54 L29 32 Z" fill="currentColor" opacity="0.15" />
            <path d="M32 10 L35 32 L32 22 L29 32 Z" fill="currentColor" opacity="0.4" />
            {/* Cardinal points */}
            <text x="32" y="8" textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="var(--font-body)" fontWeight="500">N</text>
            <text x="32" y="62" textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="var(--font-body)" fontWeight="500">S</text>
            <text x="4" y="34" textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="var(--font-body)" fontWeight="500">W</text>
            <text x="60" y="34" textAnchor="middle" fontSize="6" fill="currentColor" fontFamily="var(--font-body)" fontWeight="500">E</text>
          </svg>
        </div>

        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.15em] text-[var(--ink)]/50 font-medium">404</p>
          <h1 className="text-3xl md:text-4xl font-heading text-[var(--ink)]">
            Off course
          </h1>
          <p className="text-[var(--ink)]/60 leading-relaxed max-w-sm mx-auto">
            This page doesn't exist. You might have followed an old link, or the address has changed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/"
            className="btn-cta inline-flex items-center justify-center"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[var(--hills)] border border-[var(--hills)]/20 rounded-lg hover:border-[var(--hills)]/40 transition-colors duration-400"
          >
            Get in Touch
          </Link>
        </div>

        <div className="pt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--ink)]/50">
          <Link to="/services" className="hover:text-[var(--hills)] transition-colors duration-300">Services</Link>
          <Link to="/areas" className="hover:text-[var(--hills)] transition-colors duration-300">Areas We Cover</Link>
          <Link to="/about" className="hover:text-[var(--hills)] transition-colors duration-300">About</Link>
          <Link to="/blog" className="hover:text-[var(--hills)] transition-colors duration-300">Blog</Link>
        </div>
      </div>
    </div>
  );
}
