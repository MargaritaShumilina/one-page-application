import {FC} from "react";

type User = {
    name: string; // Добавьте нужные поля
    surname: string;
};

// interface Props {
//     currentUser: User;
//     loggedIn: boolean
// }
export const ProductsPage:FC = () => {
    let savedUserString = localStorage.getItem('user');
    let savedUser: User | null = null;

    if (savedUserString) {
        savedUser = JSON.parse(savedUserString);
    }
    return (
        <>
            <p>Example Text</p>
            {savedUser ? (
                <h1>Welcome, {savedUser.name} {savedUser.surname}</h1>
            ) : (
                <h1>Welcome, Guest</h1>
            )}
        </>
    )
}
