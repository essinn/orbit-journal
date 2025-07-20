"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { journalSchema } from "./schema";

export async function addNewEntry(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const tagsRaw = formData.get("tags");
  if (typeof tagsRaw === "string") {
    formData.delete("tags");
    JSON.parse(tagsRaw).forEach((tag: string) => {
      formData.append("tags", tag);
    });
  }

  const submission = parseWithZod(formData, {
    schema: journalSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.journal.create({
    data: {
      title: submission.value.title,
      content: submission.value.content,
      date: new Date(submission.value.date),
      tags: submission.value.tags,
      mood: submission.value.mood,
      userId: user.id,
    },
  });

  redirect("/");
}

export const editEntry = async (prevState: unknown, formData: FormData) => {
  const journalId = formData.get("id") as string;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const tagsRaw = formData.get("tags");
  if (typeof tagsRaw === "string") {
    formData.delete("tags");
    JSON.parse(tagsRaw).forEach((tag: string) => {
      formData.append("tags", tag);
    });
  }

  const submission = parseWithZod(formData, {
    schema: journalSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.journal.update({
    where: { id: journalId, userId: user.id },
    data: {
      title: submission.value.title,
      content: submission.value.content,
      date: new Date(submission.value.date),
      tags: submission.value.tags,
      mood: submission.value.mood,
      userId: user.id,
    },
  });

  redirect(`/journal/${journalId}`);
};

export const deleteEntry = async (formData: FormData) => {
  const journalId = formData.get("id") as string;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/");
  }

  const journal = await prisma.journal.findUnique({
    where: { id: journalId, userId: user.id },
  });

  if (!journal) {
    redirect("/");
  }

  await prisma.journal.delete({
    where: { id: journalId },
  });

  redirect("/");
};
