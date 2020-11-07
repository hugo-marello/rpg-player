import Validator from 'validatorjs';

Validator.register('password-required', value => {
        const stringValue = value.toString();
        return /^(?=.*\d)/.test(stringValue) &&
                /^(?=.*[a-z])/.test(stringValue) &&
                /^(?=.*[A-Z])/.test(stringValue) &&
                /^(?=.*[!@#$%^&*_+-])/.test(stringValue)
}, 'The password must contain at least one lowercase letter, one uppercase letter, one digit and a special character(!@#$%^&*_+-)');

Validator.register('password-forbidden', value => /^(\w|[!@#$%^&*+-])+$/.test(value.toString())
, 'The password can only contain letters, number and the special characters (!@#$%^&*_+-)');

export default {
    email: 'required|email',
    username: 'required|string|min:3|max:20',
    password: 'required|string|min:8|max:30|password-required|password-forbidden'
};