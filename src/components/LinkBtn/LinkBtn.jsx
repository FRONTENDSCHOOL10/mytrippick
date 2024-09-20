import { Link } from 'react-router-dom';
import { string, node, bool } from 'prop-types';
import clsx from 'clsx';
import S from './LinkBtn.module.css';

LinkBtn.propTypes = {
  link: string.isRequired,
  children: node.isRequired,
  small: bool,
};

function LinkBtn({ link = '', children, small = false, ...restProps }) {
  const Styles = small
    ? clsx(S.component, S.small)
    : clsx(S.component, S.large);
  return (
    <>
      <Link to={link} className={Styles} {...restProps}>
        {children}
      </Link>
    </>
  );
}

export default LinkBtn;
