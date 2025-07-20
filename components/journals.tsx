import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "@/lib/prisma";

async function getJournals() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return [];
  }

  const data = await prisma.journal.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      date: "desc",
    },
  });

  return data;
}

export const Journals = async () => {
  const journals = await getJournals();
  return (
    <>
      {journals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {journals.map(item => (
            <Link href={`/journal/${item.id}`} key={item.id}>
              <Card className="hover:bg-card/80 transition-opacity duration-200">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                      {new Intl.DateTimeFormat("en-US").format(item.date)}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.mood}</p>
                  </div>
                  <h1 className="text-lg font-semibold pt-2">{item.title}</h1>
                  <p className="text-sm text-muted-foreground pt-1">
                    {item.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.slice(0, 2).map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                        {`+${item.tags.length - 2}`}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="mt-8">
          <CardContent className="text-center">
            <h2 className="text-lg font-semibold text-muted-foreground">
              No Entries Found
            </h2>
            <p className="text-sm text-muted-foreground">
              Create a new journal entry by clicking New Entry or
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs ml-1 rounded">
                Ctrl/Cmd + N
              </span>
            </p>
          </CardContent>
        </Card>
      )}
    </>
  );
};
