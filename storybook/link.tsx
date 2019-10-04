import React from 'react';

// Fallback component for links when not inside a next.js app.
const Link = ({ children }) => React.Children.only(children);

export default Link;
