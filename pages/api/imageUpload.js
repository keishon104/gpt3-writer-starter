export default async function handler(req, res) {
  if (req.method === "GET") {
    if (req.body !== "") {
      return await imageUpload(req, res);
    } else {
      res
        .status(405)
        .json({ message: "No body apart of request", success: false });
      //   return await imageUpload(req, res);
    }
  } else if (req.method === "POST") {
    if (req.body !== "") {
      return await imageUpload(req, res);
    } else {
      res
        .status(405)
        .json({ message: "No body apart of request", success: false });
      //   return await imageUpload(req, res);
    }
  } else {
    return res
      .status(405)
      .json({ message: "Method not allowed", success: false });
  }
}

async function imageUpload(req, res) {
  try {
    var requestOptions = {
      method: "POST",
      redirect: "follow",
    };
    let body = req.body;

    // console.log("Input into API: ", body.value);
    const getDescription = await fetch(
      `https://ai-alt-text-generator-three.vercel.app/api/generate?imageUrl=${body.value}`,
      requestOptions
    ).then((response) => response.text());
    return res.json(getDescription, { success: true });
  } catch {
    res.status(500).json({ error: "failed" });
  }
}
