// store/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: null,
    name: "",
    username: "",
    email: "",
    address: "",
    gender: "",
    avatar: "",
    bio: "",
    phoneNumber: "",
    birthDate: null,
    isAuthenticated: false,
    userRole: "user",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
        setAuthenticationStatus: (state, action) => {
            console.log(action.payload)
            state.isAuthenticated = action.payload;
        },
        setUserDetails: (state, action) => {

            Object.assign(state, action.payload);
        },
        updateProfile: (state, action) => {

            const { name, address, gender, avatar, bio, phoneNumber, birthDate } = action.payload;
            state.name = name ?? state.name;
            state.address = address ?? state.address;
            state.gender = gender ?? state.gender;
            state.avatar = avatar ?? state.avatar;
            state.bio = bio ?? state.bio;
            state.phoneNumber = phoneNumber ?? state.phoneNumber;
            state.birthDate = birthDate ?? state.birthDate;
        },
        logout: (state) => {

            Object.assign(state, {
                id: null,
                name: "",
                email: "",
                address: "",
                gender: "",
                avatar: "",
                bio: "",
                phoneNumber: "",
                birthDate: null,
                isAuthenticated: false,
            });
        },
    },
});

export const {
    setUserRole,
    setAuthenticationStatus,
    setUserDetails,
    updateProfile,
    logout,
} = userSlice.actions;

export default userSlice.reducer;
