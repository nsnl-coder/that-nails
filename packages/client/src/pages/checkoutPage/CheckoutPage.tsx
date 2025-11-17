import { useEffect } from 'react';
import { SOCKET_EVENT } from '@thatnails/shared';
import socket from '../../config/socket.config';
import { checkinApi, useGetCheckinsQuery } from '../../store/checkins.api';
import { useDispatch } from 'react-redux';

export default function CheckoutPage(): React.JSX.Element {
  const { data: checkins = [] } = useGetCheckinsQuery(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(SOCKET_EVENT.CHECKIN_CREATED, () => {
      console.log('CHECKIN_CREATED');
      dispatch(checkinApi.util.invalidateTags(['Checkins']));
    });
  }, []);

  return (
    <div>
      {checkins.map((checkin) => (
        <div className='flex' key={checkin.id}>
          <p>{checkin.full_name}</p>
          <p>{checkin.phone}</p>
        </div>
      ))}
    </div>
  );
}
