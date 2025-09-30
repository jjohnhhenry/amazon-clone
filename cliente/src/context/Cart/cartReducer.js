export const initialState = {
    itemsCart: [],
    itemsForCart: []
}

export const quantityProduct = (myCart) => {

  const newArrary = myCart.map(element => {
      const newElement = element;
      const productWithQuantity = {
          ...newElement,
          quantity: 1
      }
      return productWithQuantity;
  });

  const myCartWithQuantity = newArrary.reduce((acc, count) => {
      const productExist = acc.find(element => element.id === count.id);
      if (productExist) {
      return acc.map(element => {
          if (element.id === count.id) {
          return {
              ...element,
              quantity: element.quantity + 1
          }
          }
          return element;
      });
      }
      return [...acc, count];
  }, []);

  return myCartWithQuantity;
}

const updateState = (objet, state) => {

    const { id, status } = objet;

    if ( status ) {
        return state.filter( elem => elem.id !== id )
    }

    if( !status ) {

        const newState = JSON.parse(JSON.stringify(state));

        const productQ = newState.findIndex(element => element.id === id );

        console.log(productQ)

        if(productQ !== -1) {
            newState.splice(productQ,1);
            console.log(newState)
            return newState;
        }

        return newState;

    }

    
}



const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_CART":
            return {
                ...state,
                itemsCart: [...state.itemsCart, action.payload]
            }
        case "QUIT_PRODUCT":
           return {
             ...state,
             itemsCart: updateState(action.payload, state.itemsCart )
           }
        case "PRODUCTS_FOR_CART":
            return{
                ...state,
                itemsForCart: action.payload
            }
        case "CLEAR_CART":
            return{
                ...state,
                itemsCart: []
            }
        default:
            return state;
    }
};

export default reducer;

