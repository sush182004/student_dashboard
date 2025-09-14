module.exports.validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

module.exports.validatePassword = (password) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(password);
};
