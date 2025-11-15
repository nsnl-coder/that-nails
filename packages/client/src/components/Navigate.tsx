import { useEffect } from 'react';
import { useNavigate } from 'react-router';

interface Props {
  to: string;
}

const Navigate = (props: Props): null => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(props.to);
  }, []);

  return null;
};

export default Navigate;
