"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const LeaderBoard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("/api/lead");
      const d = res.data;
      setData(d);
    };

    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center mt-20">
        <h1 className="text-4xl font-semibold">Leaderboard</h1>
        <div className="mt-10 flex gap-6 items-center text-center">
          <div>
            <h1 className="text-2xl font-bold">Team</h1>
            {data.map((d, idx) => (
              <div key={idx}>
                <p className="text-xl">{d["team"]}</p>
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-xl font-bold">Codes</h1>
            {data.map((d, idx) => (
              <div key={idx}>
                <p className="text-xl">{d["code"]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
