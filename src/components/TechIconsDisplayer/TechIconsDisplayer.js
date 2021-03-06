import React from "react";
import { useConfig } from "../../contexts/Config";
import IconDisplayer from "../UI/Icons/IconDisplayer";
import ensureIcon from "../../utils/EnsureIcon/EnsureIcon";

const TechIconsDisplayer = ({ collection }) => {
  const { techIcons } = useConfig();

  return collection.map(tech =>
    ensureIcon(
      techIcons,
      tech,
      icon =>
        icon && <IconDisplayer key={tech} name={icon.name} src={icon.path} />
    )
  );
};

export default TechIconsDisplayer;
