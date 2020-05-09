const initialState = {
  paper: {
    tag: {
      tags: [],
      updateTags: [],
      deleteTags: [],
    },
  },
};

function tagsHandler(state = initialState, action) {
  let nextstate;
  const stateTag = state.paper.tag;
  switch (action.type) {
    case 'ADD_NEW_TAGS':
      nextstate = {
        ...state,
        paper: {
          tag: {
            ...stateTag,
            tags: [...stateTag.tags, action.value],
          },
        },
      };
      break;
    case 'UPDATE_TAG':
      const list = stateTag.tags.filter(tag => tag.id !== action.value.id);
      console.log(list);
      nextstate = {
        ...state,
        paper: {
          tag: {
            ...stateTag,
            tags: [...list, action.value],
            updateTags: [...stateTag.updateTags, action.value],
          },
        },
      };
      break;

    case 'ADD_TAG_LIST':
      nextstate = {
        ...state,
        paper: {
          tag: {
            ...stateTag,
            tags: [...action.value],
          },
        },
      };
      break;
    case 'DELETE_TAG':
      let tmp = stateTag.tags.filter(tag => tag.id !== action.value.id);
      nextstate = {
        ...state,
        paper: {
          tag: {
            ...stateTag,
            tags: [...tmp],
            deleteTags: [...stateTag.deleteTags, action.value],
          },
        },
      };
      break;
    default:
      return state;
  }
  return nextstate;
  //return nextState || state
}

export default tagsHandler;
