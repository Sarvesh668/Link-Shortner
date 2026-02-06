import { useState } from "react";
import { shortenUrl } from "../../api/shortenUrl";

export default function UrlBox() {
  const [value, setValue] = useState(""); // always string
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  if (!value || !value.trim()) return;

  try {
    setLoading(true);
    const shortCode = await shortenUrl(value);

    // Build full short URL for display
    const fullShortUrl = `http://localhost:8080/${shortCode}`;

    setValue(fullShortUrl);
  } catch (err) {
    alert("Cannot shorten this URL");
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      style={{
        width: 360,
        padding: 12,
        background: "#fff",
        borderRadius: 8,
        display: "flex",
        gap: 8,
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Paste your link here"
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: 14,
        }}
      />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "..." : "Go"}
      </button>
    </div>
  );
}
