import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ContentGenerator } from "@/components/dashboard/ContentGenerator";

export default function ContentGeneratorPage() {
  return (
    <DashboardLayout>
      <ContentGenerator />
    </DashboardLayout>
  );
}