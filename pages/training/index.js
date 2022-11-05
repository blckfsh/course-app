import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { promises as fs } from "fs";
import path from "path";
import Layout from "../../components/layout";
import TrainingComp from "../../components/training";
import { getTrainings } from "../api/methods/actions";

export default function Training({ trainings }) {
    const { status } = useSession();
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
                <TrainingComp trainings={trainings} />
            </>
        )
    }
    
    return <div>loading</div>;
}

export async function getStaticProps() {
  const action = await getTrainings();
  const trainings = await action.data.data[0];
  // const dest = await action.data.data[0].dest;

  // const trainingDirectory = path.join(process.cwd(), dest);
  // const filenames = await fs.readdir(trainingDirectory);

  // const modules = filenames.map(async (filename) => {
  //   const filePath = path.join(trainingDirectory, filename);

  //   return {
  //     filename,
  //     path: filePath,
  //   }
  // })

  return {
    props: {
      trainings: trainings,
      // modules: await Promise.all(modules),
    },
  }
}