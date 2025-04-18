import { useState, useEffect } from "react";
import { SalesCard } from "../_components/sales-card";
import { SalesCardSkeleton } from "../_components/sales-card-skeleton";
import { Headers } from "../_components/headers";
import { Button, addToast, cn } from "@heroui/react";
import { getAIResponse, getSalesReps } from "../apifetch/api";

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
        // get sales reps data
        const data = await getSalesReps();

        setSalesReps(data.salesReps || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch sales representatives data:", error);

        setError("Failed to fetch sales representative data");
        setLoading(false);
      }
    }
    fetchSalesReps();
  }, []);

  const handleAskQuestion = async () => {
    setloadingAI(true);

    try {
      // Post to AI API and return the AI response
      const answer = await getAIResponse(question);

      setAnswer(answer);
      setError(null);
      setloadingAI(false);
    } catch (error) {
      console.error("Error in AI request:", error);

      setError(`Error: ${error.message}`);
      setAnswer("");
      setloadingAI(false);
    }
  };

  // Show error toast when error state changes
  useEffect(() => {
    if (error != null) {
      addToast({
        title: "Error",
        description: error,
        classNames: {
          base: cn([
            "bg-default-50 dark:bg-background shadow-sm",
            "border border-l-8 rounded-md rounded-l-none",
            "flex flex-col items-start",
            "border-primary-200 dark:border-primary-100 border-l-primary",
          ]),
          icon: "w-6 h-6 fill-current",
        },
        color: "danger",
      });

      const timeout = setTimeout(() => {
        // reset error state
        setError(null);
      }, 3000);
      // Clear the timeout if the component unmounts before it executes, or if the error changes, preventing memory leaks
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div>
      <Headers
        answer={answer}
        question={question}
        setQuestion={setQuestion}
        loadingAI={loadingAI}
        handleAskQuestion={handleAskQuestion}
      />
      <div className="p-4">
        <section>
          {loading ? (
            <div className="w-fit grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 place-items-center">
              <SalesCardSkeleton />
            </div>
          ) : (
            <div className="w-fit grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              <SalesCard salesReps={salesReps} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
