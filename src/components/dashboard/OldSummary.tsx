"use client";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

export default function OldSummaryCard({
  summary,
}: {
  summary: SummaryType;
}) {

  const {resolvedTheme} = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="shadow-md rounded-md p-4 h-52 bg-gray-100 text-black"></div>;
  }

  return (
    <div className={`shadow-md rounded-md p-4 h-52 ${
      resolvedTheme === "light" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
    }`}>
      <h1 className="text-md font-semibold">{summary.title}</h1>
      <Link href={`/summarize/${summary.id}`}>
        <h1 className="mt-2">{summary.url}</h1>
      </Link>
      <p className="mt-2">
        Created At :- {new Date(summary?.createdAt).toDateString()}
      </p>
    </div>
  );
}