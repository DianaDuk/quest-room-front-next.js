"use client";

import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:5000'

export interface Quest {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: number;
  players: string;
  level: string;
  image: string;
}

const fetchQuests = async (category: string): Promise<Quest[]> => {
  const query =
    category && category !== "все квесты"
      ? `?search=${encodeURIComponent(category)}`
      : "";
  const response = await fetch(`${API_URL}/quests${query}`);

  if (!response.ok) throw new Error("Не удалось загрузить квесты");

  return response.json();
};

const fetchQuest = async (id: number): Promise<Quest> => {
  const response = await fetch(`${API_URL}/quests/${id}`);

  if (!response.ok) throw new Error("Не удалось загрузить квест");

  return response.json();
};

export const useQuests = (category: string) => {
  return useQuery<Quest[], Error>({
    queryKey: ["quests", category],
    queryFn: () => fetchQuests(category),
  });
};

export const useQuest = (id: number) => {
  return useQuery<Quest, Error>({
    queryKey: ["quest", id],
    queryFn: () => fetchQuest(id),
    enabled: !!id,
  });
};
