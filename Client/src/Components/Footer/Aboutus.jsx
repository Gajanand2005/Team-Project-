import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AboutUsContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
  padding: 1.5rem;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #2d3748;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #4a5568;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  line-height: 1.7;
  color: #718096;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  padding-left: 1.5rem;
  color: #718096;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const Strong = styled.strong`
  color: #2d3748;
`;

const CenterSection = styled.section`
  text-align: center;
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  padding: 2rem;
  border-radius: 0.5rem;
  margin-top: 2rem;
`;

const ItalicParagraph = styled.p`
  font-style: italic;
  font-size: 1.1rem;
  color: #718096;
`;

const Signature = styled.p`
  font-weight: bold;
  color: #2d3748;
  margin-top: 0.5rem;
`;

const Aboutus = () => {
  return (
    <AboutUsContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>About Us</Title>

      <Section>
        <SectionTitle>Our Story</SectionTitle>
        <Paragraph>
          Established in the pivotal year of 2020, S-mal was founded on the belief that fashion should be both expressive and accessible. Born during a challenging time, our brand was built as a symbol of creativity, resilience, and style, all driven by a shared family vision.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>Meet the Founders</SectionTitle>
        <Paragraph>
          S-mal is proudly led by the Malhotra family, whose diverse talents combine to bring our collections to life:
        </Paragraph>
        <List>
          <ListItem><Strong>Sapna Malhotra (Owner):</Strong> As the visionary founder and main owner, Sapna sets the aesthetic direction for the brand, ensuring every piece reflects our core values of quality and timeless design.</ListItem>
          <ListItem><Strong>Simran Malhotra (Co-Owner):</Strong> Simran brings a meticulous eye for detail and operational excellence, ensuring a smooth and enjoyable experience from the moment you browse to the moment your order arrives.</ListItem>
          <ListItem><Strong>Ruby Malhotra (Co-Owner):</Strong> Ruby focuses on community engagement and customer connection, striving to build a loyal customer base and fostering a relationship based on trust and style advice.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>Our Mission</SectionTitle>
        <Paragraph>
          Since our launch in 2020, our mission has been simple: To offer curated clothing that empowers you to look and feel your best. We are committed to high-quality fabrics, sustainable practices, or trend-setting styles while providing a personal touch that only a family-run business can offer.
        </Paragraph>
        <Paragraph>
          We believe that fashion is personal, and we are thrilled to be part of your style journey.
        </Paragraph>
      </Section>

      <CenterSection>
        <ItalicParagraph>
          Thank you for supporting our dream.
        </ItalicParagraph>
        <Signature>
          — Sapna, Simran, and Ruby Malhotra
        </Signature>
      </CenterSection>
    </AboutUsContainer>
  );
};

export default Aboutus;


