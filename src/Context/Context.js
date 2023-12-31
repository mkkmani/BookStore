import React from "react";

const Context = React.createContext({
  savedList: [],
  cartList: [],
  onClickSave: () => {},
  onClickAddToCart: () => {},
  onClickRemoveBookMark: () => {},
  onClickIncOrDec: () => {},
  onClearSavedList: () => {},
});

export default Context;
