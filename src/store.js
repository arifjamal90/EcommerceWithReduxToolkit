import { configureStore } from "@reduxjs/toolkit";
import CardSlice from "./Cards/CardSlice";


export  const store = configureStore({
    reducer: {
        counter: CardSlice,
    },
})