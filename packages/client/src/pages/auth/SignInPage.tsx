import { validationSchema } from '@thatnails/shared';
import { useDispatch } from 'react-redux';
import type z from 'zod';
import Button from '../../core-components/button/Button';
import Form from '../../core-components/form/Form';
import FormContainer from '../../core-components/form/FormContainer';
import Heading from '../../core-components/heading/Heading';
import Input from '../../core-components/input/Input';
import { useSignInMutation } from '../../store/auth.api';
import { userSliceActions } from '../../store/user.slice';

const SignInPage = () => {
  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const onSubmit = async (
    data: z.infer<typeof validationSchema.auth.signIn>,
  ) => {
    const res = await signIn(data).unwrap();
    dispatch(userSliceActions.setUser(res));
  };

  return (
    <Form
      className="flex items-center justify-center h-screen "
      validationSchema={validationSchema.auth.signIn}
      onSubmit={onSubmit}
    >
      <FormContainer className="w-80 shrink-0">
        <Heading.H1>Sign In</Heading.H1>
        <Input.Group>
          <Input.Container>
            <Input.Text
              placeholder="Email or Phone"
              fieldName="emailOrPhone"
              id="emailOrPhone"
              defaultValue="chris@gmail.com"
            />
            <Input.Error fieldName="emailOrPhone" />
          </Input.Container>
          <Input.Container>
            <Input.Text
              placeholder="Password"
              fieldName="password"
              id="password"
              defaultValue="123456789"
            />
            <Input.Error fieldName="password" />
          </Input.Container>
        </Input.Group>
        <Button type="submit">Sign In</Button>
      </FormContainer>
    </Form>
  );
};

export default SignInPage;
