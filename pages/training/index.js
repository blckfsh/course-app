import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";
import TrainingComp from "../../components/training";

export default function Training() {
    const { status, data } = useSession();
    const router = useRouter();

    const onSignOutHandler = async () => {
        await signOut();
    }

    useEffect(() => {
        try {
          if (status === "unauthenticated") router.replace("/");          
        } catch(error) {
          console.log(error);
        }
      }, [status]);


    if (status === "authenticated") {
        return (
            <>
                <Layout onSignOutHandler={onSignOutHandler} />
                <TrainingComp />
            </>
        )
    }
    
    return <div>loading</div>;
}