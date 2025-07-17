import { useLoaderData } from "react-router-dom";
import ControlCenterRender from "../pages/HomeWindow";

export function loader() {
  return {
    pageTitle: "Control Center - Lettronix",
    pageDescription: "Monitor and control your devices in real time.",
  };
}

export function meta({ data }: { data: Awaited<ReturnType<typeof loader>> }) {
  return [
    { title: data?.pageTitle },
    { name: "description", content: data?.pageDescription },
  ];
}

export default function ControlCenter() {
  return <ControlCenterRender />;
}
