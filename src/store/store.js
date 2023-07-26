import { createStore } from 'vuex'
import axios from 'axios'
const store = createStore({
    state () {
        return {
          token: "",
          isAuthenticated: false,
          cap: localStorage.getItem("cap"),
          username: localStorage.getItem("username"),
          saved: localStorage.getItem("saved")
        }
      },
      mutations: {
        setToken: (state, token)=> {
          state.token = token
          state.isAuthenticated = true
          localStorage.setItem("token", state.token)
          console.log("state.token=", state.token)
        },
        deleteToken: (state)=> {
          state.token = ""
          state.isAuthenticated = false
       
        localStorage.removeItem("token")
        },

        setCap: (state, cap)=>{
          localStorage.setItem("cap", cap)
          state.cap = cap
          console.log(localStorage.getItem("cap"))

        },
        deleteCap: (state)=>{
         localStorage.removeItem("cap")
         state.cap = NaN

        },
        setUsername: (state, username)=>{
          state.username = username
          localStorage.setItem("username", username)
        },
        deleteUsername: (state)=>{
        state.username =  NaN
        localStorage.removeItem("username")
        },
        setSavedSymbols: (state)=>{
        {
          let username = state.username
          let session_url = "/api/user/favourites?username="+username
          
          axios.get(session_url).then((response) =>{
          console.log(new Array(...response.data));
          state.saved = new Array(...response.data).map((obj)=> obj.symbol);
          localStorage.setItem("saved", state.saved)
        }
      ).catch((error)=>{
            console.log(error)
          })
          
  }
        }
        

      }
})

export default store