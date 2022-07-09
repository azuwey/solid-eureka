import React from "react";
import Badge from "@components/Badge";
import type { AggregatedNationalityDetails } from "@pages/api/nat";

interface Props {
  nationalities: AggregatedNationalityDetails
}

const NationalityList = ({ nationalities }: Props) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-y-6">
      {Object.keys(nationalities).map((abbreviation) => (
        <div
          key={abbreviation}
          className="group bg-white rounded-lg drop-shadow-lg px-4 py-4"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 items-center">
            <div className="col-span-1 lg:col-span-3 flex items-center">
              <div className="w-16 h-16 aspect-w-1 aspect-h-1 overflow-hidden">
                <img
                  className="w-full h-full object-center object-cover rounded-full"
                  src={nationalities[abbreviation].randomPictureUrl}
                  alt={`Random ${nationalities[abbreviation].country} citizen's profile picture`}
                />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-base text-gray-800">
                  {nationalities[abbreviation].country}
                </h3>
                <p className="font-normal mt-0.5 text-sm text-gray-600">
                  {`Number of citizens: ${nationalities[abbreviation].numberOfCitizens}`}
                </p>
                <p className="font-normal mt-0.5 text-sm text-gray-600">
                  {`Number of votes: ${nationalities[abbreviation].numberOfVotes}`}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 mt-4 col-span-1 gap-3 lg:mt-0 lg:col-span-2 lg:flex lg:flex-row lg:justify-end">
              <Badge
                label="Up vote"
                onClick={() => console.log(`Vote up: ${abbreviation}`)}
              />
              <Badge
                label="Down vote"
                onClick={() =>
                  console.log(`Vote down: ${abbreviation}`)
                }
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NationalityList;
