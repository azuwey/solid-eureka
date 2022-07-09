import React from "react";
import useSWR from "swr";
import type { AggregatedNationalityDetails } from "@pages/api/nat";
import fetcher from "@utils/fetcher";
import NationalityList from "./NationalityList";

const NationalityListContainer = () => {
  const { data, error } = useSWR<AggregatedNationalityDetails>(
    "/api/nat",
    fetcher
  );

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

  return <NationalityList nationalities={data} />;
};

export default NationalityListContainer;
