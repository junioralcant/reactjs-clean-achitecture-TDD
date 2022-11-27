import {makeLogin} from './presentation/factories/pages/login/login-factory';
import {Router} from './presentation/router/router';
import './presentation/styles/global.scss';

function App() {
  return <Router MakeLogin={makeLogin} />;
}

export default App;
