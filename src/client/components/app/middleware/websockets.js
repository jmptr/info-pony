import {
  CONNECTED,
  CPU_STAT_RECEIVED,
} from '../../../../shared/action-types';

const webSocketsMiddleware = (store) => {
  const socket = new WebSocket(`${process.env.SOCKET_PROTOCOL}://${process.env.IP_ADDRESS}:${process.env.HTTP_PORT}`);

  socket.addEventListener('open', () => {
    store.dispatch({ type: CONNECTED });
  });

  socket.addEventListener('message', ({ data = '{}' }) => {
    let payload;
    try {
      payload = JSON.parse(data);
    } catch (err) {
      payload = {};
    }
    store.dispatch({ type: CPU_STAT_RECEIVED, payload });
  });
};

export default webSocketsMiddleware;
