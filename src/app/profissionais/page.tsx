import type { Metadata } from "next";
import { ProfessionalsContent } from "@/components/professionals-content";

export const metadata: Metadata = {
  title: "Explore profissionais | Lacrei Saúde",
};
export default function ProfessionalsPage() {
  return <ProfessionalsContent />;
}
