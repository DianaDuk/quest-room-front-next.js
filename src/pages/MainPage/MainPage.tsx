"use client";

import { Box, Text, Button, Image, Flex, Divider } from "@chakra-ui/react";
import QuestCard from "@/components/QuestCard";
import { useState } from "react";
import { useQuests, type Quest } from "@/app/api/QuestAPI";

const MainPage = () => {
  const [activeFilter, setActiveFilter] = useState<string>("все квесты");

  const filters = [
    { title: "Все квесты", value: "все квесты", img: "/all-quests.svg" },
    { title: "Приключения", value: "приключения", img: "/advant.svg" },
    { title: "Ужасы", value: "ужасы", img: "/horrible.svg" },
    { title: "Мистика", value: "мистика", img: "/mistika.svg" },
    { title: "Детектив", value: "детектив", img: "/detectiv.svg" },
    { title: "Sci-fi", value: "sci-fi", img: "/scifi.svg" },
  ];

  const { data: quests, isLoading, error } = useQuests(activeFilter);

  const handleCategoryClick = (category: string) => {
    setActiveFilter(category);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading quest</Text>;

  return (
    <Flex direction="column" align="center">
 
      <Box pt={3} maxW="1082px" w="100%">
        <Text color="#F2890F" mb={2}>
          квесты в Днепре
        </Text>
        <Text fontSize="5xl" fontWeight="extrabold">
          Выберите тематику
        </Text>
      </Box>

      <Flex wrap="wrap" justify="center" pt={20} gap={10}>
        {filters.map((filter, index) => (
          <Flex key={index} align="center" gap={10}>
            <Button
              leftIcon={<Image src={filter.img} alt={filter.title} boxSize="24px" />}
              variant={activeFilter === filter.value ? "solid" : "ghost"}
              colorScheme={activeFilter === filter.value ? "orange" : "gray"}
              onClick={() => handleCategoryClick(filter.value)}
            >
              {filter.title}
            </Button>

            {index + 1 < filters.length && (
              <Divider orientation="vertical" borderColor="whiteAlpha.500" h="40px" />
            )}
          </Flex>
        ))}
      </Flex>

      <Flex justify="center" py={40}>
        <Flex wrap="wrap" gap={6} maxW="1082px" w="100%" justify="center">
          {quests?.map((quest) => (
            <QuestCard
              key={quest.id}
              title={quest.title}
              people={quest.players}
              level={quest.level}
              img={quest.image}
              id={quest.id}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MainPage;
