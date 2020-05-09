const initialState = {tags: []};

function tagsHandler(state = initialState, action) {
  let nextstate;
  switch (action.type) {
    case 'ADD':
      nextstate = {
        ...state,
        tags: [...state.tags, action.value],
      };
      break;
    default:
      return state;
  }

  return nextstate;
  //return nextState || state
}

export default tagsHandler;
