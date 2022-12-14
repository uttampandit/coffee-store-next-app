import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const PageTwo = () => {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>{router.query.id}</title>
      </Head>
      Page {router.query.id}
    </div>
  );
};
export default PageTwo;
