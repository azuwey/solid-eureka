import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const API_URL =
  "https://randomuser.me/api/?results=300&nat=de,dk,fr,gb&inc=id,gender,name,location,email,dob,picture,nat&seed=flightright";
const RANDOM_CHANCE = 0.36;
const prisma = new PrismaClient();

export type AggregatedNationalityDetails = {
  [key: string]: {
    country: string;
    numberOfVotes: number;
    numberOfCitizens: number;
    randomPictureUrl: string;
  };
};

type Result = {
  location: {
    country: string;
  };
  picture: {
    large: string;
  };
  nat: string;
  /* We ignore the other fields, because our API doesn't use it */
};

type Info = {
  seed: string;
  results: number;
  page: number;
  version: string;
};

type ApiResult = {
  results: Result[];
  info: Info;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }

  const response = await fetch(API_URL);
  const data: ApiResult = await response.json();

  const aggregatedNationalityDetails =
    data.results.reduce<AggregatedNationalityDetails>((data, currentResult) => {
      const abbreviation = currentResult.nat.toUpperCase();

      if (data[abbreviation]) {
        data[abbreviation].numberOfCitizens += 1;
      } else {
        data[abbreviation] = {
          numberOfVotes: 0,
          numberOfCitizens: 1,
          country: currentResult.location.country,
          randomPictureUrl: currentResult.picture.large,
        };
      }

      if (Math.random() < RANDOM_CHANCE) {
        data[abbreviation].randomPictureUrl = currentResult.picture.large;
      }

      return data;
    }, {});

  const nationalities = await prisma.nationality.findMany();
  for (const nationality of nationalities) {
    if (aggregatedNationalityDetails[nationality.abbreviation]) {
      aggregatedNationalityDetails[nationality.abbreviation].numberOfVotes =
        nationality.voteCount;
    }
  }

  res.status(200).json(aggregatedNationalityDetails);
}
