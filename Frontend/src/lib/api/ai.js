import axios from "axios";

export async function improveText(text, type) {
  const res = await axios.post("http://localhost:5000/api/ai/improve", {
    text,
    type,
  });

  return res.data.improved;
}
