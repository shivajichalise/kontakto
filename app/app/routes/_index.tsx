import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Kontakto" },
    { name: "description", content: "Welcome to Kontakto!" },
  ];
};

export default function Index() {
  return (
    <>
      <Button>Hello</Button>
    </>
  );
}
