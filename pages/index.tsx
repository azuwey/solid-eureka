import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NationalityList from "@components/Domain/NationalityList";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-screen bg-gray-100">
      <Head>
        <title>Solid Eureka</title>
        <meta
          name="description"
          content="Mock nationality voting application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Nationalities
          </h2>
          <NationalityList />
        </div>
      </main>
    </div>
  );
};

export default Home;
