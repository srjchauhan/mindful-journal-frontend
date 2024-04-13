import * as React from "react";
import { getToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Button,
  FormLabel,
  Heading,
  Spinner,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import JournalCard from "../JournalCard/JournalCard";
import {
  IJournal,
  IJournalResp,
  getJournals,
  getRandomJournals,
} from "../../api/journal";
import JournalQuestions from "../JournalQuestions/JournalQuestions";
const Dashboard: React.FC = () => {
  const token = getToken();
  const navigate = useNavigate();
  const [searchText, setSearchText] = React.useState<string>("");
  const [journals, setJournals] = React.useState<IJournalResp>();
  const [selectedJournal, setSelectedJournal] = React.useState<IJournal | null>(
    null
  );
  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const {
    isLoading,
    error,
    data: randomJournals,
  } = useQuery<IJournalResp>({
    queryKey: ["randomJournals"],
    queryFn: () => getRandomJournals(),
  });

  const {
    mutate: getSearchedJournals,
    isPending,
    error: searchError,
  } = useMutation({
    mutationFn: ({ text }: { text: string }) => getJournals(text),
    mutationKey: ["searchedJournals"],
    onSuccess: (data: IJournalResp) => {
      setJournals(data);
    },
  });

  const handleSearch = () => {
    if (!searchText.trim()) return;
    getSearchedJournals({ text: searchText });
  };
  const JournalCardClick = (journal: IJournal) => {
    setSelectedJournal(journal);
  };
  const currentJournals = journals || randomJournals;
  return (
    <Box width="100%" padding="1rem">
      <Box width="80%" margin="auto" padding="1rem 0">
        {!selectedJournal && (
          <>
            <FormLabel fontWeight="bold" htmlFor="answer">
              What will your like to journal today?
            </FormLabel>
            <Box display="flex" gap="0.5rem">
              <FormControl isInvalid={!!searchError}>
                <Input
                  name="answer"
                  id="answer"
                  type="text"
                  isInvalid={!!searchError}
                  errorBorderColor=""
                  onChange={(e) => setSearchText(e.target.value)}
                  value={searchText}
                  placeholder="like: my disagreement with boss, my webinar at office"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                ></Input>
                {!!searchError && (
                  <FormErrorMessage>{searchError?.message}</FormErrorMessage>
                )}
              </FormControl>
              <Button
                isDisabled={isPending || !searchText.trim()}
                _hover={{ bg: "#57aeff" }}
                variant="outline"
                onClick={handleSearch}
              >
                Submit
              </Button>
            </Box>
            <Box
              padding="1rem"
              marginTop="1rem"
              border="1px solid #d4dae9"
              borderRadius="10px"
              justifyContent="center"
              alignContent="center"
            >
              <Heading as="h3" fontSize="2xl" textAlign="center">
                Recommended Journals
              </Heading>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                gap="1rem"
                marginTop="1rem"
              >
                {(isLoading || isPending) && <Spinner />}
                {error && <p>{error.message}</p>}
                {!(isLoading || isPending) &&
                  currentJournals?.data?.map((journal, index) => (
                    <JournalCard
                      key={index}
                      title={journal.journal}
                      onClick={() => JournalCardClick(journal)}
                    />
                  ))}
              </Box>
            </Box>
          </>
        )}
        {selectedJournal && <JournalQuestions journal={selectedJournal} onSuccess={() => setSelectedJournal(null)} />}
      </Box>
    </Box>
  );
};

export default Dashboard;
