import Link from "next/link";
import { useRouter } from "next/router";

const DynamicPage = () => {
  const router = useRouter();
  return (
    <div>
      Dynamic Page is {router.query.id} <Link href="/">Back to Home</Link>
    </div>
  );
};
export default DynamicPage;
