"use client";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  format,
} from "date-fns";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Entry = {
  id: string;
  date: string;
  mood: string;
  title: string;
};

export default function Calendar({
  entries,
  year,
  month,
}: {
  entries: Entry[];
  year: number;
  month: number;
}) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const currentMonth = new Date(year, month);
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEntriesForDate = (date: Date) =>
    entries.filter(e => isSameDay(new Date(e.date), date));

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case "😊":
        return "#FFD700";
      case "😢":
        return "#1E90FF";
      case "😡":
        return "#FF4500";
      case "🤩":
        return "#32CD32";
      case "😐":
        return "#A9A9A9";
      default:
        return "#f0f0f0";
    }
  };

  const monthYear = format(currentMonth, "MMMM yyyy");
  const currentDate = currentMonth;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-3">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{monthYear}</CardTitle>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm" /* add onClick to navigate months here */
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm" /* add onClick to navigate months here */
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
              <div
                key={day}
                className="text-center text-sm font-medium text-muted-foreground p-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {days.map(day => {
              const dayEntries = getEntriesForDate(day);
              const isSelected =
                selectedDate?.toDateString() === day.toDateString();
              const isToday = day.toDateString() === new Date().toDateString();

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDate(day)}
                  className={`aspect-square p-2 rounded-lg border-2 transition-all hover:bg-muted/50 ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : isToday
                      ? "border-primary/50"
                      : "border-transparent"
                  }`}
                >
                  <div className="text-sm font-medium mb-1">
                    {day.getDate()}
                  </div>
                  {dayEntries.length > 0 && (
                    <div className="flex flex-wrap gap-1 justify-center">
                      {dayEntries.slice(0, 3).map((entry, i) => (
                        <div
                          key={i}
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: getMoodColor(entry.mood),
                          }}
                        />
                      ))}
                      {dayEntries.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{dayEntries.length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total entries</span>
              <span className="font-medium">
                {
                  entries.filter(entry => {
                    const entryDate = new Date(entry.date);
                    return (
                      entryDate.getMonth() === currentDate.getMonth() &&
                      entryDate.getFullYear() === currentDate.getFullYear()
                    );
                  }).length
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Days with entries</span>
              <span className="font-medium">
                {
                  new Set(
                    entries
                      .filter(entry => {
                        const entryDate = new Date(entry.date);
                        return (
                          entryDate.getMonth() === currentDate.getMonth() &&
                          entryDate.getFullYear() === currentDate.getFullYear()
                        );
                      })
                      .map(entry => new Date(entry.date).getDate())
                  ).size
                }
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
