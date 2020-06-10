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
  shop: {
    all: [],
    delete: [],
  },

  receipt: {
    all: [],
    delete: [],
  },
};

function tagsHandler(state = initialState, action) {
  let nextstate = state;
  let list;
  const stateTag = state.paper.tag;
  const stateInfo = state.paper.info;
  const paper = state.paper;

  switch (action.type) {
    case 'GET_ALL_DATABASE':
      if (state.shop.all.length > 0) {
        return state;
      }
      nextstate = {
        ...state,
        shop: {
          ...state.shop,
          all: [...action.value.shops],
        },
        receipt: {
          ...state.receipt,
          all: [...state.receipt.all, action.value.shop],
        },
      };
      return nextstate;
    case 'DELETE_SHOP':
      const tmpAll = state.shop.all.filter(shop => shop.id !== action.value.id);
      nextstate = {
        ...state,
        shop: {
          all: [...tmpAll],
          delete: [...state.shop.delete, action.value],
        },
      };
      return nextstate;

    case 'RESET_UPDATE_SHOP': {
      nextstate = {
        ...state,
        shop: {
          ...state.shop,
          delete: [],
        },
      };

      return nextstate;
    }
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
