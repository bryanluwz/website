import React from "react";
import {
  Typography,
  TypographyProps,
  Link,
  LinkProps,
  Icon,
  Box,
} from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

interface CustomTypographyProps extends TypographyProps {
  children: any;
  parseLinks?: {
    parseLinks?: boolean;
    addLinkIcon?: boolean;
    linkProps?: LinkProps;
    newPage?: boolean;
  };
}

export const CustomTypography: React.FC<CustomTypographyProps> = ({
  children,
  parseLinks = {},
  ...props
}) => {
  const [parseLinksState, setParseLinksState] = React.useState(parseLinks);
  const defaultParseLinks = {
    parseLinks: true,
    addLinkIcon: true,
    linkProps: {},
    newPage: true,
  };

  React.useEffect(() => {
    setParseLinksState((prevState) => ({
      ...defaultParseLinks,
      ...prevState,
      ...parseLinks,
    }));
  }, []);

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
        <Box key={`link-box-${index}`} sx={{ display: "inline-block" }}>
          <Link
            {...parseLinksState.linkProps}
            href={linkUrl}
            sx={{
              "&::after": {
                display: "none",
              },
              paddingRight: "var(--margin-xxs)",
            }}
            target={parseLinksState.newPage ? "_blank" : undefined}
            rel={parseLinksState.newPage ? "noopener noreferrer" : undefined}
          >
            <Typography
              {...props}
              component={"span"}
              style={{
                verticalAlign: "middle",
              }}
            >
              <Icon>
                <LinkIcon />
              </Icon>
            </Typography>
          </Link>
          <Link
            href={linkUrl}
            {...parseLinksState.linkProps}
            target={parseLinksState.newPage ? "_blank" : undefined}
            rel={parseLinksState.newPage ? "noopener noreferrer" : undefined}
          >
            <Typography {...props} component={"span"}>
              {linkText}
            </Typography>
          </Link>
        </Box>
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
        <Typography key={`typographies-${index}-${Math.random()}`} {...props}>
          {child}
        </Typography>
      ));
    } else {
      return [
        <Typography key={`typographies-${Math.random()}`} {...props}>
          {children}
        </Typography>,
      ];
    }
  }, [children, props]);

  // Then we parse the links by iterating through the typographies
  const parsedTypographies = React.useMemo(() => {
    let output = typographies;
    if (parseLinksState.parseLinks) {
      output = typographies.map((typography, index) => {
        const text = typography.props.children as string;
        const parts = extractLinks(text);
        return (
          <Typography
            key={`parsed-typographies-${index}-${Math.random()}`}
            {...typography.props}
          >
            {parts}
          </Typography>
        );
      });
    }
    return output;
  }, [typographies, parseLinksState]);

  // The Math.random() is to make sure there is no key collision (stupid warning)
  return <>{parsedTypographies}</>;
};
