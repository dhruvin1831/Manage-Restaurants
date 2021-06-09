/* eslint-disable default-case */
export const initialState = {
  order: [],
  user: null,
  page: "Select",
  restroPage: "menu",
  location: null,
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
      let neworder = [];
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

    case "CLEAR_ORDER":
      return {
        ...state,
        order: [],
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;

    case "SET_PAGE":
      return {
        ...state,
        page: action.page,
      };

    case "SET_RESTRO_PAGE":
      return {
        ...state,
        restroPage: action.page,
      };

    case "SET_LOCATION":
      console.log("location set", action.location);
      return {
        ...state,
        location: action.location,
      };
  }
};

export default reducer;
