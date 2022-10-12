import { createContext, useState } from "react";


const userDataContext = createContext();

const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState({});

    const changeUserData = (user) => {
        setUserData(user)
    }
    const [cart, setCart] = useState({});

    const changeCart = (cartQuantity) => {
        setCart(cartQuantity)
    }

    const value = {
        userData,
        changeUserData,
        cart,
        changeCart
    }



    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}


export { UserDataProvider, userDataContext }