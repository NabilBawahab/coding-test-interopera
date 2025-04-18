export const getSalesReps = async () => {
  const res = await fetch("http://localhost:8000/api/sales-reps");

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  return data;
};

export const getAIResponse = async (question) => {
  const res = await fetch("http://localhost:8000/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" }, //tipe konten application/json kalau xml application/xml dll (metadata)
    body: JSON.stringify({ question: question }), //Data yang mau dikirim
  });

  // Handle error ketika response 400/500
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  const data = await res.json();

  if (data.error != null) {
    throw new Error(data.error);
  }

  return data.answer;
};
