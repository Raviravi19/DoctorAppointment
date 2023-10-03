import{ createSlice }  from '@reduxjs/toolkit'

 export const userSlice = createSlice({
    name:'user',
    initialState:{
        user:null,
    },
    reducers:{
        setUser: (state,action) => {
            console.log(action.payload)
            state.user = action.payload;
        },
    },
});

export const {setUser} = userSlice.actions;
