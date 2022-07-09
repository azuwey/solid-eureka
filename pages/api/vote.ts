import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { VOTE_TYPE } from "@utils/api/vote";

export type VoteRequest = {
  abbreviation: string;
  vote: VOTE_TYPE;
};

const prisma = new PrismaClient();

export default async function handler(
  req: Omit<NextApiRequest, "body"> & { body: VoteRequest },
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const nationality = await prisma.nationality.findFirst({
    where: {
      abbreviation: req.body.abbreviation,
    },
  });

  let newVoteCount = nationality?.voteCount ?? 0;
  if (req.body.vote === VOTE_TYPE.UP_VOTE) {
    newVoteCount += 1;
  } else {
    newVoteCount -= 1;
  }

  await prisma.nationality.upsert({
    create: {
      abbreviation: req.body.abbreviation,
      voteCount: newVoteCount,
    },
    update: {
      voteCount: newVoteCount,
    },
    where: {
      abbreviation: req.body.abbreviation,
    },
  });

  res.status(201).send({ message: "OK" });
}
