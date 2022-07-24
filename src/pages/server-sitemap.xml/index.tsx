import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  let slugs = ['facebook', 'facebook-view', 'snapchat',
'aviary-for-twitter',
'secretmanager',
'secretpath-find-way-home',
'secretstring',
'secrettext',
'secretvault-pro-lock-photos',
'secreta-beauty-lab',
'secretalk',
'secretari',
'secretaria-es',
'secretary-run',
'secretaria-de-cultura',
'secretaria-de-educacion-tamaulipas'

];
  const fields: ISitemapField[] = slugs.map((item) => ({
    loc: `https://demo-pi-two.vercel.app/app/${item}`
  }));
  return getServerSideSitemap(ctx, fields);
};
export default function Site() {}
