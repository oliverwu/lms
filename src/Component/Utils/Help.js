export function redirect(path) {
    window.location.href = `http://localhost:3000/#/${path}`
    // window.location.href = `https://www.oliver-website.com/#/${path}`
}

export function getAccessToken() {
    let access_token = localStorage.getItem('accessToken');
    let BearerAccessToken = 'Bearer ' + access_token;
    return BearerAccessToken;
}

export function getValidationErrors(error) {
    const validationErrors = error.inner.reduce((x, y) => {
        x[y.path] = y.message;
        return x;
    }, {});
    return validationErrors;
}
