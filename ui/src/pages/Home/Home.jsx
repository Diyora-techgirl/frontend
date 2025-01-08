import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';  
import { useAuth } from '../../context/AuthContext';
import { FaHeart, FaShoppingCart } from 'react-icons/fa'; 

const Home = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { authState } = useAuth();
  const token = authState.token;

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://homeworkdashboardbackend.vercel.app/frontend/products?page=${currentPage}&limit=10`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, token]); 

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFavorite = (productId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(productId)) {
        return prevFavorites.filter(id => id !== productId);  
      } else {
        return [...prevFavorites, productId]; 
      }
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <section className="py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow-md relative">
                
                <h3 className="text-xl font-semibold">{product.name}</h3>

                <img 
                  src="src/assets/download.png" 
                  alt={product.name} 
                  className="product-image w-full h-48 object-cover mb-4 rounded-lg" 
                />
                
                <p className="text-gray-700 mb-4">{product.description}</p>
                
                <button 
                  onClick={() => handleFavorite(product._id)} 
                  className="absolute top-2 right-2 text-red-600">
                  <FaHeart size={24} color={favorites.includes(product._id) ? 'red' : 'gray'} />
                </button>

                <Link to={`/product/${product._id}`} className="text-blue-600 hover:text-blue-800 block mb-4">
                  View Details
                </Link>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-800">
                  <FaShoppingCart className="inline-block mr-2" />
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="mr-2 text-blue-600 hover:text-blue-800">
              Previous
            </button>
            <span className="text-lg">{currentPage} of {totalPages}</span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              className="ml-2 text-blue-600 hover:text-blue-800">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
