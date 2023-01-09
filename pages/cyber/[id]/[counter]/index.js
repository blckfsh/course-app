import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../../../components/layout";
import EditCyberComp from "../../../../components/cyber/edit";
import { getCourseById, getUserByEmail, getRedeemByUserId, updateLabById } from "../../../api/methods/actions";

export default function EditCyber({ course }) {
    const { status, data } = useSession();
    const router = useRouter();
    const [isCodeRedeemed, setIsCodeRedeemed] = useState(false);
    const [role, setRole] = useState("");   
    const [id, setId] = useState(router.query.id);
    const [counter, setCounter] = useState(router.query.counter);
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [path, setPath] = useState("");
    const [date, setDate] = useState("");

    const getRole = async (email) => {
        const action = await getUserByEmail(email);
        setRole(action.data.data[0].role);
    }

    const onSignOutHandler = async () => {
        await router.replace("/");
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

    const editLab = async (id, counter, lab) => {
        let updateLabs = [];
        const course = await getCourseById(id);

        course.data.data[0].labs.map((item, index) => {
            if (index == counter) {
                updateLabs.push(lab);   
            } else {
                updateLabs.push({
                    name: item.name,
                    desc: item.desc,
                    path: item.path,
                    date: item.date
                });
            }            
        })

        const action = await updateLabById(id, {labs: updateLabs});
        if (action.status === 201) router.replace("/home");
    }

    useEffect(() => {
        try {
            if (status === "unauthenticated") router.replace("/");
            if (status === "authenticated") {
                isUserExisting();
                getRole(data.user.email);
                setName(course[0].labs[router.query.counter].name);
                setDesc(course[0].labs[router.query.counter].desc);
                setPath(course[0].labs[router.query.counter].path);
                setDate(course[0].labs[router.query.counter].date);
            }
        } catch (error) {
            console.log(error);
        }
    }, [status]);

    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} isCodeRedeemed={isCodeRedeemed} role={role} email={data.user.email} />
                <EditCyberComp 
                    id={id}
                    counter={counter} 
                    name={name} 
                    desc={desc}
                    path={path}
                    date={date}
                    setName={setName}
                    setDesc={setDesc}
                    setPath={setPath}
                    setDate={setDate}
                    editLab={editLab}
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