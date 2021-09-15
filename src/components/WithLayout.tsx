import React from 'react';

interface Props {
  component: React.FC;
  layout: React.FC;
}

const WithLayout: React.FC<Props> = (props) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Layout>
      <Component {...rest} />
    </Layout>
  );
};

export default WithLayout;
