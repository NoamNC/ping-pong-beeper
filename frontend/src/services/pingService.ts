const API_URL = process.env.REACT_APP_API_URL;


export  const sendPing = async () => {
    if (!API_URL) {
      console.error("❌ API URL not defined.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/ping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "ping" }),
      });

      if (!res.ok) {
        console.error("❌ Ping request failed:", await res.text());
      }
      return
    } catch (err) {
      console.error("❌ Error sending ping:", err);
    }
  };