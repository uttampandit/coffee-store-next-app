import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import useLocation from "../hooks/use-location";
import { getCoffeeStore } from "../lib/coffee-store";
import styles from "../styles/Home.module.css";

import { useContext, useEffect } from "react";
import { action_type, CoffeeContext } from "../context/coffee-store";
import getCoffeeStoreByLocation from "./api/getCoffeeStoreByLocation";
import axios from "axios";

export async function getStaticProps(context) {
  let coffeestore = [];
  try {
    coffeestore = await getCoffeeStore();
  } catch (e) {}
  return {
    props: {
      coffeestore,
    }, // will be passed to the page component as props
  };
}

export default function Home(props) {
  const { errorMsg, getLocation, isLoading } = useLocation();
  const { state, dispatch } = useContext(CoffeeContext);
  const { coffeeStores, latLong } = state;

  const bannerClickHandler = () => {
    getLocation();
  };
  useEffect(() => {
    const getCoffee = async () => {
      try {
        const res = await axios.get(
          `api/getCoffeeStoreByLocation?latLong=${latLong}`
        );
        const coffeeStores = res.data;
        dispatch({
          type: action_type.SET_COFFEE_STORE,
          payload: coffeeStores,
        });
      } catch (error) {
        console.error(error.message);
      }
    };
    if (latLong) {
      getCoffee();
    }
  }, [latLong]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Store</title>
        <meta name="description" content="Discover coffee store near you!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          text={isLoading ? "Getting location..." : "Find nearby shops"}
          onClickHandler={bannerClickHandler}
        />
        {errorMsg ? <p>Oops! Something went wrong!:{errorMsg}</p> : ""}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            height={400}
            width={700}
            alt={"Hero Image"}
          />
        </div>
        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Nearby Stores</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => (
                <Card
                  name={store.name}
                  href={`/coffee-store/${store.id}`}
                  imgUrl={store.imgUrl}
                  key={store.id}
                  className={styles.card}
                />
              ))}
            </div>
          </div>
        )}
        {props.coffeestore.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Delhi Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeestore.map((store) => (
                <Card
                  name={store.name}
                  href={`/coffee-store/${store.id}`}
                  imgUrl={store.imgUrl}
                  key={store.id}
                  className={styles.card}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
