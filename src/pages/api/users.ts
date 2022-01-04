import { NextApiRequest, NextApiResponse } from "next";

const getUers = (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: "Marcos" },
    { id: 2, name: "Paulo" },
    { id: 3, name: "Alho" },
  ];

  return response.json(users);
};

export default getUers;
