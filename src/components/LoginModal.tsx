"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useLogin } from "@/app/api/AuthAPI"; 
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess: (name: string) => void;
}

const formSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать минимум 6 символов" }),
});

type FormData = z.output<typeof formSchema>;

const LoginModal = ({
  isOpen,
  onClose,
  onSwitchToRegister,
  onLoginSuccess,
}: ModalProps) => {
  const router = useRouter();
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data);

      localStorage.setItem("token", response.access_token);
      localStorage.setItem("userName", response.user.name);

      onLoginSuccess(response.user.name);

      alert("Вы успешно вошли!");
      onClose();
      router.push("/");
    } catch (error: any) {
      const message = error?.message || "Ошибка входа. Попробуйте ещё раз.";
      if (message.toLowerCase().includes("email")) {
        setError("email", { type: "server", message });
      } else {
        alert(message);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#1F1D1D"
        w="480px"
        h="auto"
        borderRadius="none"
        maxW="500px"
        p="40px"
        fontFamily="sans-serif"
      >
        <ModalHeader
          p="0"
          mb="30px"
          fontWeight="800"
          fontSize="28px"
          textColor="#FFFFFF"
        >
          Вход
        </ModalHeader>
        <ModalCloseButton
          top="40px"
          right="20px"
          color="#888"
          _hover={{ color: "#000" }}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody p="0">
            <FormControl mb="32px">
              <FormLabel fontSize="15px" mb="10px" textColor="#FFFFFF">
                Email
              </FormLabel>
              <Input
                {...register("email")}
                placeholder="Email"
                borderRadius="0"
                border="1px solid #ddd"
                p="15px"
                textColor="#FFFFFF"
              />
              {errors.email && (
                <Text color="red.400" fontSize="sm" mt="5px">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>

            <FormControl mb="32px">
              <FormLabel fontSize="15px" mb="10px" textColor="#FFFFFF">
                Пароль
              </FormLabel>
              <Input
                {...register("password")}
                placeholder="Пароль"
                type="password"
                borderRadius="0"
                border="1px solid #ddd"
                p="15px"
                textColor="#FFFFFF"
              />
              {errors.password && (
                <Text color="red.400" fontSize="sm" mt="5px">
                  {errors.password.message}
                </Text>
              )}
            </FormControl>

            <ModalFooter
              p="0"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="12px"
            >
              <Text
                fontSize="12px"
                color="#F2890F"
                textAlign="center"
                cursor="pointer"
                textDecoration="underline"
                onClick={() => {
                  onClose();
                  router.push("/auth/refresh");
                }}
              >
                Забыли пароль?
              </Text>

              <Button
                type="submit"
                bgColor="#F28A0F"
                color="white"
                _hover={{ bg: "#e07d0d" }}
                maxW="219px"
                w="100%"
                fontSize="12px"
                fontWeight="600"
                textTransform="uppercase"
                borderRadius="65px"
                border="none"
              >
                Войти
              </Button>

              <Text
                fontSize="12px"
                color="#E5E5E5"
                textAlign="center"
                cursor="pointer"
                onClick={() => {
                  onClose();
                  onSwitchToRegister();
                }}
              >
                Нет аккаунта?{" "}
                <Box as="span" textDecoration="underline" color="#F2890F">
                  Зарегистрируйтесь
                </Box>
              </Text>
            </ModalFooter>
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
