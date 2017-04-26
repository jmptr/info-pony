import {
  MEMORY_ALERT_CREATED,
  MEMORY_ALERT_UPDATED,
} from '../../../shared/action-types';

export const alertsReducer = () => {
  const INITIAL_STATE = [];

  return (state = INITIAL_STATE, { meta, payload, type }) => {
    switch (type) {
      case MEMORY_ALERT_CREATED: {
        return state.concat(payload);
      }
      case MEMORY_ALERT_UPDATED: {
        const newState = state.slice();
        const existing = state.find((item) => item.captured === payload.captured);
        if (existing) {
          Object.assign(existing, payload);
          return newState;
        }
        return state;
      }
      default:
        return state;
    }
  };
};
