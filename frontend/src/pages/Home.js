import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaNewspaper, FaRobot, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';

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
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ClassifierSection = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 200px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const ResultTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`;

const PredictionCard = styled.div`
  background: ${props => props.prediction === 'real' ?
        'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' :
        'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)'};
  color: white;
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const PredictionText = styled.h2`
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ConfidenceText = styled.p`
  font-size: 1.1rem;
  margin: 0;
  opacity: 0.9;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const MetricCard = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const MetricValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

const ExampleSection = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const ExampleTitle = styled.h3`
  color: white;
  margin-bottom: 1rem;
`;

const ExampleButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ExampleButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Home = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const examples = {
        fake: {
            title: "Scientists Discover Water Causes Cancer",
            content: "A shocking new study reveals that drinking water causes cancer in 99% of cases. Researchers at a made-up university claim that H2O molecules directly attack healthy cells. This groundbreaking discovery will change everything we know about hydration."
        },
        real: {
            title: "Federal Reserve Announces Interest Rate Decision",
            content: "The Federal Reserve announced a 0.25% interest rate increase following their monthly meeting. The decision comes amid ongoing concerns about inflation and economic stability. Fed Chair emphasized the importance of maintaining price stability while supporting employment growth."
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error('Please fill in both title and content');
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            const response = await axios.post('/classify', {
                title: title.trim(),
                content: content.trim()
            });

            setResult(response.data);
            toast.success('Article classified successfully!');
        } catch (error) {
            console.error('Classification error:', error);
            toast.error('Failed to classify article. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const loadExample = (type) => {
        const example = examples[type];
        setTitle(example.title);
        setContent(example.content);
        setResult(null);
    };

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
                        Smart News Classifier
                    </Title>
                    <Subtitle>
                        Detect fake news using advanced AI and natural language processing.
                        Simply paste a news article below to get an instant credibility assessment.
                    </Subtitle>
                </Hero>

                <ClassifierSection>
                    <Form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Label htmlFor="title">Article Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Enter the news article title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                disabled={loading}
                            />
                        </InputGroup>

                        <InputGroup>
                            <Label htmlFor="content">Article Content</Label>
                            <TextArea
                                id="content"
                                placeholder="Paste the full article content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                disabled={loading}
                            />
                        </InputGroup>

                        <SubmitButton type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <FaSpinner className="fa-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <FaNewspaper />
                                    Classify Article
                                </>
                            )}
                        </SubmitButton>
                    </Form>
                </ClassifierSection>

                <ExampleSection>
                    <ExampleTitle>Try Example Articles</ExampleTitle>
                    <ExampleButtons>
                        <ExampleButton onClick={() => loadExample('real')}>
                            Load Real News Example
                        </ExampleButton>
                        <ExampleButton onClick={() => loadExample('fake')}>
                            Load Fake News Example
                        </ExampleButton>
                    </ExampleButtons>
                </ExampleSection>

                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ResultSection>
                            <ResultHeader>
                                <FaRobot />
                                <ResultTitle>Classification Result</ResultTitle>
                            </ResultHeader>

                            <PredictionCard prediction={result.prediction}>
                                <PredictionText>
                                    {result.prediction === 'real' ? (
                                        <FaCheckCircle />
                                    ) : (
                                        <FaExclamationTriangle />
                                    )}
                                    {result.prediction === 'real' ? 'REAL NEWS' : 'FAKE NEWS'}
                                </PredictionText>
                                <ConfidenceText>
                                    Confidence: {(result.confidence * 100).toFixed(1)}%
                                </ConfidenceText>
                            </PredictionCard>

                            <MetricsGrid>
                                <MetricCard>
                                    <MetricLabel>Probability Real</MetricLabel>
                                    <MetricValue>{(result.probability_real * 100).toFixed(1)}%</MetricValue>
                                </MetricCard>
                                <MetricCard>
                                    <MetricLabel>Probability Fake</MetricLabel>
                                    <MetricValue>{(result.probability_fake * 100).toFixed(1)}%</MetricValue>
                                </MetricCard>
                                <MetricCard>
                                    <MetricLabel>Processed Words</MetricLabel>
                                    <MetricValue>{result.processed_text_length}</MetricValue>
                                </MetricCard>
                                <MetricCard>
                                    <MetricLabel>Analysis Time</MetricLabel>
                                    <MetricValue>{new Date(result.timestamp).toLocaleTimeString()}</MetricValue>
                                </MetricCard>
                            </MetricsGrid>
                        </ResultSection>
                    </motion.div>
                )}
            </motion.div>
        </Container>
    );
};

export default Home; 