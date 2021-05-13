/* eslint-disable default-case */
export const initialState = {
  order: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_ORDER":
      const index = state.order.findIndex(
        (orderItem) => orderItem.id === action.item.id
      );
      let newOrder = [...state.order];
      if (index >= 0) {
        newOrder[index].count = newOrder[index].count + 1;
      } else {
        newOrder = [...state.order, action.item];
      }
      return {
        ...state,
        order: newOrder,
      };

    case "REMOVE_FROM_ORDER":
      const ind = state.order.findIndex(
        (orderItem) => orderItem.id === action.item.id
      );
      let neworder;
      if (ind >= 0) {
        neworder = state.order.filter(
          (orderItem) => orderItem.id !== action.item.id
        );
        if (action.item.count) neworder = [...neworder, action.item];
      } else {
        console.warn("Removing an item which is not ordered");
        return;
      }
      return {
        ...state,
        order: neworder,
      };

    default:
      return state;
  }
};

export default reducer;
