import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled Components
const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 3rem;
  background: white;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #065f46;
`;

const NavLinks = styled.div`
  display: none;
  gap: 2rem;

  @media (min-width: 768px) {
    display: flex;
  }

  a {
    color: #374151;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #065f46;
    }
  }
`;

const Button = styled.button`
  background-color: #065f46;
  color: white;
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #064e3b;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const Section = styled.section`
  padding: 6rem 2rem;
  @media (min-width: 768px) {
    padding: 6rem 5rem;
  }
`;

const Hero = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
  }
`;

const HeroText = styled.div`
  max-width: 600px;
  h2 {
    font-size: 3rem;
    font-weight: 800;
    color: #065f46;
    margin-bottom: 1.5rem;
  }
  p {
    font-size: 1.125rem;
    color: #4b5563;
    margin-bottom: 2rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }

  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  div {
    padding: 1.5rem;
    text-align: center;

    h4 {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.75rem;
      color: #065f46;
    }
    p {
      color: #4b5563;
      font-size: 1rem;
    }
  }
`;

const Footer = styled.footer`
  background: #111827;
  color: #9ca3af;
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
`;

export default function YKSAlaseVentures() {
  return (
    <div style={{ background: "linear-gradient(to bottom, #d1fae5, #fff)" }}>
      {/* Navbar */}
      <Navbar>
        <Logo>YKS Alase Ventures</Logo>
        <NavLinks>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </NavLinks>
        <Button>Get a Quote</Button>
      </Navbar>

      {/* Hero Section */}
      <Section>
        <Hero>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <HeroText>
              <h2>Premium Plywood for Stronger Projects</h2>
              <p>
                Trusted by builders, architects, and designers for high-quality,
                durable plywood that brings beauty and strength to every
                project.
              </p>
              <Button>Shop Now</Button>
            </HeroText>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1678133720771-3057b1ca1d05?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWJmJTIwcGx5d29vZCUyMHNlbGxlcnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Plywood Hero"
              style={{
                borderRadius: "1rem",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            />
          </motion.div>
        </Hero>
      </Section>

      {/* Products Section */}
      <Section style={{ background: "#d1fae5" }} id="products">
        <h3
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: 700,
            color: "#065f46",
            marginBottom: "3rem",
          }}
        >
          Our Products
        </h3>
        <CardGrid>
          {["Marine Plywood", "Furniture Plywood", "Decorative Panels"].map(
            (item, index) => (
              <Card
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1584950967742-2d5ddfa3c840?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBseXdvb2R8ZW58MHx8MHx8fDA%3D"
                  alt={item}
                />
                <div>
                  <h4>{item}</h4>
                  <p>
                    Strong, reliable, and built to last. Perfect for all your
                    building needs.
                  </p>
                </div>
              </Card>
            )
          )}
        </CardGrid>
      </Section>

      {/* About Section */}
      <Section id="about">
        <Hero>
          <img
            src="https://images.unsplash.com/photo-1630509866824-6dbb0ef4f379?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGx5d29vZCUyMHNlbGxlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="About YKS Alase Ventures"
            style={{
              borderRadius: "1rem",
              boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
              maxWidth: "500px",
            }}
          />
          <HeroText>
            <h2>About Us</h2>
            <p>
              With over 20 years of experience, YKS Alase Ventures is dedicated
              to supplying top-quality plywood for construction, furniture, and
              interior design. Our mission is to combine durability with
              sustainability, ensuring excellence in every sheet we deliver.
            </p>
          </HeroText>
        </Hero>
      </Section>

      {/* Contact Section */}
      <Section
        id="contact"
        style={{ background: "#065f46", color: "white", textAlign: "center" }}
      >
        <h3
          style={{
            fontSize: "2.5rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
          }}
        >
          Get in Touch
        </h3>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem" }}>
          Have questions or need a quote? We’d love to hear from you.
        </p>
        <Button style={{ backgroundColor: "white", color: "#065f46" }}>
          Contact Us
        </Button>
      </Section>

      {/* Footer */}
      <Footer>
        <p>
          © {new Date().getFullYear()} YKS Alase Ventures. All rights reserved.
        </p>
      </Footer>
    </div>
  );
}
