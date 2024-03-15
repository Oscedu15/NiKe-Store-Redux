import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./CartSlice.js";
 "./CartSlice";

const Store = configureStore({
    reducer: {
        cart: CartSlice
    }
});

export default Store