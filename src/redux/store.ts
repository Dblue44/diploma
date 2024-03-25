import { configureStore } from "@reduxjs/toolkit";
import photoReducer from "./features/photo/photoReducer";
import musicReducer from "./features/music/musicReducer"
import userReducer from "./features/user/userReducer"

const store = configureStore({
    reducer: {
        photo: photoReducer,
        music: musicReducer,
        user: userReducer,
    },
});

export default store;

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;