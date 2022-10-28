import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../components/layout";

export default function Home() {
    const { status, data } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") router.replace("/signin");
        
    }, [status]);

    if (status === "authenticated")
    return (
      <div>
        <Layout name={data.user.name.toString()} />
      </div>
    );

    return <div>loading</div>;
}