import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartState: false,
  cartItems: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [], // Let Suppose Database
  //Recuperar datos de Storage
  cartTotalAmount: 0,
  cartTotalQantity: 0,
};

const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    //reducers hacemos las funciones que vamos a usar
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    //funcion para agregar producto
    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      ); //Aca traemos todos los articulos seleccionados y vamos revisando si son de igual id

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        //si el id del producto ya existe en el array o estado, suma uno mas en cantidad al producto
        //console.log(itemIndex)
        toast.success("Item QTY Increased");

      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);
        //si id del producto se selecciona por primera vez, se guarda en el array (estado)

        toast.success(`${action.payload.title} added to Cart`);
        //toast es la libreria de notificacion
      }
      
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
      //Guardar datos en Storage
    },
    //funcion para eliminar producto
    setRemoveItemFromCart:(state, action) => {
      const removeItem = state.cartItems.filter((item) => item.id !== action.payload.id);
      //En removeIten vamos a guardar todos los items que no coincidan con el id. que nos da action.payload.id

      state.cartItems = removeItem;
      //Igualamos el estado con los productos almacenados en removeItem  

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      //Guardamos esos datos en Storage

      toast.success(`${action.payload.title} Remove From Cart `)
      //Notificamos el producto eliminado
    },
    setIncreaseItemQTY:(state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      ) ;

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setDecreaseItemQTY:(state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      ) ;

      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success(`Item QTY Decreased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    setClearCartItems:(state, action) => {
      state.cartItems = [];
      toast.success(`Cart Cleared`);
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },  
    setGetTotals: (state, action) => {
      let { totalAmount, totalQTY } = state.cartItems.reduce((cartTotal, cartItem) => {
        const { price, cartQuantity} = cartItem;
        const totalPrice = price * cartQuantity;

        cartTotal.totalAmount += totalPrice;
        cartTotal.totalQTY += cartQuantity;

        return cartTotal;
      }, {
        totalAmount: 0,
        totalQTY: 0,
      });

      state.cartTotalAmount = totalAmount;
      state.cartTotalQantity = totalQTY;
    }  
  },
});

export const { setOpenCart, setCloseCart, setAddItemToCart, setRemoveItemFromCart, setDecreaseItemQTY, setIncreaseItemQTY, setClearCartItems,setGetTotals } =
  CartSlice.actions;
//con cartSlice.actions exportamos las funciones

export const selectCartState = (state) => state.cart.cartState;

export const selectCartItems = (state) => state.cart.cartItems;

export const selectTotalAmount = (state) => state.cart.cartTotalAmount;

export const selectTotalQTY = (state) => state.cart.cartTotalQantity;

export default CartSlice.reducer;

//Eliminar datos de Storage localStorage.removeItem(Apellido)
// Limpiar todo el Storage localStorage.clear()
// localStorage almacena la información de forma indefinida o hasta que se decida 
//limpiar los datos del navegador y sessionStorage almacena información mientras 
//la pestaña donde se esté utilizando siga abierta, una vez cerrada, la información se elimina.