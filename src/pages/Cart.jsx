import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";

// top
const Container = styled.div``;
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;
const TopTextContainer = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  margin: 0px 10px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

// bottom
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const Info = styled.div`
  flex: 3;
`;

// product
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;
const ProductDetail = styled.div`
  display: flex;
  flex: 2;
`;
const Image = styled.img`
  width: 100px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span``;
const ProductId = styled.span``;
const ProductSize = styled.span``;
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProductAmmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

//Summary
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;
const SummaryItemTotal = styled.span``;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  return (
    <>
      <Container>
        <Announcement />
        <Navbar />
        <Wrapper>
          <Title>YOUR BASKET</Title>
          <Top>
            <TopButton>CONTINUE SHOPPING</TopButton>
            <TopTextContainer>
              <TopText>Shopping Basket (2)</TopText>
              <TopText>Whish List (0)</TopText>
            </TopTextContainer>
            <TopButton type="filled">CHECK OUT NOW</TopButton>
          </Top>
          <Bottom>
            <Info>
              <Product>
                <ProductDetail>
                  <Image src="https://www.birraperoni.it/wp-content/uploads/2021/06/Peroni-33-Cruda.png" />
                  <Details>
                    <ProductName>
                      <b>Product: </b>Peroni Cruda
                    </ProductName>
                    <ProductId>
                      <b>ID: </b>123456
                    </ProductId>
                    <ProductSize>
                      <b>Size: </b>0.33cl
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmmountContainer>
                    <Add />
                    <ProductAmmount>1</ProductAmmount>
                    <Remove />
                  </ProductAmmountContainer>
                  <ProductPrice>£ 5</ProductPrice>
                </PriceDetail>
              </Product>
              <Hr />
              <Product>
                <ProductDetail>
                  <Image src="https://www.birraperoni.it/wp-content/uploads/2021/06/Peroni-33-Cruda.png" />
                  <Details>
                    <ProductName>
                      <b>Product: </b>Peroni Cruda
                    </ProductName>
                    <ProductId>
                      <b>ID: </b>123456
                    </ProductId>
                    <ProductSize>
                      <b>Size: </b>0.33cl
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmmountContainer>
                    <Remove />
                    <ProductAmmount>1</ProductAmmount>
                    <Add />
                  </ProductAmmountContainer>
                  <ProductPrice>£ 5</ProductPrice>
                </PriceDetail>
              </Product>
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal:</SummaryItemText>
                <SummaryItemTotal>£ 25</SummaryItemTotal>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Estimated Shipping:</SummaryItemText>
                <SummaryItemTotal>£ 5</SummaryItemTotal>
              </SummaryItem>
              <SummaryItem>
                <SummaryItemText>Discount:</SummaryItemText>
                <SummaryItemTotal>-£ 2</SummaryItemTotal>
              </SummaryItem>
              <SummaryItem type="total">
                <SummaryItemText>Total:</SummaryItemText>
                <SummaryItemTotal>£ 30</SummaryItemTotal>
              </SummaryItem>
              <Button>CHECK-OUT</Button>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

export default Cart;
