import { redirect } from 'next/navigation';

interface ModulePageProps {
  params: Promise<{ moduleId: string }>;
}

export default async function LegacyModuleRedirectPage({ params }: ModulePageProps) {
  const { moduleId } = await params;
  redirect(`/cours/ai-engineering/${moduleId}`);
}
