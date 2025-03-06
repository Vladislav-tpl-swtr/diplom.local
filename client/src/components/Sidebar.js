import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import productStore from "../store/productStore";
import { observer } from "mobx-react-lite";

const Sidebar = observer(() => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/category")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Ошибка загрузки категорий:", error));
  }, []);

  const handleCategoryClick = (categoryId) => {
    productStore.setCategory(categoryId);
    navigate("/"); // Перенаправляем на `HomePage`
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex h-full overflow-y-auto">
      <nav className="p-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-2">КАТАЛОГ</h3>
        <ul className="space-y-1">
          <li>
            <button 
              className="block px-3 py-2 text-gray-700 font-medium w-full text-left"
              onClick={() => handleCategoryClick(null)}
            >
              Все товары
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button 
                className="block px-3 py-2 text-gray-700 font-medium w-full text-left hover:bg-gray-100"
                onClick={() => handleCategoryClick(category.id)}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
});

export default Sidebar;
