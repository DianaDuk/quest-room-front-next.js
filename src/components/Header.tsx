"use client";

import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/menu";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";

const Header = () => {
    const router = useRouter();
    const [modal, setModal] = useState<'login' | 'register' | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const name = localStorage.getItem('userName');
        if(name) setUserName(name)
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        router.push('/');
    };

    const handleLoginSuccess = (name: string) => {
        setUserName(name);
        setModal(null);
    }

    const linkStyle = {
        textDecoration: "none",
         color: "#fff",
    };

    const activeStyle = {
        color: "#F2890F", 
        fontWeight: "bold",
    };

    return (
    <Box className="flex items-center justify-between py-5 px-7">
        <Box>
            <Image src='/logo-header.png' alt='Escape Room Logo' fill style={{ objectFit: 'contain' }}  />
        </Box>
         <List className="flex items-center gap-12">
                <ListItem> <Link href="/" style={ linkStyle }>КВЕСТЫ</Link></ListItem>
                <ListItem><Link href="" style={ linkStyle }>НОВИЧКАМ</Link></ListItem>
                <ListItem><Link href="" style={ linkStyle }>ОТЗЫВЫ</Link></ListItem>
                <ListItem><Link href="" style={ linkStyle }>АКЦИИ</Link></ListItem>
                <ListItem><Link href="/contacts" style={ linkStyle }>КОНТАКТЫ</Link></ListItem>
            </List>

             <Box w="134px" className="flex justify-end items-center gap-2">
        {userName ? (
          <>
            <Menu>
              <MenuButton>
                <Image src="/person.svg" alt="Person svg" width={24} />
              </MenuButton>
              <MenuList bgColor="#141414">
                <MenuItem bgColor="#141414" color="#FFFFF" onClick={logout}>Выйти</MenuItem>
              </MenuList>
            </Menu>
            <Text color="white">{userName}</Text>
          </>
        ) : (
        <Box w="134px" className="flex justify-end" onClick={() => setModal('login')}>
          <Image src="/person.svg" alt="Person svg" width={24} height={24} />
        </Box>
        )}
        </Box>

        {/* {modal === 'login' && (
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
        )} */}
    </Box>
    )
}

export default Header