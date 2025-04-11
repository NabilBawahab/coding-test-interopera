import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useState, useEffect } from "react";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure(); //Modal HERO UI

  const [salesReps, setSalesReps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [selectedSalesReps, setSelectedSalesReps] = useState(null);

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

  const handleShowDetail = (salesReps) => {
    setSelectedSalesReps(salesReps);
  };

  const handleCloseDetail = () => {
    setSelectedSalesReps(null);
  };

  const handleAskQuestion = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error("Error in AI request:", error);
    }
  };

  const getStatusColor = (status) => {
    if (status === "Closed Won") {
      return "text-green-500";
    }
    if (status === "Closed Lost") {
      return "text-red-500";
    }
    return "";
  };

  //Currency format
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  if (error === "Failed to fetch data") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1>Sales Dashboard</h1>

      <section>
        <h2>Sales Representatives</h2>
        {loading ? (
          <p>Loading sales representatives...</p>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {salesReps.map((rep) => {
              return (
                <div key={rep.id} className="border p-4 rounded-lg shadow">
                  <img
                    className="rounded-full w-24 h-24 mx-auto mb-4"
                    src="https://mighty.tools/mockmind-api/content/human/124.jpg"
                  />
                  <h3 className="text-center">{rep.name}</h3>
                  <p className="text-center">{rep.role}</p>
                  <div className="flex justify-end">
                    <Button
                      onPress={() => {
                        handleShowDetail(rep);
                        onOpen();
                      }}
                      variant="ghost"
                      color="primary"
                      size="sm"
                      radius="full"
                    >
                      Details
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {selectedSalesReps && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Details for {selectedSalesReps.name}
                </ModalHeader>
                <ModalBody>
                  <h3>
                    <strong>Full Name: </strong>
                    {selectedSalesReps.name}
                  </h3>
                  <p>
                    <strong>Role: </strong>
                    {selectedSalesReps.role}
                  </p>
                  <p>
                    <strong>Region: </strong>
                    {selectedSalesReps.region}
                  </p>
                  <h4>Skills:</h4>
                  <ol className="list-disc px-4">
                    {selectedSalesReps.skills.map((skill, index) => {
                      return <li key={index}>{skill}</li>;
                    })}
                  </ol>
                  <h4>Deals: </h4>
                  {selectedSalesReps.deals &&
                  selectedSalesReps.deals.length > 0 ? (
                    <ol className="list-disc px-4">
                      {selectedSalesReps.deals.map((deal, index) => {
                        const formattedValue = currencyFormatter.format(
                          deal.value
                        );
                        return (
                          <li key={index}>
                            <div>
                              <strong>Client: </strong>
                              {deal.client}, <strong>Value: </strong>{" "}
                              {formattedValue}
                            </div>
                            <div>
                              <strong>Status: </strong>
                              <span className={getStatusColor(deal.status)}>
                                {deal.status}
                              </span>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <p>No deals yet.</p>
                  )}
                  <h4>Clients: </h4>
                  {selectedSalesReps.clients &&
                  selectedSalesReps.clients.length > 0 ? (
                    <ol className="list-disc px-4">
                      {selectedSalesReps.clients.map((client, index) => {
                        return (
                          <li key={index}>
                            <strong>Client: </strong>
                            {client.name}, <strong>Industry: </strong>
                            {client.industry}
                            <div>
                              <strong>Contact: </strong>
                              {client.contact}
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  ) : (
                    <p>No clients assigned yet.</p>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      <section>
        <h2>Ask a Question (AI Endpoint)</h2>
        <div>
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button onClick={handleAskQuestion}>Ask</button>
        </div>
        {answer && (
          <div style={{ marginTop: "1rem" }}>
            <strong>AI Response:</strong> {answer}
          </div>
        )}
      </section>
    </div>
  );
}
