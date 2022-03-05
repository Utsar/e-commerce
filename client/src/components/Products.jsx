import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ category, filter, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category
            ? `http://localhost:3001/api/products?category=${category}`
            : "http://localhost:3001/api/products"
        );
        // console.log(response);
        setProducts(response.data);
      } catch (error) {}
    };
    getProducts();
  }, [category]);
  return (
    <>
      <Container>
        {popularProducts.map((item) => (
          <Product key={item.id} item={item} />
        ))}
      </Container>
    </>
  );
};

export default Products;
