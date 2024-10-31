import { atom } from "recoil";

export const blogsState = atom({
    key: 'blogsState',
    default: []
});

export const currentUserState = atom({
    key: 'currentUser',
    default : {}
})