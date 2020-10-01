const baseUrl = 'https://team358.herokuapp.com/';

// Register User
export const registerUser = async (name, email, password) => {
    try {
        const response = await fetch(`${baseUrl}user/register`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        if (response.ok) {
            const results = await response.json();
            return results;
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
        const response = await fetch(`${baseUrl}user/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const { data } = await response.json();
            return data;
        } else {
            const { message } = await response.json();
            return message;
        }
    } catch (err) {
        throw new Error(err);
    }
}

// Update User
export const requestUpdate = async (name, phone, stations, city, country) => {
    try {
        const response = await fetch(`${baseUrl}user/register`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ name, phone, stations, city, country })
        });

        if (response.ok) {
            const results = await response.json();
            return results;
        } else {
            const { message } = await response.json();
            return message;
        }
    } catch (err) {
        throw new Error(err);
    }
}

export const fetchSavePushToken = async (pushToken) => {
    try {
        const response = await fetch(`${baseUrl}pushtoken/user/:id`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ pushToken })
        });
        if (response.ok) {
            const { data } = await response.json();
            return data;
        } else {
            const { message } = await response.json();
            return message;
        }
    } catch (error) {
        throw new Error(error);
    }
}