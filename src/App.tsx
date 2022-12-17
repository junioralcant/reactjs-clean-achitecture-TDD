import {makeLogin} from './main/factories/pages/login/login-factory';
import {makeSignUp} from './main/factories/pages/signup/signup-factory';
import {Router} from './presentation/router/router';
import './presentation/styles/global.scss';

function App() {
  return <Router MakeLogin={makeLogin} MakeSignUp={makeSignUp} />;
}

export default App;
