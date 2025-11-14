import React, { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  setHasUser: Dispatch<SetStateAction<boolean | undefined>>;
}

export default function CheckinSuccess(props: Props): React.JSX.Element {
  const { setHasUser } = props;
  const { reset } = useFormContext();

  useEffect(() => {
    setTimeout(() => {
      setHasUser(undefined);
      reset();
    }, 3000);
  }, []);

  return <div>CheckinSuccess</div>;
}
