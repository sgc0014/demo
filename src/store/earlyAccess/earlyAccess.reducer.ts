import * as EarlyAccessType from './earlyAccess.types';

const INITIAL_STATE = {
  isLoading: false,
  dialogOpen: false,
  messageOpen: false,
  messageTitle: null,
  messageContent: null
};

const earlyAccessReducer = (state = INITIAL_STATE, action:any) => {
  const { type, payload } = action;
  switch (type) {
    case EarlyAccessType.SET_DIALOG_OPEN:
      return {
        ...state,
        dialogOpen: payload
      };

    case EarlyAccessType.SET_MESSAGE_OPEN:
      return {
        ...state,
        messageOpen: payload.value,
        messageTitle: payload.title,
        messageContent: payload.message
      };

    case EarlyAccessType.EARLY_ACCESS_START:
      return {
        ...state,
        isLoading: true
      };

    case EarlyAccessType.EARLY_ACCESS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        messageTitle: 'Early Access Confirmation',
        messageContent: payload.message,
        dialogOpen: false,
        messageOpen: true
      };

    case EarlyAccessType.EARLY_ACCESS_FAIL:
      return {
        ...state,
        isLoading: false,
        dialogOpen: false,
        messageOpen: false
      };

    default:
      return state;
  }
};

export default earlyAccessReducer;
