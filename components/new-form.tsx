"use client";
import { addNewEntry } from "@/lib/actions";
import { journalSchema } from "@/lib/schema";
import { parseWithZod } from "@conform-to/zod";
import React, { useActionState, useState } from "react";
import { useForm } from "@conform-to/react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Info, Loader2, Pen, Tag, Text, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFormStatus } from "react-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export const NewEntryForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const { pending } = useFormStatus();
  const [lastResult, action] = useActionState(addNewEntry, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: journalSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [mood, setMood] = useState(fields.mood.initialValue || "");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };
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
            <h1 className="text-3xl font-bold text-foreground">New Entry</h1>
          </div>
        </div>
        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          className="flex flex-col space-y-6"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Text className="w-4 h-4" />
                Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Label>Title</Label>
                <Input
                  type="text"
                  placeholder="Write your title here..."
                  key={fields?.title?.key || ""}
                  name={fields?.title?.name || ""}
                  defaultValue={fields?.title?.initialValue || ""}
                  className="w-full"
                />
                <p className="text-red-500 text-xs">{fields.title.errors}</p>
              </div>

              <div className="space-y-4 mt-4">
                <Label>Content</Label>
                <Textarea
                  placeholder="Write your content here..."
                  key={fields?.content?.key || ""}
                  name={fields?.content?.name || ""}
                  defaultValue={fields?.content?.initialValue || ""}
                  className="w-full"
                />
                <p className="text-red-500 text-xs">{fields.content.errors}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Add a tag..."
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  size="sm"
                  variant="outline"
                >
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveTag(tag);
                        }}
                      >
                        <X className="w-3 h-3 cursor-pointer" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
            <input
              type="hidden"
              name={fields.tags.name}
              value={JSON.stringify(tags)}
            />
            <p className="text-red-500 text-xs">{fields.tags.errors}</p>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-4 h-4" />
                Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Input
                  type="date"
                  name={fields.date.name}
                  value={fields.date.initialValue}
                />
                <p className="text-red-500 text-xs pt-2">
                  {fields.date.errors}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Mood</label>
                <Select value={mood} onValueChange={setMood}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="🤩">🤩</SelectItem>
                    <SelectItem value="😊">😊</SelectItem>
                    <SelectItem value="😐">😐</SelectItem>
                    <SelectItem value="😢">😢</SelectItem>
                    <SelectItem value="😠">😠</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name={fields.mood.name} value={mood} />
                <p className="text-red-500 text-xs pt-2">
                  {fields.mood.errors}
                </p>
              </div>
            </CardContent>
          </Card>

          {pending ? (
            <Button disabled variant="default" className="w-full">
              <Loader2 className="mr-2 size-4 animate-spin" />
              Saving Entry...
            </Button>
          ) : (
            <Button type="submit" variant="default" className="w-full">
              Save Entry
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};
