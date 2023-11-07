import React, { createContext, useReducer } from "react";
import { UserType } from "../types/UserType";

// Define action types
type LoginAction = {
    type: "LOGIN";
    payload: UserType;
};

type LogoutAction = {
    type: "LOGOUT";
};

type ActionType = LoginAction | LogoutAction;

// Define the initial state
type StateType = {
    auth: UserType | undefined
    isAuthenticated:boolean
};

const INITIAL_STATE: StateType = {
    auth: undefined,
    isAuthenticated:false
};
export const AuthContext = createContext<{
    state: StateType;
    dispatch: React.Dispatch<ActionType>;
}>({
    state: INITIAL_STATE,
    dispatch: () => {},
});

// Define the reducer function
const reducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                auth: action.payload,
                isAuthenticated:true
            };
        case "LOGOUT":
            return {
                ...state,
                auth: undefined,
                isAuthenticated:false
            };
        default:
            return state;
    }
};

// Create the AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
    
    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};
