import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/layout";
import TrainingComp from "../../components/training";
import { promises as fs } from "fs";
import path from "path";

export default function Training({ trainings }) {
    const { status, data } = useSession();
    const router = useRouter();

    const onSignOutHandler = async () => {
        await signOut();
    }

    useEffect(() => {
        try {
          if (status === "unauthenticated") router.replace("/");
          console.log(trainings);   
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

export async function getStaticProps() {
  const trainingDirectory = path.join(process.cwd(), 'module');
  const filenames = await fs.readdir(trainingDirectory);

  const trainings = filenames.map(async (filename) => {
    const filePath = path.join(trainingDirectory, filename);
    const fileContents = await fs.readFile(filePath, 'utf8');

    return {
      filename,
      content: fileContents,
    }
  })

  return {
    props: {
      trainings: await Promise.all(trainings),
    },
  }
}