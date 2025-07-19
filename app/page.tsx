import { Journals } from "@/components/journals";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterIcon, PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6"></div>
      <div className="flex flex-col">
        <div className="text-left space-y-2">
          <h2 className="text-4xl font-bold text-primary">Welcome back</h2>
          <p className="text-lg text-muted-foreground">
            Your thoughts, beautifully organized
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 mt-8">
          <div className="relative w-full">
            <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              placeholder="Search your entries..."
              className="pl-8 border"
            />
          </div>
          <Button>
            <FilterIcon className="h-4 w-4" />
            <span>All moods</span>
          </Button>
          <Button asChild>
            <Link href="/new">
              <PlusIcon className="h-4 w-4" />
              <span>New Entry</span>
            </Link>
          </Button>
        </div>

        <Journals />
      </div>
    </div>
  );
}
