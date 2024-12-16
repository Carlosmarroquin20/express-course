export const createUserValidationShema = {
    username: {
        isLength: {
            options: {
                min: 5,
                max: 32,
            },
            errorMessage:
            "Username must be at least 5 characters with a max of 32 characters",
        },
        notEmpty: {
            errorMessage:
            "Username can't be empty",
        },
        isString: 
        {
            errorMessage:
            "Username must be a string!",
        },
    },
    displayName: {
        notEmpty: true,
    },
};