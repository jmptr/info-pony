import {
  CONNECTED,
  CPU_STAT_RECEIVED,
} from '../../../../shared/action-types';

const webSocketsMiddleware = (store) => {
  const socket = new WebSocket('ws://localhost:8081');

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
