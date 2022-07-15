import React from 'react';

const WithLayout: React.FC<any> = (props) => {
  const { component: Component, layout: Layout, ...rest } = props;

  return (
    <Layout>
      <Component {...rest} />
    </Layout>
  );
};

export default WithLayout;
