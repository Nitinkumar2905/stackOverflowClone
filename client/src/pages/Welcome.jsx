// Welcome.js

import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="bg-gray-100 h-[91.8vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl md:text-5xl font-semibold mb-4 text-blue-700">
          Welcome to Stack Overflow
        </h1>
        <p className="text-sm md:text-base text-gray-600 mb-8">
          Get help and share your knowledge with a community of developers.
        </p>
        <button className="bg-blue-700 hover:bg-blue-800 text-sm md:text-base text-white font-semibold py-2 px-4 rounded-full">
          <Link to="/home">Get Started</Link>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
