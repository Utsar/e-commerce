import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
// import { popularProducts } from "../data";
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

  // fetch products categories from API
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          category
            ? `http://localhost:3001/api/products?category=${category}`
            : "http://localhost:3001/api/products"
        );
        setProducts(response.data);
      } catch (error) {}
    };
    getProducts();
  }, [category]);

  // filter products
  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filter]);

  // sort products

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <>
      <Container>
        {category
          ? filteredProducts.map((item) => (
              <Product key={item.id} item={item} />
            ))
          : products
              .slice(0, 8)
              .map((item) => <Product key={item.id} item={item} />)}
      </Container>
    </>
  );
};

export default Products;
