import type { NextPage } from 'next';
import React from 'react';
import WithLayout from '@components/WithLayout';
import LandingPage from '@views/ViewProduct';
import { Main } from 'src/layouts';

const Index: NextPage = () => {
  return (
    <>
      <WithLayout component={LandingPage} layout={Main} />
    </>
  );
};

export default Index;
