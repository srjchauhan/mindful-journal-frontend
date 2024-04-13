import { Box, Image, Heading } from "@chakra-ui/react";
import * as React from "react";
import journalImage from "../../assests/journal_image.png";
interface IJournalCardProps {
  title: string;
  onClick: () => void;
}

const JournalCard: React.FC<IJournalCardProps> = ({ title, onClick }) => {
  return (
    <Box
      width="13rem"
      height='14rem'
      border="1px solid #d4dae9"
      padding="0.8rem"
      borderRadius="10px"
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      flexDirection='column'
      cursor='pointer'
      _hover={{ border: "1px solid #5a5a5a" }}
      onClick={onClick}
    >
      <Image  boxSize="8rem" src={journalImage} alt="jornal" />
      <Heading as="h5" size="md">
        {title}
      </Heading>
    </Box>
  );
};

export default JournalCard;
