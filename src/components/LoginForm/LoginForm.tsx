// src/components/LoginForm.tsx
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { login, ILoginResp } from "../../api/auth";
import { setToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Box,
  Link,
} from "@chakra-ui/react";
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    mutate: loginMutation,
    error,
  } = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => login(username, password),
    mutationKey: ["login"],
    onSuccess: (data: ILoginResp) => {
      setToken(` ${data.token_type} ${data.access_token}`);
      navigate("/");
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    loginMutation({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} id="login" name="login" method="post">
      <FormControl
        border="1px solid #d4dae9"
        borderRadius="10px"
        width={["80%", "60%", "40%"]}
        margin="auto"
        isRequired
        padding="2rem 1rem"
        marginTop="2rem"
        isInvalid={!!error?.message}
      >
        <Heading as='h3' size="lg">Login</Heading>
        <Box paddingTop='1rem'>
        <FormLabel htmlFor="username"> UserName </FormLabel>
        <Input required type="text" name="username" id="username" />
        <FormLabel htmlFor="password"> Password </FormLabel>
        <Input  required type="password" name="password" id="password" />
        <Box paddingTop='1rem'>
          <Link href="/signup" color='teal'> Signup </Link>
        </Box>
        <Input
          marginTop="1rem"
          background="#8fc6f9"
          _hover={{ background: "#57aeff" }}
          type="submit"
          value="Login"
          cursor='pointer'
        />
        {error?.message && <FormErrorMessage>{error?.message}</FormErrorMessage>}
        </Box>
      </FormControl>
    </form>
  );
};

export default LoginForm;
