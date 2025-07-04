const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSalesReps = async () => {
  const res = await fetch(`${BASE_URL}/api/sales-reps`);

  // Handle error if response 400/500
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return data;
};

export const getAIResponse = async (question) => {
  const res = await fetch(`${BASE_URL}/api/ai`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }, // Content type application/json
    body: JSON.stringify({ question: question }), // sending data
  });

  // Handle error if response 400/500
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  // Handle error if backend sent back {"error":} instead of {"answer":}
  if (data.error != null) {
    throw new Error(data.error);
  }

  return data.answer;
};
