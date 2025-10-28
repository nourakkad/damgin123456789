import React from 'react';
import './AgeVerification.css';

interface AgeVerificationProps {
  onVerify: (isOver18: boolean) => void;
}

const AgeVerification: React.FC<AgeVerificationProps> = ({ onVerify }) => {
  return (
    <div className="age-verification-overlay">
      <div className="age-verification-modal">
        <h1 className="age-verification-title">The Spirit of Damascus</h1>
        <p className="age-verification-subtitle">
        Ready to begin the journey?<br />
        To step into the world of Damascus Gin, we need to confirm - are you 18 or over?
        </p>
        <div className="age-verification-buttons">
          <button 
            className="age-verification-btn yes"
            onClick={() => onVerify(true)}
          >
            ​YES — Let the journey begin.
          </button>
          <button 
            className="age-verification-btn no"
            onClick={() => onVerify(false)}
          >
          ​NO — Patience, young traveler. Your time will come.
          </button>
        </div>
        <p className="age-verification-disclaimer">
          By entering this site, you acknowledge that you are of legal drinking age 
          and agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export default AgeVerification; 