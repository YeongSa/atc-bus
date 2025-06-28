import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Проверка авторизации...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 