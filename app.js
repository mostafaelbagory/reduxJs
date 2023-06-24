console.log(Redux);
console.log(ReduxThunk);
const baseURL = "http://localhost:5251/";
//--------------------------
// atm actions / reducer
//--------------------------
const atmActionsType = {
  WITHDROW_MONEY: "WITHDROW_MONEY",
  DEPOSITE_MONEY: "DEPOSITE_MONEY",
};

const withdrow = (amount) => {
  return {
    type: atmActionsType.WITHDROW_MONEY,
    payload: amount,
  };
};
const deposite = (amount) => {
  return {
    type: atmActionsType.DEPOSITE_MONEY,
    payload: amount,
  };
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

//--------------------------
// product actions / reducer
//--------------------------
const productActionsType = {
  Add: "ADD",
  Update: "UPDATE",
  Delete: "DLETE",
  Get: "GET",
};

// actions
const addProduct = (product) => {
  return {
    type: productActionsType.Add,
    payload: product,
  };
};

const getProducts = (products) => {
  return {
    type: productActionsType.Get,
    payload: products,
  };
};

const fetchProducts = () => {
  return async (dispatch) => {
    const res = await fetch(baseURL + "Product/GetAlld");
    console.log(res);
    if (res.ok == true) {
      const data = await res.json();
      dispatch(getProducts(data));
    }else{
      document.querySelector("#productsTable").innerHTML = "can't reach the api products you can add by yourself";
      dispatch({})
    }
  };
};
// reducer
const productReducer = (state = [], action) => {
  switch (action.type) {
    case productActionsType.Add:
      return [...state, action.payload];
    case productActionsType.Get:
      return action.payload;
    case productActionsType.Delete:
      return [...state, action.payload];

    default:
      return state;
  }
};
//--------------------------
// Redux reducer / store
//--------------------------
const reducer = Redux.combineReducers({
  atm: atmReducer,
  products: productReducer,
});
const store = Redux.createStore(reducer, Redux.applyMiddleware(ReduxThunk));
store.subscribe(() => {
  console.log("State : ", store.getState());
  crntAmountElmnt.innerHTML = store.getState().atm;
  getTblRow();
});
// dispatch atm
let amount = document.querySelector("#amount");
let crntAmountElmnt = document.querySelector("#crntAmount");
document.querySelector("#withdrow").addEventListener("click", () => {
  store.dispatch(withdrow(+amount.value));
});
document.querySelector("#deposite").addEventListener("click", () => {
  store.dispatch(deposite(+amount.value));
});
// dispatch product
store.dispatch(fetchProducts());
let productsTableElmnt = document.querySelector("#productsTable");
//let rows = "";
let list = store.getState().products;
const getTblRow = () => {
  let list = store.getState().products;
  let rows = "";
  for (let i in list) {
    rows += `<tr id="product-row">
                     <td>${list[i].No}</td>
                     <td>${list[i].Title}</td>
                     <td>${list[i].Price}</td>
                     <td>${list[i].Description}</td>
                  </tr>`;
  }
  productsTableElmnt.innerHTML = rows;
};

document.querySelector("#addProduct").addEventListener("click", () => {
  var maxNo =
  store.getState().products.length == 0 ? 0 : store.getState().products[store.getState().products.length - 1].No;
  console.log(maxNo);
  var product = {
    No: maxNo + 1,
    Title: document.querySelector("#Title").value,
    Price: document.querySelector("#Price").value,
    Description: document.querySelector("#Description").value,
  };
  store.dispatch(addProduct(product));
});
