let userState

if (window.localStorage.getItem("auth")) 
    userState = JSON.parse(window.localStorage.getItem("auth"));
else 
    userState = null; 

export const authReducer = (state = userState, action) => {
    switch (action.type) {
        case "LOGGED_IN":
            return { ...state, ...action.payload };
        case "LOGOUT":
            return action.payload;
        case 'ADD_TO_CART':
            return {
                ...state, usr: {
                    ...state.usr,
                    cart: action.payload
                }
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state, usr: {
                    ...state.usr,
                    cart: action.payload
                }
            };
        default:
            return state;
    }
};
