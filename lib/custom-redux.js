(function () {
  const customRedux = (function () {
    function createStore(reducer) {
      console.log(reducer);
      let state;
      let listners = [];
      const getState = () => state;
      const dispatch = (action) => {
        console.log(action)
        state = reducer(state, action);
        listners.forEach((listner) => listner() )
      };
      const subscribe = (listner) => {
        listners.push(listner);
      };
      
      
      return {
        getState,
        dispatch,
        subscribe,
      };
    }
    return {
      createStore,
    };
  })();

  if (!window.customRedux) {
    window.$redux = window.customRedux = customRedux;
  }
})();
