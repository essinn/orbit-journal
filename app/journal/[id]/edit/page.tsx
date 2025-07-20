import { EditForm } from "@/components/edit-form";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

async function getJournal(journalId: string) {
  const data = await prisma.journal.findUnique({
    select: {
      id: true,
      title: true,
      content: true,
      date: true,
      mood: true,
      tags: true,
    },
    where: {
      id: journalId,
    },
  });

  if (!data) {
    return notFound();
  }
  return data;
}

export default async function EditJournalPage({
  params,
}: {
  params: { id: string };
}) {
  const journal = await getJournal(params.id);
  return <EditForm journal={journal} />;
}
