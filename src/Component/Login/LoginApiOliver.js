let access_token = localStorage.getItem('accessToken');

export let BearerAccessToken = 'Bearer ' + access_token;
export let lmsURL = 'https://lms-oliver.azurewebsites.net/';

let LoginApi = {
    getToken: async (userName, password) => {
        try {
            let details = {
                'grant_type':'password',
                'username': userName,
                'password': password
            };

            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            const response = await fetch('https://lms-oliver.azurewebsites.net/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            });
            if (response.ok) {
                const jsonResponse = await response.json();
                const { access_token, expires_in } = jsonResponse;
                return {
                    access_token: access_token,
                    expire_time: expires_in,
                }
            }
        } catch (e) {
            console.log(e)
        }
    }
};

export default LoginApi;