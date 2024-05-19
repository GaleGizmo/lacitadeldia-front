import { configureStore } from "@reduxjs/toolkit";
import { gameReducer } from "./game/game.reducer";
import { userReducer } from "./user/user.reducer";


export default configureStore({
  reducer: {
    gameReducer: gameReducer,
    userReducer: userReducer,
  },
})
 
