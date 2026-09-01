import React from 'react';
import { Heart, Terminal } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center space-x-2 text-gray-400">
            <Terminal className="text-cyan-400" size={16} />
            <span className="font-mono text-white font-semibold">Uma Pathade</span>
            <span className="text-gray-600">·</span>
            <span className="text-gray-400 text-sm">Linux &amp; DevOps Engineer</span>
          </div>

          {/* Made with */}
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart className="text-red-500" size={14} />
            <span>by Uma Pathade</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Engineered with precision, deployed with confidence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
