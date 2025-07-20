import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { deleteEntry } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

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

export default async function journalPage({
  params,
}: {
  params: { id: string };
}) {
  const journal = await getJournal(params.id);

  if (!journal) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {journal.title}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/journal/${journal.id}/edit`}>
              <Button variant="default">
                <Edit className="w-4 h-4" />
                Edit Entry
              </Button>
            </Link>

            <form action={deleteEntry}>
              <input type="hidden" name="id" value={journal.id} />
              <Button variant="destructive">
                <Trash className="w-4 h-4" />
                Delete Entry
              </Button>
            </form>
          </div>
        </div>

        <Card className="max-w-4xl mx-auto mt-8 p-6">
          <CardContent>
            <h1 className="text-lg font-semibold pt-2">{journal.title}</h1>
            <p className="text-sm text-muted-foreground pt-1">
              {journal.content}
            </p>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mt-8 p-6">
          <CardContent>
            <CardTitle>Tags</CardTitle>
            <div className="flex flex-wrap gap-2 mt-4">
              {journal.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="max-w-4xl mx-auto mt-8 p-6">
          <CardContent>
            <CardTitle>Details</CardTitle>
            <div className="flex flex-col space-y-2 pt-2">
              <p className="text-sm text-muted-foreground flex flex-col">
                <span className="font-bold">Date:</span>
                {new Intl.DateTimeFormat("en-US").format(journal.date)}
              </p>
              <p className="text-sm text-muted-foreground flex flex-col">
                <span className="font-bold">Mood:</span>
                {journal.mood}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
