import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let slugs = ['facebook', 'facebook-view', 'snapchat'];
  const fields: ISitemapField[] = slugs.map((item) => ({
    loc: `https://demo-pi-two.vercel.app/app/${item}`
  }));
  return getServerSideSitemap(ctx, fields);
};
export default function Site() {}
