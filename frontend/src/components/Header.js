import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaNewspaper, FaRobot, FaInfo, FaChartBar } from 'react-icons/fa';

const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #333;
  font-weight: 700;
  font-size: 1.5rem;
  
  &:hover {
    color: #667eea;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #666;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }
  
  ${props => props.active && `
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  `}
  
  @media (max-width: 768px) {
    padding: 0.5rem;
    
    span {
      display: none;
    }
  }
`;

const Header = () => {
    const location = useLocation();

    return (
        <HeaderContainer>
            <Nav>
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Logo to="/">
                        <FaRobot />
                        Smart News Classifier
                    </Logo>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <NavLinks>
                        <NavLink
                            to="/"
                            active={location.pathname === '/'}
                        >
                            <FaNewspaper />
                            <span>Classify</span>
                        </NavLink>

                        <NavLink
                            to="/model-info"
                            active={location.pathname === '/model-info'}
                        >
                            <FaChartBar />
                            <span>Model Info</span>
                        </NavLink>

                        <NavLink
                            to="/about"
                            active={location.pathname === '/about'}
                        >
                            <FaInfo />
                            <span>About</span>
                        </NavLink>
                    </NavLinks>
                </motion.div>
            </Nav>
        </HeaderContainer>
    );
};

export default Header; 