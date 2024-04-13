import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Icon,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GoHome } from "react-icons/go";
import { LuLogOut } from "react-icons/lu";
import { BsJournalText } from "react-icons/bs";
import * as React from "react";
import { removeToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { IUser, me } from "../../api/auth";
import { useQuery } from "@tanstack/react-query";

export interface IHeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
  const navigate = useNavigate();
  const handleMenuClick = (name: string) => {
    if (name === "logout") {
      removeToken();
      window.location.reload();
    } else if (name === "home") {
      navigate("/");
      window.location.reload();
    } else if (name === "myJournals") {
      navigate("/userJournal");
    }
  };

  const { isLoading, data } = useQuery<IUser>({
    queryKey: ["me"],
    queryFn: () => me(),
  });
  return (
    <Box>
      <Box
        width="100%"
        padding=" 0.5rem 1rem"
        border="1px solid #d4dae9"
        display="flex"
        justifyContent="space-between"
      >
        <Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <MenuItem
                onClick={() => {
                  handleMenuClick("home");
                }}
                icon={<Icon w={8} h={8} as={GoHome} />}
              >
                Home
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleMenuClick("myJournals");
                }}
                icon={<Icon w={8} h={7} as={BsJournalText} />}
              >
                My Journals
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleMenuClick("logout");
                }}
                icon={<Icon w={8} h={7} as={LuLogOut} />}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box margin={"auto 0"}>
          <Heading as="h3" size="md">
            Mindful Journal
          </Heading>
        </Box>
        <Box margin={"auto 0"}>
          <Heading as="h3" size="md">
            {data?.username}
          </Heading>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default Header;
