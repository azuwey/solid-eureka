import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Badge from "../components/Badge";

const NATIONALITIES: {
  [key: string]: {
    numberOfCitizens: number;
    country: string;
    randomProfilePictureUrl: string;
    numberOfVotes: number;
  };
} = {
  FR: {
    numberOfCitizens: 666,
    country: "French",
    randomProfilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    numberOfVotes: 32,
  },
  DE: {
    numberOfCitizens: 420,
    country: "Germany",
    randomProfilePictureUrl: "https://randomuser.me/api/portraits/women/53.jpg",
    numberOfVotes: 16,
  },
  DK: {
    numberOfCitizens: 69,
    country: "Denmark",
    randomProfilePictureUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    numberOfVotes: 42,
  },
  GB: {
    numberOfCitizens: 333,
    country: "United Kingdom",
    randomProfilePictureUrl: "https://randomuser.me/api/portraits/women/5.jpg",
    numberOfVotes: 65,
  },
};

const Home: NextPage = () => {
  return (
    <div className="min-h-screen h-full w-screen bg-gray-100">
      <Head>
        <title>Solid Eureka</title>
        <meta name="description" content="Mock country voting application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Nationalities
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-6">
            {Object.values(NATIONALITIES).map((nationality, index) => (
              <div
                key={`nationality_${index}`}
                className="group bg-white rounded-lg drop-shadow-lg px-4 py-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 items-center">
                  <div className="col-span-1 lg:col-span-3 flex items-center">
                    <div className="w-16 h-16 aspect-w-1 aspect-h-1 overflow-hidden">
                      <img
                        className="w-full h-full object-center object-cover rounded-full"
                        src={nationality.randomProfilePictureUrl}
                        alt="Random citizen's profile picture"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-base text-gray-800">
                        {nationality.country}
                      </h3>
                      <p className="font-normal mt-0.5 text-sm text-gray-600">
                        Number of citizens: {nationality.numberOfCitizens}
                      </p>
                      <p className="font-normal mt-0.5 text-sm text-gray-600">
                        Number of votes: {nationality.numberOfVotes}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 mt-4 col-span-1 gap-3 lg:mt-0 lg:col-span-2 lg:flex lg:flex-row lg:justify-end">
                    <Badge label="Up vote" onClick={() => console.log("Vote")} />
                    <Badge label="Down vote" onClick={() => console.log("Vote")} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
