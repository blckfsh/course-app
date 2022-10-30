import axios from "axios";
import voucher_codes from "voucher-code-generator";
import bcrypt from "bcryptjs";

export const getUserCodeByEmail = async (email) => {
    const action = await axios.get(`/api/auth/verify/email/${email}`);

    return action.data.code;
}

export const encryptPassword = async (password) => {
    const saltRounds = 10;
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    return encryptedPassword;
}

export const generate = async () => {
    const code = await voucher_codes.generate({
        length: 10,
        count: 1
    });

    return code.toString();
}

export const getVerificationCode = async (code) => {
    const action = await axios.get(`/api/auth/verify/${code}`);
    return action;
}

export const updateVerificationCode = async (code, object) => {
    const action = await axios.patch(`/api/auth/verify/email/${code}`, object);
    return action;
}

export const createNewVerificationCode = async (code, object) => {
    const action = await axios.post(`/api/auth/verify/${generate.toString()}`, object);
    return action;
}

export const getUserByEmail = async (email) => {
    const action = await axios.get(`/api/user/${email}`);
    return action;
}

export const createUser = async (user) => {
    const action = await axios.post("/api/user", user);
    return action;
}