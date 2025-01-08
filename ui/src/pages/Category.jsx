import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryFilter = () => {
  const [filters, setFilters] = useState({
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        
        const response = await axios.get("https://homeworkdashboardbackend.vercel.app/frontend/category/products", {
          params: { admin_id: "your_admin_id", page: 1, limit: 100 },
        });


        setCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); 

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      <label htmlFor="category" className="block">
        Category
      </label>
      <select
        id="category"
        name="category"
        value={filters.category}
        onChange={handleFilterChange}
        className="border rounded p-2"
      >
        <option value="">All</option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;
