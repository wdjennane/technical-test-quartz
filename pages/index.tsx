import type { NextPage } from "next";
import { useState } from "react";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

import styles from "../styles/Home.module.css";

type Inputs = {
  url: string;
  websiteUrl: string;
};
type Data = {
  title: string;
  status: number;
};

type ErrorData = {
  error: string;
  status: number;
};

const Home: NextPage<Data> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({});
  const [data, setData] = useState<Data | null>();
  const [errorData, setErrorData] = useState<ErrorData | null>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setData(null); // To reset the state before each fetch
    setErrorData(null); // To reset the state before each fetch
    await fetchData(data.websiteUrl);
  };

  const fetchData = async (url: string) => {
    try {
      const res = await axios.get("/api/getTitle", {
        params: {
          url,
        },
      });
      setData(res.data);
    } catch (err: Error | any) {
      setErrorData(err.response.data);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>Website Url</label>
        <input
          {...register("websiteUrl", {
            required: true,
          })}
          className={styles.input}
        />

        {errors.websiteUrl && (
          <span className={styles.error}>This field is required</span>
        )}
        <input className={styles.submit} type="submit" />
      </form>
      {data ? (
        <div className={styles.response}>
          <p>Website title: {data ? data.title : ""}</p>
          <p>Status: {data ? data.status : ""}</p>
        </div>
      ) : null}
      {errorData ? (
        <div className={styles.response}>
          <p>Website title: {errorData.error}</p>
          <p>Status: {errorData.status}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
