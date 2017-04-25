import {
  MEMORY_STAT_RECEIVED,
} from '../../../shared/action-types';

export const createMemoryStatReducer = ({ limit }) => {
  const INITIAL_STATE = [];

  return (state = INITIAL_STATE, { meta, payload, type }) => {
    switch (type) {
      case MEMORY_STAT_RECEIVED:
        state = state.concat(payload);
        if (state.length > limit) {
          state = state.slice(state.length - limit, state.length);
        }
        return state;
      default:
        return state;
    }
  };
};
