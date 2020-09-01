const baseUrl = 'https://team358.herokuapp.com/';

// Register User
export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${baseUrl}auth/register`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            const { message } = await response.json();
            return message;
        } else {
            const { message } = await response.json();
            return message;
        }
    } catch (err) {
        throw new Error(err);
    }
}

// Login User
export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${baseUrl}auth/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const { message } = await response.json();
            return message;
        } else {
            const { message } = await response.json();
            return message;
        }
    } catch (err) {
        throw new Error(err);
    }
}