import React from 'react';

const WithLayout: React.FC<any> = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Layout>
      <Component {...rest} />
    </Layout>
  );
};

export default WithLayout;
