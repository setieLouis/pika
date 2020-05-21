const initialState = {
  paper: {
    tag: {
      tags: [],
      updateTags: [],
      deleteTags: [],
    },
    info: {
      infos: [],
      deleteInfos: [],
    },
  },
};

function tagsHandler(state = initialState, action) {
  let nextstate;
  let list;
  const stateTag = state.paper.tag;
  const stateInfo = state.paper.info;
  const paper = state.paper;

  switch (action.type) {
    case 'ADD_NEW_TAGS':
      nextstate = {
        ...state,
        paper: {
          ...paper,
          tag: {
            ...stateTag,
            tags: [...stateTag.tags, action.value],
          },
        },
      };
      break;
    case 'UPDATE_TAG':
      list = stateTag.tags.filter(tag => tag.id !== action.value.id);
      nextstate = {
        ...state,
        paper: {
          ...paper,
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
          ...paper,
          tag: {
            ...stateTag,
            tags: [...action.value],
          },
        },
      };
      break;
    case 'DELETE_TAG':
      list = stateTag.tags.filter(tag => tag.id !== action.value.id);
      nextstate = {
        ...state,
        paper: {
          ...paper,
          tag: {
            ...stateTag,
            tags: [...list],
            deleteTags: [...stateTag.deleteTags, action.value],
          },
        },
      };
      break;
    case 'ADD_INFO_LIST':
      nextstate = {
        ...state,
        paper: {
          ...paper,
          info: {
            ...stateInfo,
            infos: [...action.value],
          },
        },
      };
      break;
    case 'DELETE_INFO':
      list = stateTag.tags.filter(tag => tag.id !== action.value.id);
      nextstate = {
        ...state,
        paper: {
          ...paper,
          info: {
            ...stateInfo,
            infos: [...list],
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
