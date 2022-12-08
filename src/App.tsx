import {makeLogin} from './presentation/factories/pages/login/login-factory';
import {makeSignUp} from './presentation/factories/pages/signup/login-factory';
import {Router} from './presentation/router/router';
import './presentation/styles/global.scss';

function App() {
  return <Router MakeLogin={makeLogin} MakeSignUp={makeSignUp} />;
}

export default App;
