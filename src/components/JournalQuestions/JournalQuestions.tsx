import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import * as React from "react";
import {
  IJournal,
  IJournalPost,
  IJournalPostResp,
  postJournal,
} from "../../api/journal";
import { useMutation } from "@tanstack/react-query";
import { CloseIcon } from "@chakra-ui/icons";
interface JournalQuestionsProps {
  journal: IJournal;
  onSuccess: () => void;
}

const JournalQuestions: React.FC<JournalQuestionsProps> = ({
  journal,
  onSuccess,
}) => {
  const toast = useToast();
  const { mutate: postJournals, isPending } = useMutation({
    mutationFn: (journal: IJournalPost) => postJournal(journal),
    mutationKey: ["addJournals"],
    onSuccess: (data: IJournalPostResp) => {
      toast({
        title: "Success",
        description: data.message,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
      onSuccess();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-right",
      });
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formentries = Object.fromEntries(formData.entries());
    const data = Object.keys(formentries).map((key) => {
      return { prompt: key, answer: formentries[key] };
    });
    const payload = {
      journal: journal.journal,
      data,
    };
    postJournals(payload as IJournalPost);
  };
  return (
    <Box border="1px solid #d4dae9" padding="0.8rem" borderRadius="10px">
      <Box display='flex'>
      <Heading as="h3" size="lg" margin="auto" width="fit-content">
        {journal.journal}
      </Heading>
      <Button onClick={onSuccess}><CloseIcon /></Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          {journal.prompts.map((prompt, index) => (
            <Box padding="1rem" key={index}>
              <FormLabel htmlFor={prompt}> {prompt} </FormLabel>
              <Textarea required name={prompt} />
            </Box>
          ))}
          <Box
            padding="1rem"
            display="flex"
            justifyContent="center"
            flexDirection="column"
            gap="0.5rem"
          >
            {isPending && <Spinner margin="auto" />}
            <Input
              background="#8fc6f9"
              _hover={{ background: "#57aeff" }}
              isDisabled={isPending}
              cursor="pointer"
              type="submit"
              value="Submit"
            />
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default JournalQuestions;
