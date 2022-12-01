import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/layout";
import EditTrainingComp from "../../../../components/training/edit";
import { getCourseById, getUserByEmail, getRedeemByUserId, updateTrainingById } from "../../../api/methods/actions";

export default function EditTraining({ course }) {
    const { status, data } = useSession();
    const router = useRouter();
    const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
    const [id, setId] = useState(router.query.id);
    const [counter, setCounter] = useState(router.query.counter);
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [path, setPath] = useState("");

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
        setRole(action.data.data[0].role);
    }

    const onSignOutHandler = async () => {
        await signOut();
    }

    const isEmailExisting = async () => {
        const action = await getUserByEmail(data.user.email);
        return action.data.data[0]._id.toString();
    }

    const isUserExisting = async () => {
        const id = await isEmailExisting();
        const callGetRedeemCode = await getRedeemByUserId(id);

        if (callGetRedeemCode.length > 0) setIsCodeRedeemed(callGetRedeemCode[0].isRedeemed);
        return callGetRedeemCode;
    }

    const editTraining = async (id, counter, training) => {
        let updateTrainings = [];
        const course = await getCourseById(id);

        console.log(id);
        console.log(counter);
        console.log(training);

        course.data.data[0].mods.map((item, index) => {
            if (index == counter) {
                updateTrainings.push(training);   
            } else {
                updateTrainings.push({
                    name: item.name,
                    desc: item.desc,
                    path: item.path
                });
            }            
        })

        const action = await updateTrainingById(id, {mods: updateTrainings});
        console.log(action);
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                isUserExisting();
                getRole(data.user.email);     
                setName(course[0].mods[router.query.counter].name);
                setDesc(course[0].mods[router.query.counter].desc);
                setPath(course[0].mods[router.query.counter].path);     
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} role={role} />
                <EditTrainingComp 
                    id={id}
                    counter={counter} 
                    name={name} 
                    desc={desc}
                    path={path}
                    setName={setName}
                    setDesc={setDesc}
                    setPath={setPath}
                    editTraining={editTraining}
                />
            </>
        )
    }

    return <div>loading</div>;
}

export async function getServerSideProps(context) {
    const action = await getCourseById(context.params.id);
    const course = await action.data.data;

    return {
        props: {
            course: course
        },
    }
}