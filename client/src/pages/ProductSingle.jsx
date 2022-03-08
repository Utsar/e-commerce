import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../backend";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Price = styled.span`
  font-weight: 100px;
  font-size: 40px;
`;
// filters
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;

// Add & ammount
const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const AmmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Ammount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const ProductSingle = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {}
    };
    getProduct();
  }, [id]);
  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <Wrapper>
          <ImageContainer>
            <Image src={product.image} />
          </ImageContainer>
          <InfoContainer>
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            <Price>£{product.price}</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize>
                  <FilterSizeOption>0.33cl</FilterSizeOption>
                  <FilterSizeOption>0.5cl</FilterSizeOption>
                  <FilterSizeOption>Six Pack</FilterSizeOption>
                  <FilterSizeOption>Case: 12</FilterSizeOption>
                  <FilterSizeOption>Case: 24</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmmountContainer>
                <Remove style={{ cursor: "pointer" }} />
                <Ammount>1</Ammount>
                <Add style={{ cursor: "pointer" }} />
              </AmmountContainer>
              <Button>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
        <Newsletter />
        <Footer />
      </Container>
    </>
  );
};

export default ProductSingle;
