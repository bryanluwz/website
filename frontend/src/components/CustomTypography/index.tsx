import React from "react";
import {
  Typography,
  TypographyProps,
  Link,
  LinkProps,
  Icon,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";
import { link } from "../PageCard/style.scss";

interface CustomTypographyProps extends TypographyProps {
  children: any;
  parseLinks?: {
    parseLinks?: boolean;
    addLinkIcon?: boolean;
    linkProps?: LinkProps;
  };
}

export const CustomTypography: React.FC<CustomTypographyProps> = ({
  children,
  parseLinks = { parseLinks: true, addLinkIcon: true, linkProps: {} },
  ...props
}) => {
  // Vibe coding here, but I think I know how this work
  const extractLinks = (text: string) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    text.replace(linkRegex, (match, linkText, linkUrl, index) => {
      // Push text before the match
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index));
      }

      // Push the Link component with Typography for the link text + icon
      parts.push(
        <>
          <Link
            {...parseLinks.linkProps}
            href={linkUrl}
            sx={{
              "&::after": {
                display: "none",
              },
            }}
          >
            <Typography
              key={index}
              {...props}
              component={"span"}
              style={{
                verticalAlign: "middle",
                paddingRight: "var(--margin-xxs)",
              }}
            >
              <Icon>
                <LinkIcon />
              </Icon>
            </Typography>
          </Link>
          <Link key={index} href={linkUrl} {...parseLinks.linkProps}>
            <Typography {...props} component={"span"}>
              {linkText}
            </Typography>
          </Link>
        </>
      );

      // Update the last index to ensure we don't repeat parts of the string
      lastIndex = index + match.length;
      return match;
    });

    // Push any remaining text after the last link
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  };

  // First render the typographies
  const typographies = React.useMemo(() => {
    if (Array.isArray(children)) {
      return children.map((child, index) => (
        <Typography key={index} {...props}>
          {child}
        </Typography>
      ));
    } else {
      return [<Typography {...props}>{children}</Typography>];
    }
  }, [children, props]);

  // Then we parse the links by iterating through the typographies
  const parsedTypographies = React.useMemo(() => {
    let output = typographies;
    if (parseLinks.parseLinks) {
      output = typographies.map((typography, index) => {
        const text = typography.props.children as string;
        const parts = extractLinks(text);
        return (
          <Typography key={index} {...typography.props}>
            {parts}
          </Typography>
        );
      });
    }
    return output;
  }, [typographies, parseLinks]);

  return <>{parsedTypographies}</>;
};
