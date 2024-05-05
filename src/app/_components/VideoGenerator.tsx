"use client";

import { NextResponse } from "next/server";
import { useState } from "react";

export default function VideoGenerator() {
  const [responseData, setResponseData] = useState<NextResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/creatomate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = (await response.json()) as NextResponse; // Parse JSON response

      setResponseData(responseData); // gives null error 500
    } catch (error) {
      setError("An error occurred while fetching the data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : responseData ? (
        <div>
          <p>Response Data: {JSON.stringify(responseData)}</p>
        </div>
      ) : (
        <button onClick={fetchData}>Fetch Data</button>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
