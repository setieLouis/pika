const initialState = {tags: []};

function tagsHandler(state = initialState, action) {
  let nextstate;
  console.log('_____________________')
  console.log(action)
  switch (action.type) {
    case 'ADD_NEW_TAGS':
      nextstate = {
        ...state,
        tags: [...state.tags, action.value],
      };
      break;
    case 'UPDATE_TAG':
      const list = state.tags.filter(tag => tag.id !== action.value.id);
      console.log(list);
      nextstate = {
        ...state,
        tags: [...list, action.value],
      };
      break;

    case 'ADD_TAG_LIST':
      nextstate = {
        ...state,
        tags: [...state.tags, ...action.value],
      };

      break;
    default:
      return state;
  }
  console.log('__________Fne_________')
  return nextstate;
  //return nextState || state
}

export default tagsHandler;
