import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import { IJournalUserResp, getUserJournals } from "../../api/journal";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  FormLabel,
  Heading,
  Textarea,
  Spinner,
} from "@chakra-ui/react";
import moment from "moment";

interface IJournalHistoryProps {}

const JournalHistory: React.FC<IJournalHistoryProps> = () => {
  const token = getToken();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  const {
    isLoading,
    error,
    data: historyJournals,
  } = useQuery<IJournalUserResp>({
    queryKey: ["historyJournals"],
    queryFn: () => getUserJournals(),
  });
  return (
    <Box
      width={["90%", "80%", "80%"]}
      margin="auto"
      padding="1rem"
      border={"1px solid #d4dae9"}
      paddingTop="0.5rem"
      paddingBottom="0.5rem"
      borderRadius="10px"
      marginTop={"2rem"}
    >
      <Heading as="h3" size="lg" margin="auto" width="fit-content">
        All logged Journals
      </Heading>
      {isLoading && (
        <Box display="flex" justifyContent="center">
          <Spinner />
        </Box>
      )}
      {error && <Box>{error.message}</Box>}
      {historyJournals?.data.length === 0 && (
        <Box display="flex" justifyContent="center" padding={"1rem"}>
          No Journals Found
        </Box>
      )}
      <Box paddingTop="2rem" paddingBottom="2rem">
        <Accordion allowToggle>
          {historyJournals?.data.map((journal, index) => (
            <AccordionItem key={index}>
              <AccordionButton _expanded={{ bg: "#8fc6f9" }}>
                <Box
                  width={"100%"}
                  display="flex"
                  justifyContent="space-between"
                >
                  <Heading
                    as="h4"
                    width="fit-content"
                    textAlign="left"
                    size="md"
                  >
                    {journal.journal}
                  </Heading>
                  <Box display="flex" gap="0.5rem" justifyContent={"end"}>
                    <span>
                      {moment
                        .unix(journal.time_stamp)
                        .format("MMMM Do YYYY h:mm:ss a")}
                    </span>
                    <AccordionIcon />
                  </Box>
                </Box>
              </AccordionButton>
              <AccordionPanel
                padding="1rem"
                border="1px solid #d4dae9"
                borderRadius="10px"
                margin="1rem"
              >
                {journal.data.map((entry, index) => (
                  <Box padding="0.5rem" key={index}>
                    <FormLabel htmlFor={entry.prompt}>{entry.prompt}</FormLabel>
                    <Textarea
                      isDisabled
                      value={entry.answer}
                      name={entry.prompt}
                      rows={2}
                      _disabled={{ cursor: "text" }}
                    />
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
};

export default JournalHistory;
