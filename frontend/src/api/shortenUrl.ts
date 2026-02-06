export async function shortenUrl(longUrl: string): Promise<string> {
  const response = await fetch("http://localhost:8080/api/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: longUrl }),
  });

  const data = await response.json();
  console.log("BACKEND RESPONSE:", data);

  return data.shortCode;
}
