import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#9e8a55]/20 py-6 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold bg-gradient-to-r from-[#c6a964] to-[#e9d3a3] bg-clip-text text-transparent mb-2">
              Cocktail Generator
            </div>
            <p className="text-[#9e8a55] text-sm">© {new Date().getFullYear()} Discover delicious cocktail recipes</p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div>
              <h4 className="font-medium mb-2 text-[#c6a964]">Contact Us</h4>
              <p className="text-[#9e8a55] text-sm">info@cocktailgen.com</p>
              <p className="text-[#9e8a55] text-sm">+886 123 456 789</p>
            </div>
            <div>
              <h4 className="font-medium mb-2 text-[#c6a964]">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="text-[#9e8a55] hover:text-[#c6a964]">FB</a>
                <a href="#" className="text-[#9e8a55] hover:text-[#c6a964]">IG</a>
                <a href="#" className="text-[#9e8a55] hover:text-[#c6a964]">TW</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 