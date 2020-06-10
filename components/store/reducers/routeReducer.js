const initialState = {
  shop: {
    receiveNew: true,
    all: [],
    delete: [],
  },
  receipt: {
    all: [],
    delete: [],
    currShopReceipt: [],
  },
  new: [],
};

function tagsHandler(state = initialState, action) {
  let nextstate;
  const shop = state.shop;
  switch (action.type) {
    case 'GET_ALL_DATABASE':
      if (shop.all.length > 0) {
        return state;
      }
      nextstate = {
        ...state,
        shop: {
          ...shop,
          receiveNew: false,
          all: [...action.value.shops],
        },
        receipt: {
          ...state.receipt,
          all: [...action.value.receipts],
        },
      };
      return nextstate;
    case 'DELETE_SHOP':
      const tmpAll = shop.all.filter(shop => shop.id !== action.value.id);
      nextstate = {
        ...state,
        shop: {
          ...shop,
          all: [...tmpAll],
          delete: [...shop.delete, action.value],
        },
      };
      return nextstate;

    case 'ADD_RECEIPT':
      nextstate = {
        ...state,
        shop: {
          ...shop,
          //receiveNew: true,
          all: [action.value, ...shop.all],
        },
        new: [...state.new, action.value],
        //TODO ADD RECEIPT
      };
      return nextstate;

    case 'RESET_UPDATE_SHOP':
      nextstate = {
        ...state,
        shop: {
          ...shop,
          delete: [],
        },
        new: [],
      };
      return nextstate;

    case 'RESET_RECEIVE_NEW':
      nextstate = {
        ...state,
        shop: {
          ...shop,
          receiveNew: false,
        },
      };
      return nextstate;
    /*case 'GET_RECEIPT_BY_SHOP_ID':
      nextstate = {
        ...state,
        receipt: {
          ...state.receipt,
          currShopReceipt: state.receipt.all.filter(
            receipt => receipt.shop === action.value,
          ),
        },
      };
      return nextstate;*/
    default:
      return state;
  }
}

export default tagsHandler;
