import Calendar from "@/components/calender";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getJournalEntriesByMonth } from "@/lib/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CalendarPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const year = new Date().getFullYear();
  const month = new Date().getMonth();

  const userId = user?.id;
  if (!userId) {
    return (
      <Card className="mt-20 text-center">
        <CardHeader>
          <CardTitle>Unauthorized</CardTitle>
          <CardDescription>
            Please Sign In to view your calendar.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const entries = await getJournalEntriesByMonth({ year, month, userId });

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
              Calendar View
            </h1>
            <p className="text-muted-foreground">
              Your journaling journey at a glance
            </p>
          </div>
        </div>

        <Calendar entries={entries} year={year} month={month} />
      </div>
    </div>
  );
}
