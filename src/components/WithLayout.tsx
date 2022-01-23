import React from 'react';

const WithLayout: React.FC<any> = (props) => {
  const {  component: Component, ...rest } = props;

  return (
   
      <Component {...rest} />
  );
};

export default WithLayout;
