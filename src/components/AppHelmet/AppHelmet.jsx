import { Helmet } from 'react-helmet-async';
import { string } from 'prop-types';

AppHelmet.propTypes = {
  title: string.isRequired,
};

function AppHelmet({ title }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content="나만의 인생 여행지를 올려 다른 사람들과 공유하고, 가장 높은 순위를 가진 여행지를 선정해 보세요."
        />
        <meta property="og:title" content="마이트립픽" />
        <meta property="og:type" content="site" />
        <meta
          property="og:description"
          content="나만의 인생 여행지를 올려 다른 사람들과 공유하고, 가장 높은 순위를 가진 여행지를 선정해 보세요."
        />
        <meta property="og:site:author" content="리액트에서-구해조" />
      </Helmet>
    </>
  );
}
export default AppHelmet;
