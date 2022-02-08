import {
  Facebook,
  GitHub,
  Instagram,
  Language,
  MailOutlined,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

// Left side of the footer
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Logo = styled.h1``;
const Description = styled.p`
  margin: 20px 0;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
`;

// Center part of the footer
const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
const Title = styled.h1`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`;

// Right side of the footer
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const Payment = styled.img`
  width: 50%;
  cursror: pointer;
`;

const Footer = () => {
  return (
    <>
      <Container>
        <Left>
          <Logo>Utsar.</Logo>
          <Description>Junior FullStack developer</Description>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="fcba03">
              <Language />
            </SocialIcon>
          </SocialContainer>
        </Left>
        <Center>
          <Title>Quick Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Beers</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Cocktails</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{ marginRight: "10px" }} />
            London. Open for reloaction
          </ContactItem>
          <ContactItem>
            <MailOutlined style={{ marginRight: "10px" }} /> Portfolio
          </ContactItem>
          <ContactItem>
            <GitHub style={{ marginRight: "10px" }} />
            GitHub
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
          {/* https://i.ibb.co/Qfvn4z6/payment.png */}
        </Right>
      </Container>
    </>
  );
};

export default Footer;
