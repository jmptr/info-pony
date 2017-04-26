import {
  CONNECTED,
  INVALID_MESSAGE_RECEIVED,
} from '../../../../shared/action-types';

import config from '../../../../shared/config';

const webSocketsMiddleware = (store) => {
  const socket = new WebSocket(config.websockets.address);

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

    if (payload.type) {
      store.dispatch(payload);
    } else {
      store.dispatch({ type: INVALID_MESSAGE_RECEIVED, payload });
    }
  });
};

export default webSocketsMiddleware;
