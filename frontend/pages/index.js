import { useState, useEffect } from "react";
import { SalesCard } from "./_components/sales-card";
import { SalesCardSkeleton } from "./_components/sales-card-skeleton";
import { Headers } from "./_components/headers";
import { DrawerAI } from "./_components/button-ai";

export default function Home() {
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [loadingAI, setloadingAI] = useState(false);

  useEffect(() => {
    async function fetchSalesReps() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("http://localhost:8000/api/sales-reps");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        setSalesReps(data.salesReps || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch sales representatives data:", error);

        setError("Failed to fetch data");
        setLoading(false);
      }
    }
    fetchSalesReps();
  }, []);

  const handleAskQuestion = async () => {
    setloadingAI(true);
    try {
      const res = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //tipe konten application/json kalau xml application/xml dll (metadata)
        body: JSON.stringify({ question: question }), //Data yang mau dikirim
      });

      // Handle error ketika response 400/500
      if (!res.ok) {
        const errorData = await res.json();

        setError(errorData.error || "Failed to fetch AI response");
        setAnswer("");
        setloadingAI(false);
        return;
      }

      // Handle Error ketika response 200 tapi data object mengandung error
      const data = await res.json();
      if (data.error != null) {
        setAnswer(data.error);
        setloadingAI(false);
        return;
      }
      console.log("data", data);
      setAnswer(data.answer);
      setError(null);
      setloadingAI(false);
    } catch (error) {
      console.error("Error in AI request:", error);
      setError("Failed to fetch AI response");
      setAnswer("");
      setloadingAI(false);
    }
  };

  if (error != null) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Headers
        answer={answer}
        question={question}
        loadingAI={loadingAI}
        handleAskQuestion={handleAskQuestion}
        setQuestion={setQuestion}
      />
      <div className="p-4">
        <section>
          {loading ? (
            <div className="w-fit grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 place-items-center">
              <SalesCardSkeleton salesReps={salesReps} />
            </div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <div className="w-fit grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <SalesCard salesReps={salesReps} />
            </div>
          )}
        </section>
        <section></section>
      </div>
    </div>
  );
}
