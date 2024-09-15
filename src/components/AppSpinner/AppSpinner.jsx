import { ClipLoader } from 'react-spinners';
import S from './AppSpinner.module.css';

const AppSpinner = () => {
  return (
    <div className={S.appSpinner}>
      <ClipLoader color={`var(--brand, #8eff00)`} />
      <h3 className="body1">로딩중 &#46;&#46;&#46;</h3>
    </div>
  );
};

export default AppSpinner;
