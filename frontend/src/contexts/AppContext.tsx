import React, { createContext, useContext, ReactNode, useState } from "react";
import Toast from "../components/Toast";

type ToastMessage = {
    message: string;
    type: 'SUCCESS' | 'ERROR';
};

type AppContextType = {
    showToast: (toastMessage: ToastMessage) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {

    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)

    const showToast = (toastMessage: ToastMessage) => {
        console.log(toastMessage);
    };

    return (
        <AppContext.Provider value={{ showToast }}>
            {toast && (<Toast message={toast.message} type={toast.type} onClose={()=> setToast(undefined)} />)}
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};
