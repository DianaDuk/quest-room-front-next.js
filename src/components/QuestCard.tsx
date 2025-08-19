"use client";

import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface QuestCardProps {
  id: number;
  title: string;
  people: string;
  level: string;
  img: string; 
}

const QuestCard = ({ id, title, people, level, img }: QuestCardProps) => {
  const router = useRouter();

  return (
    <Box
      position="relative"
      w="344px"
      h="232px"
      borderRadius="3px"
      overflow="hidden"
      cursor="pointer"
      onClick={() => router.push(`/quests/${id}`)}
    >

      <Box
        bgImage={`url(${img})`}
        bgSize="cover"
        bgPos="center"
        w="100%"
        h="100%"
      />


      <Flex
        position="absolute"
        bottom="0"
        left="0"
        w="100%"
        p="15px"
        flexDirection="column"
        bgGradient="linear(to-t, rgba(0,0,0,0.8), transparent)"
      >
        <Text fontWeight="bold" fontSize="2xl" color="white">
          {title}
        </Text>

        <Flex mt="10px" align="center" gap="10px" color="white">
          <Flex align="center" gap="7px">
            <Image src="/person.svg" alt="players" w="16px" h="16px" />
            <Text>{people} чел</Text>
          </Flex>

          <Box w="1px" h="20px" bg="white" />

          <Flex align="center" gap="7px">
            <Image src="/puzzle.svg" alt="level" w="16px" h="16px" />
            <Text>{level}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default QuestCard;
