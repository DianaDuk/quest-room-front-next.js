"use client";

import {
  Box,
  Flex,
  List,
  ListItem,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";


const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [modal, setModal] = useState<"login" | "register" | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUserName(null);
    router.push("/");
  };

  const handleLoginSuccess = (name: string) => {
    setUserName(name);
    setModal(null);
  };

  const getLinkStyle = (href: string) => {
    if (pathname === href) {
      return {
        backgroundColor: "#F2890F",
        padding: "4px 8px",
        borderRadius: "6px",
        fontWeight: "bold",
        color: "white",
        textDecoration: "none",
      };
    }
    return {
      textDecoration: "none",
      color: "#fff",
    };
  };

    return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={5}
      px={7}
      bg="transparent"
    >

      <Box>
        <Image
          src="/logo-header.png"
          alt="Escape Room Logo"
          width={100}
          height={100}
        />
      </Box>


      <HStack as={List} spacing={12} align="center">
        <ListItem>
          <Link href="/" style={getLinkStyle("/")}>
            КВЕСТЫ
          </Link>
        </ListItem>
        <ListItem>
          <Link href="" style={getLinkStyle("")}>
            НОВИЧКАМ
          </Link>
        </ListItem>
        <ListItem>
          <Link href="" style={getLinkStyle("")}>
            ОТЗЫВЫ
          </Link>
        </ListItem>
        <ListItem>
          <Link href="" style={getLinkStyle("")}>
            АКЦИИ
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/contacts" style={getLinkStyle("/contacts")}>
            КОНТАКТЫ
          </Link>
        </ListItem>
      </HStack>


      <Flex w="134px" justify="flex-end" align="center" gap={2}>
        {userName ? (
          <>
            <Menu>
              <MenuButton>
                <Image src="/person.svg" alt="Person svg" width={24} height={24} />
              </MenuButton>
              <MenuList bg="#141414" borderColor="#333">
                <MenuItem bg="#141414" color="white" onClick={logout}>
                  Выйти
                </MenuItem>
              </MenuList>
            </Menu>
            <Text color="white">{userName}</Text>
          </>
        ) : (
          <Box
            w="134px"
            display="flex"
            justifyContent="flex-end"
            onClick={() => setModal("login")}
            cursor="pointer"
          >
            <Image src="/person.svg" alt="Person svg" width={24} height={24} />
          </Box>
        )}
      </Flex>

      {modal === 'login' && (
          <LoginModal
          isOpen={true}
          onClose={() => setModal(null)}
          onSwitchToRegister={() => setModal('register')}
          onLoginSuccess={handleLoginSuccess}
          />
        )}

        {modal === 'register' && (
          <RegisterModal
          isOpen={true}
          onClose={() => setModal(null)}
          onSwitchToLogin={() => setModal('login')}
          />
        )}
    </Flex>
  );
};

export default Header;
