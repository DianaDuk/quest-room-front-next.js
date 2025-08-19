"use client";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSendResetEmail, useResetPassword } from "@/app/api/AuthAPI";

const emailSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
});

const passwordSchema = z
  .object({
    password: z.string().min(6, { message: "Минимум 6 символов" }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

type EmailFormData = z.infer<typeof emailSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

interface ResetPasswordProps {
  token?: string;
}

const ResetPasswordPage : React.FC<ResetPasswordProps> = ({ token }) => {
  const router = useRouter();

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const passwordForm = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const sendEmailMutation = useSendResetEmail();
  const resetPasswordMutation = useResetPassword();

  const onSubmit = (data: EmailFormData | PasswordFormData) => {
    if (!token) {
      const { email } = data as EmailFormData;
      sendEmailMutation.mutate(
        { email },
        {
          onSuccess: () => {
            alert("Письмо отправлено. Проверьте почту.");
          },
          onError: () => {
            alert("Произошла ошибка. Попробуйте позже.");
          },
        }
      );
    } else {
      const { password } = data as PasswordFormData;
      resetPasswordMutation.mutate(
        { password, token: token as string },
        {
          onSuccess: () => {
            alert("Пароль успешно обновлён");
            router.push("/");
          },
          onError: () => {
            alert("Ошибка при обновлении пароля");
          },
        }
      );
    }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="100px"
      p="30px"
      bg="#1F1D1D"
      borderRadius="md"
    >
      <Heading mb="30px" color="white" fontSize="24px" textAlign="center">
        {token ? "Введите новый пароль" : "Восстановление пароля"}
      </Heading>

      <form
        onSubmit={
          token
            ? passwordForm.handleSubmit(onSubmit)
            : emailForm.handleSubmit(onSubmit)
        }
      >
        {!token ? (
          <FormControl mb="20px">
            <FormLabel color="white">Email</FormLabel>
            <Input
              {...emailForm.register("email")}
              placeholder="Введите email"
              bg="#2B2A2A"
              color="white"
              borderRadius="md"
              border="1px solid #444"
              _placeholder={{ color: "gray.400" }}
            />
            {emailForm.formState.errors.email && (
              <Text color="red.400" fontSize="sm" mt="5px">
                {emailForm.formState.errors.email.message}
              </Text>
            )}
          </FormControl>
        ) : (
          <>
            <FormControl mb="20px">
              <FormLabel color="white">Новый пароль</FormLabel>
              <Input
                type="password"
                {...passwordForm.register("password")}
                placeholder="Новый пароль"
                bg="#2B2A2A"
                color="white"
                borderRadius="md"
                border="1px solid #444"
                _placeholder={{ color: "gray.400" }}
              />
              {passwordForm.formState.errors.password && (
                <Text color="red.400" fontSize="sm" mt="5px">
                  {passwordForm.formState.errors.password.message}
                </Text>
              )}
            </FormControl>

            <FormControl mb="20px">
              <FormLabel color="white">Повторите пароль</FormLabel>
              <Input
                type="password"
                {...passwordForm.register("confirmPassword")}
                placeholder="Повторите пароль"
                bg="#2B2A2A"
                color="white"
                borderRadius="md"
                border="1px solid #444"
                _placeholder={{ color: "gray.400" }}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <Text color="red.400" fontSize="sm" mt="5px">
                  {passwordForm.formState.errors.confirmPassword.message}
                </Text>
              )}
            </FormControl>
          </>
        )}

        <Button
          type="submit"
          bg="#F28A0F"
          color="white"
          width="100%"
          mt="10px"
          _hover={{ bg: "#e07d0d" }}
        >
          {token ? "Сбросить пароль" : "Отправить письмо"}
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordPage;
