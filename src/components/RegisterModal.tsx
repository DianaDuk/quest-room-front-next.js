"use client";

import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/app/api/AuthAPI";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать минимум 2 символа" }),
  surname: z.string().min(2, { message: "Фамилия должна содержать минимум 2 символа" }),
  email: z.string().email({ message: "Введите корректный email" }),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, { message: "Введите корректный номер телефона" }),
  password: z.string().min(6, { message: "Пароль должен содержать минимум 6 символов" }),
  agree: z.literal(true, { message: "Вы должны согласиться с условиями" }),
});

type FormData = z.output<typeof formSchema>;

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }: ModalProps) => {
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        alert("Вы успешно зарегистрированы!");
        onClose();
      },
      onError: (error: any) => {
        const message =
          error?.message || "Произошла ошибка регистрации. Попробуйте ещё раз.";
        if (message.toLowerCase().includes("email")) {
          setError("email", { type: "server", message });
        } else {
          alert(message);
        }
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#1F1D1D"
        w="480px"
        maxW="500px"
        borderRadius="none"
        p="40px"
        fontFamily="sans-serif"
        overflowY="auto"
      >
        <ModalHeader
          p="0"
          mb="30px"
          fontWeight="800"
          fontSize="28px"
          color="#FFFFFF"
        >
          Регистрация
        </ModalHeader>
        <ModalCloseButton
          top="40px"
          right="20px"
          color="#888"
          _hover={{ color: "#000" }}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody p="0">
            {/* Имя */}
            <FormControl mb="32px">
              <FormLabel fontSize="15px" mb="10px" color="#FFFFFF">
                Имя
              </FormLabel>
              <Input
                {...register("name")}
                placeholder="Имя"
                borderRadius="0"
                border="1px solid #ddd"
                p="15px"
                color="#FFFFFF"
              />
              {errors.name && (
                <Text color="red.400" fontSize="sm" mt="5px">
                  {errors.name.message}
                </Text>
              )}
            </FormControl>

            {/* Фамилия */}
            <FormControl mb="32px">
              <FormLabel fontSize="15px" mb="10px" color="#FFFFFF">
                Фамилия
              </FormLabel>
              <Input
                {...register("surname")}
                placeholder="Фамилия"
                borderRadius="0"
                border="1px solid #ddd"
                p="15px"
                color="#FFFFFF"
              />
              {errors.surname && (
                <Text color="red.400" fontSize="sm" mt="5px">
                  {errors.surname.message}
                </Text>
              )}
            </FormControl>

            {/* Email */}
            <FormControl mb="32px">
              <FormLabel fontSize="15px" mb="10px" color="#FFFFFF">
                Email
              </FormLabel>
              <Input
                {...register("email")}
                placeholder="Email"
                borderRadius="0"
                border="1px solid #ddd"
                p="15px"
                color="#FFFFFF"
              />
              {errors.email && (
                <Text color="red.400" fontSize="sm" mt="5px">
                  {errors.email.message}
                </Text>
              )}
            </FormControl>

            {/* Телефон */}
            <FormControl mb="32px">
              <FormLabel fontSize="15px" mb="10px" color="#FFFFFF">
                Контактный телефон
              </FormLabel>
              <Input
                {...register("phone")}
                placeholder="Телефон"
                type="tel"
                borderRadius="0"
                border="1px solid #ddd"
                p="15px"
                color="#FFFFFF"
              />
              {errors.phone && (
                <Text color="red.400" fontSize="sm" mt="5px">
                  {errors.phone.message}
                </Text>
              )}
            </FormControl>

            {/* Пароль */}
            <FormControl mb="32px">
              <FormLabel fontSize="15px" mb="10px" color="#FFFFFF">
                Пароль
              </FormLabel>
              <Input
                {...register("password")}
                placeholder="Пароль"
                type="password"
                borderRadius="0"
                border="1px solid #ddd"
                p="15px"
                color="#FFFFFF"
              />
              {errors.password && (
                <Text color="red.400" fontSize="sm" mt="5px">
                  {errors.password.message}
                </Text>
              )}
            </FormControl>

            {/* Кнопка регистрации */}
            <ModalFooter p="0" display="flex" justifyContent="center" mb="28px">
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
                Зарегистрироваться
              </Button>
            </ModalFooter>

            {/* Переключение на логин */}
            <Text
              fontSize="12px"
              color="#E5E5E5"
              textAlign="center"
              cursor="pointer"
              mt="15px"
              mb="20px"
              onClick={() => {
                onClose();
                onSwitchToLogin();
              }}
            >
              Уже есть аккаунт?{" "}
              <Box as="span" textDecoration="underline" color="#F2890F">
                Войти
              </Box>
            </Text>

            {/* Чекбокс согласия */}
            <Checkbox
              {...register("agree")}
              colorScheme="orange"
              alignItems="flex-start"
              sx={{
                ".chakra-checkbox__control": {
                  bg: "#F2890F",
                  border: "none",
                  borderRadius: "4px",
                  _checked: { bg: "#C85C00", border: "none" },
                  _hover: { bg: "#a64a00", border: "none" },
                },
              }}
            >
              <Text fontSize="12px" color="#E5E5E5" lineHeight="1.4">
                Я согласен с{" "}
                <Box as="span" textDecoration="underline">
                  правилами обработки персональных данных
                </Box>{" "}
                и пользовательским соглашением
              </Text>
            </Checkbox>
            {errors.agree && (
              <Text color="red.400" fontSize="sm" mt="5px">
                {errors.agree.message}
              </Text>
            )}
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
