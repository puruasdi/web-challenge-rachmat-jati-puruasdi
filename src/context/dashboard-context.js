import { useState, createContext } from "react";

const DashboardContext = createContext();
const { Provider } = DashboardContext;

const DashboardProvider = ({ children }) => {
    const [category, setCategory] = useState('')
    const [search, setSearch] = useState('')

    return (
        <Provider
            value={{
                search,
                category,
                setSearch,
                setCategory
            }}
        >
            {children}
        </Provider>
    );
};

export { DashboardContext, DashboardProvider };