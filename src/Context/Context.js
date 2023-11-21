import React from "react";

const Context = React.createContext({
  savedList: [],
  cartList: [],
  onClickSave: () => {},
  onClickAddToCart: () => {},
});

export default Context;