import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { CoffeeContext } from "../../context/coffee-store";
import { getCoffeeStore } from "../../lib/coffee-store";

import styles from "../../styles/coffee-store.module.css";
import isEmpty from "../../utils/isEmpty";
let coffeeStoreData = [];
export async function getStaticProps(context) {
  coffeeStoreData = await getCoffeeStore();
  const store = coffeeStoreData.find((store) => {
    return store.id.toString() === context.params.id;
  });

  return {
    props: {
      coffestore: store ? store : {},
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
const createCoffeeStore = async (coffeestore) => {
  let { id, name, address, neighborhood: neighbourhood, imgUrl } = coffeestore;
  const res = await axios.post("/api/createCoffeeStore", {
    id,
    name,
    address: address || "",
    neighbourhood: neighbourhood || "",
    imgUrl,
    vote: 0,
  });
};

const DynamicPage = (params) => {
  const router = useRouter();
  const id = router.query.id;
  const { state } = useContext(CoffeeContext);

  const [coffeeStore, setCoffeeStore] = useState(params.coffestore || {});

  useEffect(() => {
    console.log("useEffect ran");
    if (isEmpty(params.coffestore)) {
      if (state.coffeeStores.length > 0) {
        const coffeestore = state.coffeeStores.find((store) => {
          return store.id === id;
        });
        setCoffeeStore(coffeestore);
        createCoffeeStore(coffeestore);
      }
    } else {
      createCoffeeStore(params.coffestore);
    }
  }, []);

  let { name, address, neighborhood, imgUrl } = coffeeStore;
  if (router.isFallback) {
    return <div>Its loading... Please wait..</div>;
  }
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
