import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-8">
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
