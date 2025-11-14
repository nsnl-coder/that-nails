import { validationSchema } from '@thatnails/shared';
import { useState } from 'react';
import type z from 'zod';
import Button from '../../core-components/button/Button';
import Form from '../../core-components/form/Form';
import { useCreateCheckinMutation } from '../../store/checkins.api';
import CheckinNameInput from './CheckinNameInput';
import CheckinInput from './CheckinPhoneInput';
import CheckinSuccess from './CheckinSuccess';

export default function CheckinPage(): React.JSX.Element {
  const [checkin] = useCreateCheckinMutation();
  const [hasUser, setHasUser] = useState<boolean | undefined>(undefined);

  const handleCheckin = async (
    data: z.infer<typeof validationSchema.checkins.create>,
  ) => {
    const res = await checkin(data).unwrap();
    const hasUser = res.data.hasUser;

    setHasUser(hasUser);
  };

  return (
    <Form
      validationSchema={validationSchema.checkins.create}
      onSubmit={handleCheckin}
    >
      {hasUser === undefined && (
        <div>
          <CheckinInput />
          <Button type="submit">Checkin</Button>
        </div>
      )}
      {hasUser === false && <CheckinNameInput />}
      {hasUser === true && <CheckinSuccess setHasUser={setHasUser} />}
    </Form>
  );
}
