"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback } from "react";

export default function Home() {
  const [answer, setAnswer] = useState("");
  const [name, setName] = useState("");
  const [late, setLate] = useState(false);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    if (
      answer.toLowerCase() === "neural network" ||
      answer.toLowerCase() === "neuralnetwork"
    ) {
      setLoading(true);
      try {
        const getCodes = await axios.get("/api/answer");
        const codes = getCodes.data;

        if (codes.length === 0) {
          setLate(true);
          const res = await axios.post("/api/answer", {
            name: name,
            clue: "late",
            late: true,
          });

          if (!res) {
            throw new Error("Error");
          }
          setSuccess("Too late to claim the Treasure. BEtter luck next time!");
        } else {
          setLate(false);
          const res = await axios.post("/api/answer", {
            name: name,
            clue: codes[0]["text"] as string,
            late: false,
          });

          if (!res) {
            throw new Error("Error");
          }
          setSuccess(codes[0]["text"] as string);
        }
      } catch (e: any) {
        alert(e.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Wrong answer");
    }
  }, [answer, name]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="mt-10">
          <div className="bg-[#52527c] w-20 h-20 rounded-full mx-auto duration-200 m-8 animate-ping"></div>
        </div>
      );
    }

    if (success) {
      return (
        <div className="flex flex-col mt-10 items-center">
          {late ? (
            <div></div>
          ) : (
            <p className="text-center text-2xl">
              Take the code and run to venue!
            </p>
          )}
          <p className="font-bold mt-4 text-center text-4xl">{success}</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center">
        <p className="text-xl my-10 text-center font-mono">
          I exist in layers, deep and unseen, <br />I learn from patterns, as I
          evolve, I glean.
          <br /> With nodes and edges, I find my way,
          <br /> In the vast multiverse, where do I stay?
          <br /> To find the treasure, think of the brain,
          <br />
          My name is the key to end your strain.
        </p>
        <div className="flex flex-col w-full">
          <input
            className="m-2 p-4 text-xl bg-[#669bbc] rounded-xl placeholder:text-white placeholder:font-semibold text-white outline-none"
            name="answer"
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Answer"
          />
          <input
            className="m-2 p-4 text-xl bg-[#669bbc] rounded-xl placeholder:text-white placeholder:font-semibold text-white outline-none"
            name="teamname"
            id="teamname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Team name"
          />
        </div>
        <button
          className="px-4 py-2 text-xl bg-[#52527c] text-white rounded-2xl m-4 hover:bg-transparent border-4 border-[#52527c] font-bold transition duration-300"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    );
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center">
      <div className="flex flex-col items-center py-20">
        <h1 className="text-2xl md:text-4xl font-bold text-fuchsia-400">
          Multiverse Mysteries
        </h1>
        <div className="flex flex-col w-full my-10 items-center">
          <Image
            className="rounded-full"
            src="/mystery.jpg"
            width={400}
            height={400}
            alt="time"
          />
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
