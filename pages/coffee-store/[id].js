import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCoffeeStore } from "../../lib/coffee-store";

import styles from "../../styles/coffee-store.module.css";
let coffeeStoreData = [];
export async function getStaticProps(context) {
  coffeeStoreData = await getCoffeeStore();
  console.log(coffeeStoreData);
  return {
    props: {
      coffestore: coffeeStoreData.find((store) => {
        return store.id.toString() === context.params.id;
      }),
    }, // will be passed to the page component as props
  };
}
const paths = coffeeStoreData.map((store) => {
  return {
    params: {
      id: store.id.toString(),
    },
  };
});
export async function getStaticPaths() {
  return {
    paths,
    fallback: true,
  };
}

const DynamicPage = (params) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Its loading... Please wait..</div>;
  }
  const { name, address, neighborhood, imgUrl } = params.coffestore;
  const upVoteHandler = () => {
    console.log("Upvoted!");
  };
  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">← Back to Home</Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            className={styles.storeImg}
            src={imgUrl}
            width={600}
            height={360}
            alt={name}
          />
        </div>
        <div className={"glass " + styles.col2}>
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/location.svg" width={24} height={24} />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood ? (
            <div className={styles.iconWrapper}>
              <Image src="/static/icons/nearMe.svg" width={24} height={24} />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          ) : (
            ""
          )}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/star.svg" width={24} height={24} />
            <p className={styles.text}>{1}</p>
          </div>
          <button className={styles.upvoteButton} onClick={upVoteHandler}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};
export default DynamicPage;
