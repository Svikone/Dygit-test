export const SHOW_NATIFICATION = 'SHOW_NATIFICATION';
export const HIDE_NATIFICATION = 'HIDE_NATIFICATION';

export const showNatification = (payload) => ({
  type: SHOW_NATIFICATION,
  payload,
});

export const hideNatification = () => ({
  type: HIDE_NATIFICATION,
});
