import React from "react";
import styled from "styled-components";
import { Card, CardActions, CardContent, CardMedia } from "@material-ui/core/";
import {
  productStyle,
  productTitleStyle,
  actionTechIconsStyle,
  technologiesIconsContainerStyle,
} from "./Product.style";
import IconDisplayer from "../../UI/Icons/IconDisplayer";
import settings from "../../../../settings/settings";
import SocialIcons from "../../UI/SocialIcons/SocialIcons";

const Product = styled.div`
  ${productStyle}
`;

const ProductTitle = styled.div`
  ${productTitleStyle}
`;

const TechnologiesIconsContainer = styled.div`
  ${technologiesIconsContainerStyle}
`;

const ActionTechIcons = styled.div`
  ${actionTechIconsStyle}
`;

const product = ({ name, cover, description, technologies, socialLinks }) => {
  return (
    <Product>
      <Card className="Card">
        {cover && <CardMedia image={cover} title={name} />}
        <CardContent>
          <ProductTitle>
            {name}
            {technologies && (
              <TechnologiesIconsContainer>
                {technologies.map(tech =>
                  settings.technologyIcons[tech] ? (
                    <IconDisplayer
                      key={tech}
                      name={settings.technologyIcons[tech].name}
                      src={settings.technologyIcons[tech].icon}
                    />
                  ) : (
                    /* eslint-disable-next-line no-console */
                    console.warn(
                      `There is no icon path specified in the settings for ${tech} technology`
                    )
                  )
                )}
              </TechnologiesIconsContainer>
            )}
          </ProductTitle>
          {description && <div>{description}</div>}
        </CardContent>
        {socialLinks && (
          <CardActions>
            <ActionTechIcons className="action__techIcons">
              <SocialIcons links={socialLinks} />
            </ActionTechIcons>
          </CardActions>
        )}
      </Card>
    </Product>
  );
};

export default product;
