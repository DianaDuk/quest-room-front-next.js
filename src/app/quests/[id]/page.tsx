import QuestPage from "@/pages/QuestPage/QuestPage";

interface Props {
  params: { id: string };
}

export default function Quest({ params }: Props) {
  return <QuestPage questId={params.id} />;
}