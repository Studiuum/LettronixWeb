import { useLoaderData } from "react-router-dom";
import HomeWindowRender from "../pages/HomeWindow";

export function loader() {
  return {
    pageTitle: "Home - Lettronix",
    pageDescription: "Welcome to the Lettronix dashboard.",
  };
}

export function meta({ data }: { data: Awaited<ReturnType<typeof loader>> }) {
  return [
    { title: data?.pageTitle },
    { name: "description", content: data?.pageDescription },
  ];
}

export default function HomeWindow() {
  return <HomeWindowRender />;
}
