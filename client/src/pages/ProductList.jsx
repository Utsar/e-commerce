import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";

const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];

  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");
  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter({
      ...filter,
      [e.target.name]: value,
    });
  };

  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <Title>{category}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select name="type" onChange={handleFilter}>
              <Option disabled>Type:</Option>
              <Option>bottle</Option>
              <Option>case</Option>
              <Option>gift</Option>
              <Option>0% ABV</Option>
            </Select>
            <Select name="size" onChange={handleFilter}>
              <Option disabled>Size:</Option>
              <Option>0.33cl</Option>
              <Option>0.5cl</Option>
              <Option>70cl</Option>
              <Option>1lt</Option>
              <Option>SixPack</Option>
              <Option>12</Option>
              <Option>24</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">newest</Option>
              <Option value="asc">Price: (asc)</Option>
              <Option value="desc">Price: (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products category={category} filter={filter} sort={sort} />
        <Newsletter />
        <Footer />
      </Container>
    </>
  );
};

export default ProductList;
