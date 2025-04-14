import { Button, Input } from "@heroui/react";
import { useState, useEffect } from "react";
import { SalesCard } from "./_components/sales-card";
import { SalesCardSkeleton } from "./_components/sales-card-skeleton";
import { Headers } from "./_components/headers";

export default function Home() {
  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [loadingAI, setloadingAI] = useState(false);

  useEffect(() => {
    // setTimeout(() => {
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
    // }, 2000);
  }, []);

  const handleAskQuestion = async () => {
    setloadingAI(true);
    try {
      const response = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //tipe konten application/json kalau xml application/xml dll (metadata)
        body: JSON.stringify({ question: question }), //Data yang mau dikirim
      });

      // Handle error ketika response 400/500
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Failed to fetch AI response");
        setAnswer("");
        setloadingAI(false);
        return;
      }

      // Handle Error ketika response 200 tapi data object mengandung error
      const data = await response.json();
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

  if (error === "Failed to fetch data") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <Headers />
      <section className="flex justify-center">
        <h2>Sales Representatives</h2>
      </section>
      <section>
        {loading ? (
          <div className="w-fit grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 place-items-center">
            <SalesCardSkeleton salesReps={salesReps} />
          </div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <div className="w-fit grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
            <SalesCard salesReps={salesReps} />
          </div>
        )}
      </section>
      <section>
        <h2>Ask a Question (AI Endpoint)</h2>
        <div>
          <Input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          ></Input>
          <Button isLoading={loadingAI} onPress={handleAskQuestion}>
            Ask
          </Button>
        </div>
        {answer && (
          <div>
            <strong>AI Response:</strong> {answer}
          </div>
        )}
      </section>
    </div>
  );
}
