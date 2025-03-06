import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm fixed py-4 top-0 left-0 right-0 z-10 mx-96">
      <div className="container flex  flex-row items-left justify-between ">
        <div className="flex items-center">
          <span className="ml-2 text-xl font-bold text-gray-800">ART OF TEA</span>
        </div>

        <div className="flex mx-8 ">
          <form className="flex w-96">
            <input
              type="text"
              placeholder="Поиск чая..."
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="submit" className="bg-green-800 text-white px-4 py-2 rounded-r-lg hover:bg-green-700">
              Найти
            </button>
          </form>
        </div>

        <div className="flex items-center space-x-6">
          <a href="#" className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 hover:text-green-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute top-0 right-0 bg-green-800 text-white text-xs px-1 rounded-full">3</span>
          </a>

          <div className="relative dropdown">
            <button className="flex items-center space-x-2 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-700 hover:text-green-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <div className="dropdown-menu">
              <a href="#" className="text-sm">Авторизация</a>
              <a href="#" className="text-sm">Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
