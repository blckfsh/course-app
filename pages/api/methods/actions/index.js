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

export const updateUserByEmail = async (email, user) => {
    const action = await axios.patch(`/api/user/${email}`, user);
    return action;
}

export const getAllStudents = async () => {
    const action = await axios.get(`http://localhost:3000/api/user/role/student`);
    if (action.data.data.length > 0) {
        return action.data.data;
    }    
}

export const getRedeemByUserId = async (userId) => {
    const action = await axios.get(`http://localhost:3000/api/redeem/${userId}`);    
    return action.data.data;
}

export const updateRedeemCode = async (userId, redeem) => {
    const action = await axios.patch(`/api/redeem/${userId}`, redeem);
    return action;
}

export const createRedeemCode = async (redeem) => {
    const action = await axios.post("/api/redeem", redeem);
    return action;
}

export const getUserDetailsById = async (id) => {
    const action = await axios.get(`http://localhost:3000/api/user/id/${id}`);
    if (action.data.data.length > 0) return action.data.data[0];
}

export const getTrainings = async () => {
    const action = await axios.get("http://localhost:3000/api/training");
    return action;
}