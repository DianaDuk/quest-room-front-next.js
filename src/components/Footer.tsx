"use client";

import { Box } from "@chakra-ui/react"
import Image from "next/image"


const Footer = () => {
    return (
        <Box className="flex items-start" pl="20px" pb="20px" gap="5px">
            <Image src="/skype.svg" alt="" fill style={{ objectFit: 'contain' }} />
            <Image src="/vk.svg" alt="" fill style={{ objectFit: 'contain' }} />
        </Box>
    )
}

export default Footer