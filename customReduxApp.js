console.log($redux);
const atmActionsType = {
  WITHDROW_MONEY: "WITHDROW_MONEY",
  DEPOSITE_MONEY: "DEPOSITE_MONEY",
};
const atmReducer = (state = 1000, action) => {
  switch (action.type) {
    case atmActionsType.WITHDROW_MONEY:
      return state - action.payload;
    case atmActionsType.DEPOSITE_MONEY:
      return state + action.payload;
    default:
      return state;
  }
};
const withdrow = (amount) => {
    console.log("withdrow : ", amount);
    return {
      type: atmActionsType.WITHDROW_MONEY,
      payload: amount,
    };
  };
  const deposite = (amount) => {
    console.log("deposite", amount);
  
    return {
      type: atmActionsType.DEPOSITE_MONEY,
      payload: amount,
    };
  };
  
const store = $redux.createStore(atmReducer);

store.subscribe(() => {
    console.log("State : ", store.getState());
  });

store.dispatch(withdrow(500));
