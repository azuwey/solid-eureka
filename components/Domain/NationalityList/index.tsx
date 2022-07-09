import React from "react";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import type { AggregatedNationalityDetails } from "@pages/api/nat";
import { VOTE_TYPE } from "@utils/api/vote";
import NationalityList from "./NationalityList";
import { VoteRequest } from "@pages/api/vote";

const NationalityListContainer = () => {
  const { data, error, mutate } = useSWR<AggregatedNationalityDetails>(
    "/api/nat",
    fetcher
  );

  const onVote = (abbreviation: string, voteType: VOTE_TYPE) => {
    mutate((currentData) => {
      if (currentData) {
        currentData = Object.assign({}, currentData, {
          [abbreviation]: {
            ...currentData[abbreviation],
            numberOfVotes: currentData[abbreviation].numberOfVotes + (voteType === VOTE_TYPE.UP_VOTE ? 1 : -1),
          },
        });
      }

      return currentData;
    }, false);

    const newVote: VoteRequest = { abbreviation, vote: voteType };
    fetcher("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newVote),
    }).catch(() => mutate((data) => data, true));
  };

  if (error) {
    return (
      <h3 className="mt-6 font-semibold text-base text-gray-800">
        An error occurred.
      </h3>
    );
  }

  if (!data) {
    return (
      <h3 className="mt-6 font-semibold text-base text-gray-800">
        Loading ...
      </h3>
    );
  }

  return <NationalityList nationalities={data} onVote={onVote} />;
};

export default NationalityListContainer;
