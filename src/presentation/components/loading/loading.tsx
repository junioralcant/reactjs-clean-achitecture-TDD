import {Spinner} from '../spinner/spinner';
import './loading-styles.scss';

export function Loading() {
  return (
    <div data-testid="loading" className="loadingWrap">
      <div className="loading">
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  );
}
