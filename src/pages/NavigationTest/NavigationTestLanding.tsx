import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../../components';
import bamboohrLogo from '../../assets/images/bamboohr-logo.svg';
import './NavigationTestLanding.css';

interface ExperienceCardProps {
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  path: string;
  label: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  subtitle,
  description,
  features,
  path,
  label,
}) => (
  <Link to={path} className="experience-card">
    <div className="experience-card-header">
      <span className="experience-card-label">{label}</span>
      <h2 className="experience-card-title">{title}</h2>
      <p className="experience-card-subtitle">{subtitle}</p>
    </div>
    <div className="experience-card-body">
      <p className="experience-card-description">{description}</p>
      <ul className="experience-card-features">
        {features.map((feature, index) => (
          <li key={index}>
            <Icon name="check" size={14} className="feature-check-icon" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="experience-card-footer">
      <span className="experience-card-cta">
        Try this experience
        <Icon name="chevron-right" size={14} />
      </span>
    </div>
  </Link>
);

export const NavigationTestLanding: React.FC = () => {
  return (
    <div className="nav-test-landing">
      <header className="nav-test-header">
        <div className="nav-test-header-content">
          <div className="nav-test-logo">
            <img src={bamboohrLogo} alt="BambooHR" className="nav-test-logo-img" />
          </div>
          <h1 className="nav-test-title">Navigation Experience Test</h1>
          <p className="nav-test-subtitle">
            We're exploring different approaches to make navigation more intuitive across devices.
            Try each experience and share your feedback.
          </p>
        </div>
      </header>

      <main className="nav-test-main">
        <div className="nav-test-grid">
          <ExperienceCard
            label="Experience A"
            title="Panels"
            subtitle="Collapsible Sidebar Panels"
            description="Desktop sidebar collapses to an icon-only rail on mobile. Navigation maintains spatial consistency across breakpoints."
            features={[
              'Desktop: Full sidebar with labels',
              'Tablet: Sidebar collapses to icons',
              'Mobile: Icon rail with overlay panels',
              'Settings: Nested panel structure',
            ]}
            path="/nav-test/panels"
          />

          <ExperienceCard
            label="Experience B"
            title="Dropdowns"
            subtitle="Stacked Dropdown Selectors"
            description="Desktop sidebar transforms into stacked dropdown menus on mobile. Each navigation level becomes a distinct dropdown selector."
            features={[
              'Desktop: Standard sidebar navigation',
              'Mobile: Hamburger + dropdown selectors',
              'Settings: Two stacked dropdowns',
              'Files: Folder dropdown selector',
            ]}
            path="/nav-test/dropdowns"
          />

          <ExperienceCard
            label="Experience C"
            title="Tabs"
            subtitle="Horizontal Scrolling Tabs"
            description="Desktop sidebar transforms into horizontal scrolling tabs on mobile. All navigation levels use the same tab pattern."
            features={[
              'Desktop: Standard sidebar navigation',
              'Mobile: Hamburger + horizontal tabs',
              'Settings: Two rows of tabs',
              'Consistent tab pattern everywhere',
            ]}
            path="/nav-test/tabs"
          />
        </div>

        <div className="nav-test-instructions">
          <h2>How to Test</h2>
          <ol>
            <li>
              <Icon name="chevron-right" size={16} className="instruction-icon" />
              <span>Click on any experience card above to open that navigation prototype</span>
            </li>
            <li>
              <Icon name="arrows-rotate" size={16} className="instruction-icon" />
              <span>Resize your browser window to see how the navigation adapts</span>
            </li>
            <li>
              <Icon name="mobile" size={16} className="instruction-icon" />
              <span>On mobile, try navigating between Home, Files, and Settings</span>
            </li>
            <li>
              <Icon name="sliders" size={16} className="instruction-icon" />
              <span>Pay attention to how nested navigation (like Settings categories) works</span>
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
};

export default NavigationTestLanding;
