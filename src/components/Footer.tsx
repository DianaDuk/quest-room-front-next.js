"use client";

import { Box } from "@chakra-ui/react";
import Image from "next/image";

const Footer = () => {
  return (
    <Box display="flex" alignItems="start" pl="20px" pb="20px" gap="5px">
      <Image src="/skype.svg" alt="Skype" width={20} height={20} />
      <Image src="/vk.svg" alt="VK" width={20} height={20} />
    </Box>
  );
};

export default Footer;
