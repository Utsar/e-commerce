import styled from "styled-components";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Add, Remove } from "@material-ui/icons";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../backend";
import { useNavigate } from "react-router-dom";

const KEY = process.env.REACT_APP_STRIPE;

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
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();

  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken,
          amount: cart.total * 100,
        });
        navigate("success", { data: res.data });
      } catch (error) {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);
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
              {cart.products.map((product) => (
                <Product>
                  <ProductDetail>
                    <Image src={product.image} />
                    <Details>
                      <ProductName>
                        <b>Product: </b>
                        {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID: </b>
                        {product._id}
                      </ProductId>
                      <ProductSize>
                        <b>Size: </b>
                        {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmmountContainer>
                      <Add />
                      <ProductAmmount>{product.quantity}</ProductAmmount>
                      <Remove />
                    </ProductAmmountContainer>
                    <ProductPrice>
                      £{product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetail>
                </Product>
              ))}
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal:</SummaryItemText>
                <SummaryItemTotal>£ {cart.total}</SummaryItemTotal>
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
                <SummaryItemTotal>£ {cart.total}</SummaryItemTotal>
              </SummaryItem>
              <StripeCheckout
                name="Hire Utsar"
                image="https://images.pexels.com/photos/7148673/pexels-photo-7148673.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total}`}
                amount={cart.total * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECK-OUT</Button>
              </StripeCheckout>
            </Summary>
          </Bottom>
        </Wrapper>
        <Footer />
      </Container>
    </>
  );
};

export default Cart;
