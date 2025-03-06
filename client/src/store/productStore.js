import { makeAutoObservable } from "mobx";
import axios from "axios";

class ProductStore {
  products = [];
  selectedCategory = null;
  selectedTag = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCategory(categoryId) {
    this.selectedCategory = categoryId;
    this.selectedTag = null; // Сбрасываем тег при выборе категории
    this.fetchProducts();
  }

  setTag(tagId) {
    this.selectedTag = tagId;
    this.selectedCategory = null; // Сбрасываем категорию при выборе тега
    this.fetchProducts();
  }

  async fetchProducts() {
    try {
      let url = "http://localhost:5000/api/product";
      if (this.selectedCategory) {
        url += `?categoryId=${this.selectedCategory}`;
      } else if (this.selectedTag) {
        url += `?tagId=${this.selectedTag}`;
      }

      const response = await axios.get(url);
      this.products = response.data.products || [];
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error);
      this.products = [];
    }
  }
}

export default new ProductStore();
