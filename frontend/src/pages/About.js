import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRobot, FaBrain, FaCode, FaChartLine, FaShieldAlt, FaLightbulb } from 'react-icons/fa';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Hero = styled.section`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const Section = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SectionContent = styled.div`
  color: #666;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FeatureCard = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  color: #667eea;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.5;
`;

const TechStack = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const TechCategory = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
`;

const TechCategoryTitle = styled.h4`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const TechList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const TechItem = styled.li`
  color: #666;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
  
  &:before {
    content: "•";
    color: #667eea;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const ProcessStep = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border-left: 4px solid #667eea;
`;

const StepNumber = styled.span`
  background: #667eea;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
`;

const StepTitle = styled.h4`
  display: inline;
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const StepDescription = styled.p`
  color: #666;
  margin-top: 0.5rem;
  line-height: 1.5;
`;

const About = () => {
  const features = [
    {
      icon: <FaBrain />,
      title: "Advanced NLP",
      description: "Uses sophisticated natural language processing techniques including tokenization, lemmatization, and TF-IDF vectorization to understand text patterns."
    },
    {
      icon: <FaShieldAlt />,
      title: "High Accuracy",
      description: "Trained machine learning model with robust preprocessing pipeline delivers reliable fake news detection with confidence scores."
    },
    {
      icon: <FaLightbulb />,
      title: "Real-time Analysis",
      description: "Instant classification of news articles with detailed probability breakdowns and processing metrics."
    }
  ];

  const techStack = {
    "Machine Learning": [
      "scikit-learn",
      "NLTK",
      "TF-IDF Vectorization",
      "Logistic Regression",
      "Text Preprocessing"
    ],
    "Backend": [
      "FastAPI",
      "Python",
      "Uvicorn",
      "Pydantic",
      "Joblib"
    ],
    "Frontend": [
      "React",
      "Styled Components",
      "Framer Motion",
      "Axios",
      "React Router"
    ],
    "Development": [
      "Git",
      "Node.js",
      "Python Virtual Environment",
      "REST API",
      "CORS"
    ]
  };

  const processSteps = [
    {
      title: "Text Preprocessing",
      description: "Clean and normalize the input text by removing URLs, special characters, and stop words. Apply tokenization and lemmatization."
    },
    {
      title: "Feature Extraction",
      description: "Convert processed text into numerical features using TF-IDF vectorization with n-grams to capture semantic meaning."
    },
    {
      title: "Model Prediction",
      description: "Feed features into trained Logistic Regression model to classify the article and generate probability scores."
    },
    {
      title: "Result Analysis",
      description: "Return classification result with confidence metrics and detailed probability breakdown for transparency."
    }
  ];

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Hero>
          <Title>
            <FaRobot style={{ marginRight: '1rem' }} />
            About Smart News Classifier
          </Title>
          <Subtitle>
            An end-to-end machine learning application that combines advanced NLP techniques 
            with modern web technologies to detect fake news and misinformation.
          </Subtitle>
        </Hero>

        <Section>
          <SectionTitle>
            <FaLightbulb />
            Project Overview
          </SectionTitle>
          <SectionContent>
            <p>
              The Smart News Classifier is a comprehensive machine learning web application designed to 
              combat misinformation by automatically detecting fake news articles. This project demonstrates 
              the practical application of natural language processing, machine learning, and full-stack 
              web development.
            </p>
            <br />
            <p>
              Built with a focus on accuracy, usability, and transparency, the application provides users 
              with not just a classification result, but also detailed confidence metrics and probability 
              breakdowns to help them understand how the AI arrived at its conclusion.
            </p>
          </SectionContent>

          <FeatureGrid>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FeatureCard>
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureCard>
              </motion.div>
            ))}
          </FeatureGrid>
        </Section>

        <Section>
          <SectionTitle>
            <FaCode />
            Technology Stack
          </SectionTitle>
          <SectionContent>
            <p>
              This project leverages a modern technology stack that combines the power of Python's 
              machine learning ecosystem with React's component-based frontend architecture.
            </p>
          </SectionContent>

          <TechStack>
            {Object.entries(techStack).map(([category, technologies]) => (
              <TechCategory key={category}>
                <TechCategoryTitle>{category}</TechCategoryTitle>
                <TechList>
                  {technologies.map((tech, index) => (
                    <TechItem key={index}>{tech}</TechItem>
                  ))}
                </TechList>
              </TechCategory>
            ))}
          </TechStack>
        </Section>

        <Section>
          <SectionTitle>
            <FaChartLine />
            How It Works
          </SectionTitle>
          <SectionContent>
            <p>
              The classification process involves several sophisticated steps that transform raw text 
              into actionable insights:
            </p>
          </SectionContent>

          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProcessStep>
                <StepNumber>{index + 1}</StepNumber>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </ProcessStep>
            </motion.div>
          ))}
        </Section>

        <Section>
          <SectionTitle>
            <FaBrain />
            Machine Learning Approach
          </SectionTitle>
          <SectionContent>
            <p>
              The core of this application is a carefully designed machine learning pipeline that 
              processes text data through multiple stages:
            </p>
            <br />
            <ul style={{ paddingLeft: '2rem', lineHeight: '1.8' }}>
              <li><strong>Text Preprocessing:</strong> Comprehensive cleaning including URL removal, 
              special character handling, tokenization, and lemmatization using NLTK.</li>
              <li><strong>Feature Engineering:</strong> TF-IDF vectorization with n-gram analysis 
              to capture both individual words and phrase patterns.</li>
              <li><strong>Model Training:</strong> Logistic Regression classifier trained on 
              preprocessed text features with cross-validation for robust performance.</li>
              <li><strong>Evaluation:</strong> Comprehensive metrics including accuracy, precision, 
              recall, and F1-score to ensure reliable predictions.</li>
            </ul>
            <br />
            <p>
              The model is designed to be both accurate and interpretable, providing confidence 
              scores and probability distributions to help users understand the reasoning behind 
              each classification.
            </p>
          </SectionContent>
        </Section>
      </motion.div>
    </Container>
  );
};

export default About; 