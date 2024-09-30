import React from 'react';
import PropTypes from 'prop-types';

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="border-b pb-2 mb-2">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h2 className="text-xl font-semibold">{children}</h2>;
};

export const CardContent = ({ children }) => {
  return <div className="">{children}</div>;
};


// Define PropTypes for validation
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: '',
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
};
