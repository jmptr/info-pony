import {
  CPU_STAT_RECEIVED,
} from '../../../../shared/action-types';

export const createCpuStatReducer = ({ limit }) => {
  const INITIAL_STATE = [];

  return (state = INITIAL_STATE, { meta, payload, type }) => {
    switch (type) {
      case CPU_STAT_RECEIVED:
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
