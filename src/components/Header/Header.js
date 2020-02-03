import React from "react";
import styled from "styled-components";
import settings from "../../../settings/settings.json";
import {
  headerStyle,
  headerIconsContainerStyle,
  logoTextStyle,
  logoStyle,
} from "./Header.style";
import ToggleButton from "./ToggleButton/ToggleButton";
import TechIcons from "./TechIcons/TechIcons";
import TechNames from "./TechNames/TechNames";
import TeamMembers from "./TeamMembers/TeamMembers";

const Header = styled.div`
  ${headerStyle}
`;

const HeaderIconsContainer = styled.div`
  ${headerIconsContainerStyle}
`;

const LogoText = styled.p`
  ${logoTextStyle}
`;

const Logo = styled.img`
  ${logoStyle}
`;

const header = () => (
  <Header>
    {settings.logo ? <Logo src={settings.logo} alt={settings.name} /> : null}
    {settings.name ? <LogoText>{settings.name}</LogoText> : null}
    <ToggleButton />
    {settings.header && settings.header.technologies ? (
      <HeaderIconsContainer>
        {settings.display === "icon" ? <TechIcons /> : <TechNames />}
        {settings.header.teamMembers ? <TeamMembers /> : null}
      </HeaderIconsContainer>
    ) : null}
  </Header>
);

export default header;
