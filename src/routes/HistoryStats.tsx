import { useLoaderData } from "react-router";
import HistoryStatsRender from "../pages/HomeWindow";

export function loader() {
  return {
    pageTitle: "History and Statistics - Lettronix",
    pageDescription: "View past data and trends in one place.",
  };
}

export function meta({ data }: { data: Awaited<ReturnType<typeof loader>> }) {
  return [
    { title: data?.pageTitle },
    { name: "description", content: data?.pageDescription },
  ];
}

export default function HistoryStats() {
  return (
    <>
      <HistoryStatsRender />
    </>
  );
}
