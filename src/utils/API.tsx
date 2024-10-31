import axios from 'axios';

const BASE_URL = 'http://80.90.190.26:8081/graphql';

type User = {
    name: string;
    surname: string;
    token: string;
};

export const login = async (email: string, password: string):Promise<User> => {
    const query = `
        mutation Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
                token
                organizations {
                    users {
                        name
                        surname
                    }
                }
            }
        }
    `;

    try {
        const response = await axios.post(BASE_URL, {
            query,
            variables: { email, password },
        });
        const { data } = response;

        if (data.errors) {
            throw new Error('Пользователь не найден');
        }


        const { token, organizations } = data.data.login;
        if (organizations && organizations.length > 0) {
            const users = organizations[0].users;
            if (users && users.length > 0) {
                const { name, surname } = users[0];
                return { name, surname, token };
            }
        }

        throw new Error('Invalid login response');
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};