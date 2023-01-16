const generateCaption = async (body) => {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  const { output } = data;
  // console.log("Function Data: ", data.output.text);
  return data.output.text;
};

export default generateCaption;
