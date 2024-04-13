import React from "react";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../../api/auth";
import { Box, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    mutate: signupMutation,
    error,
  } = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => signup(username, password),
    mutationKey: ["signup"],
    onSuccess: () => {
      navigate("/login");
    },
    onError: (error: any) => {
      console.error(error); // Handle signup errors
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    signupMutation({ username, password });
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
        <Heading as='h3' size="lg">Register</Heading>
        <Box paddingTop='1rem'>
        <FormLabel htmlFor="username"> UserName </FormLabel>
        <Input required type="text" name="username" id="username" />
        <FormLabel htmlFor="password"> Password </FormLabel>
        <Input isInvalid={false} required type="password" name="password" id="password" />
        <Box paddingTop='1rem'>
          <Link href="/login" color='teal'> SignIn </Link>
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

export default SignupForm;
