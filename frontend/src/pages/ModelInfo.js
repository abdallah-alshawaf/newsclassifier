import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaChartBar, FaRobot, FaSpinner, FaSync, FaInfoCircle, FaClock } from 'react-icons/fa';
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

const Section = styled.section`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: #666;
  font-size: 1.1rem;
`;

const ErrorContainer = styled.div`
  background: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  padding: 1rem;
  color: #c33;
  text-align: center;
`;

const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MetricCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    transform: translateY(-2px);
  }
`;

const MetricValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 0.5rem;
`;

const MetricLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
`;

const InfoTitle = styled.h4`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const InfoContent = styled.div`
  color: #666;
  line-height: 1.5;
`;

const ActionButton = styled.button`
  background: ${props => props.danger ?
        'linear-gradient(135deg, #f44336 0%, #d32f2f 100%)' :
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  
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

const ClassificationReport = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1rem;
`;

const ReportTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const ReportHeader = styled.th`
  background: #667eea;
  color: white;
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
`;

const ReportCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
  color: #666;
`;

const ModelInfo = () => {
    const [modelInfo, setModelInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [training, setTraining] = useState(false);
    const [error, setError] = useState(null);

    const fetchModelInfo = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('/model-info');
            setModelInfo(response.data);
        } catch (error) {
            console.error('Error fetching model info:', error);
            setError('Failed to fetch model information');
        } finally {
            setLoading(false);
        }
    };

    const handleRetrain = async () => {
        if (!window.confirm('Are you sure you want to retrain the model? This may take a few minutes.')) {
            return;
        }

        try {
            setTraining(true);
            toast.loading('Training model...', { id: 'training' });

            const response = await axios.post('/train', { retrain: true });

            toast.success('Model retrained successfully!', { id: 'training' });

            // Refresh model info
            await fetchModelInfo();

        } catch (error) {
            console.error('Error retraining model:', error);
            toast.error('Failed to retrain model', { id: 'training' });
        } finally {
            setTraining(false);
        }
    };

    useEffect(() => {
        fetchModelInfo();
    }, []);

    if (loading) {
        return (
            <Container>
                <Hero>
                    <Title>
                        <FaChartBar style={{ marginRight: '1rem' }} />
                        Model Information
                    </Title>
                    <Subtitle>
                        Real-time performance metrics and training information
                    </Subtitle>
                </Hero>

                <Section>
                    <LoadingContainer>
                        <FaSpinner className="fa-spin" style={{ marginRight: '1rem' }} />
                        Loading model information...
                    </LoadingContainer>
                </Section>
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Hero>
                    <Title>
                        <FaChartBar style={{ marginRight: '1rem' }} />
                        Model Information
                    </Title>
                    <Subtitle>
                        Real-time performance metrics and training information
                    </Subtitle>
                </Hero>

                <Section>
                    <ErrorContainer>
                        <FaInfoCircle style={{ marginRight: '0.5rem' }} />
                        {error}
                    </ErrorContainer>
                    <ActionButton onClick={fetchModelInfo}>
                        <FaSync />
                        Retry
                    </ActionButton>
                </Section>
            </Container>
        );
    }

    const metrics = modelInfo?.metrics || {};
    const classificationReport = metrics.classification_report || {};

    return (
        <Container>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Hero>
                    <Title>
                        <FaChartBar style={{ marginRight: '1rem' }} />
                        Model Information
                    </Title>
                    <Subtitle>
                        Real-time performance metrics and training information
                    </Subtitle>
                </Hero>

                <Section>
                    <SectionTitle>
                        <FaRobot />
                        Model Performance
                    </SectionTitle>

                    <MetricsGrid>
                        <MetricCard>
                            <MetricValue>
                                {metrics.train_accuracy ? (metrics.train_accuracy * 100).toFixed(1) + '%' : 'N/A'}
                            </MetricValue>
                            <MetricLabel>Training Accuracy</MetricLabel>
                        </MetricCard>

                        <MetricCard>
                            <MetricValue>
                                {metrics.test_accuracy ? (metrics.test_accuracy * 100).toFixed(1) + '%' : 'N/A'}
                            </MetricValue>
                            <MetricLabel>Test Accuracy</MetricLabel>
                        </MetricCard>

                        <MetricCard>
                            <MetricValue>
                                {metrics.training_samples || 'N/A'}
                            </MetricValue>
                            <MetricLabel>Training Samples</MetricLabel>
                        </MetricCard>

                        <MetricCard>
                            <MetricValue>
                                {metrics.test_samples || 'N/A'}
                            </MetricValue>
                            <MetricLabel>Test Samples</MetricLabel>
                        </MetricCard>
                    </MetricsGrid>

                    <InfoGrid>
                        <InfoCard>
                            <InfoTitle>Model Details</InfoTitle>
                            <InfoContent>
                                <p><strong>Type:</strong> {modelInfo.model_type || 'N/A'}</p>
                                <p><strong>Features:</strong> {metrics.features_count || 'N/A'}</p>
                                <p><strong>Trained:</strong> {
                                    modelInfo.trained_at ?
                                        new Date(modelInfo.trained_at).toLocaleString() :
                                        'N/A'
                                }</p>
                            </InfoContent>
                        </InfoCard>

                        <InfoCard>
                            <InfoTitle>Training Configuration</InfoTitle>
                            <InfoContent>
                                <p><strong>Algorithm:</strong> Logistic Regression</p>
                                <p><strong>Vectorization:</strong> TF-IDF</p>
                                <p><strong>Max Features:</strong> 5,000</p>
                                <p><strong>N-grams:</strong> 1-2</p>
                            </InfoContent>
                        </InfoCard>
                    </InfoGrid>

                    <ActionButton onClick={handleRetrain} disabled={training}>
                        {training ? (
                            <>
                                <FaSpinner className="fa-spin" />
                                Retraining...
                            </>
                        ) : (
                            <>
                                <FaSync />
                                Retrain Model
                            </>
                        )}
                    </ActionButton>
                </Section>

                {classificationReport && Object.keys(classificationReport).length > 0 && (
                    <Section>
                        <SectionTitle>
                            <FaChartBar />
                            Detailed Classification Report
                        </SectionTitle>

                        <ClassificationReport>
                            <InfoTitle>Per-Class Performance</InfoTitle>
                            <ReportTable>
                                <thead>
                                    <tr>
                                        <ReportHeader>Class</ReportHeader>
                                        <ReportHeader>Precision</ReportHeader>
                                        <ReportHeader>Recall</ReportHeader>
                                        <ReportHeader>F1-Score</ReportHeader>
                                        <ReportHeader>Support</ReportHeader>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(classificationReport).map(([key, value]) => {
                                        if (typeof value === 'object' && value.precision !== undefined) {
                                            const className = key === '0' ? 'Fake News' : key === '1' ? 'Real News' : key;
                                            return (
                                                <tr key={key}>
                                                    <ReportCell><strong>{className}</strong></ReportCell>
                                                    <ReportCell>{(value.precision * 100).toFixed(1)}%</ReportCell>
                                                    <ReportCell>{(value.recall * 100).toFixed(1)}%</ReportCell>
                                                    <ReportCell>{(value['f1-score'] * 100).toFixed(1)}%</ReportCell>
                                                    <ReportCell>{value.support}</ReportCell>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })}
                                </tbody>
                            </ReportTable>
                        </ClassificationReport>
                    </Section>
                )}

                <Section>
                    <SectionTitle>
                        <FaInfoCircle />
                        Model Status
                    </SectionTitle>

                    <InfoGrid>
                        <InfoCard>
                            <InfoTitle>Current Status</InfoTitle>
                            <InfoContent>
                                <p><strong>Status:</strong> {modelInfo ? 'Active' : 'Not Loaded'}</p>
                                <p><strong>Last Updated:</strong> {
                                    modelInfo?.trained_at ?
                                        new Date(modelInfo.trained_at).toLocaleString() :
                                        'Never'
                                }</p>
                                <p><strong>Ready for Predictions:</strong> {modelInfo ? 'Yes' : 'No'}</p>
                            </InfoContent>
                        </InfoCard>

                        <InfoCard>
                            <InfoTitle>Performance Summary</InfoTitle>
                            <InfoContent>
                                <p>The model shows {metrics.test_accuracy ?
                                    `${(metrics.test_accuracy * 100).toFixed(1)}% accuracy` :
                                    'unknown accuracy'} on the test set.</p>
                                <p>Training completed with {metrics.training_samples || 'unknown'} samples.</p>
                                <p>Model is optimized for balanced precision and recall.</p>
                            </InfoContent>
                        </InfoCard>
                    </InfoGrid>
                </Section>
            </motion.div>
        </Container>
    );
};

export default ModelInfo; 