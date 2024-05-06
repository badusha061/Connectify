const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/;

const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$/;

export {passwordRegex , emailRegex}