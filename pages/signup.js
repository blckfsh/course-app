
import Register from "../components/register";
import axios from "axios";

export default function Signup() {
    const registerUser = async (user) => {
        const isUserExisting = await axios.get(`/api/user/${user.email}`);        

        if (isUserExisting.data.data.length = []) {
            const action = await axios.post("/api/user", user);

            console.log(action);
        }
    }

    return (
        <Register registerUser={registerUser} />
    )
}