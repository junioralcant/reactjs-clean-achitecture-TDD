import {useContext} from 'react';
import {CreateContextForm} from '../../contexs/form/form-context';

type Props = {
  text: string;
};

export function SubmitButton({text}: Props) {
  const {state} = useContext(CreateContextForm);

  return (
    <button
      data-testid="submit"
      type="submit"
      disabled={state.isFormInvalid}
    >
      {text}
    </button>
  );
}
