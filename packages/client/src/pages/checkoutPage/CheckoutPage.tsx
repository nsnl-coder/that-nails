import { useEffect } from 'react';
import { SOCKET_EVENT } from '../../../../shared/dist/esm/enum';
import socket from '../../config/socket.config';
import { checkinApi, useGetCheckinsQuery } from '../../store/checkins.api';

export default function CheckoutPage(): React.JSX.Element {
  const { data: checkins = [] } = useGetCheckinsQuery(undefined);

  useEffect(() => {
    socket.on(SOCKET_EVENT.CHECKIN_CREATED, () => {
      checkinApi.util.invalidateTags(['Checkins']);
    });
  }, []);

  return (
    <div>
      {checkins.map((checkin) => (
        <div className="flex" key={checkin.id}>
          <p>{checkin.full_name}</p>
          <p>{checkin.phone}</p>
        </div>
      ))}
    </div>
  );
}
