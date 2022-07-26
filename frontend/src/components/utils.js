import React from "react";
import {ScopedCssBaseline, ThemeProvider} from "@mui/material";
import {theme} from "./dashboard/themes/theme1";
import {createRoot } from "react-dom/client";

const CONTAINER_PROP_IDENTIFIER = "data-prop-";

export const getContainerProps = (
  attributes,
  identifier = CONTAINER_PROP_IDENTIFIER
) => {
  if (!attributes) return {};

  const prepareValue = (value) =>
    !isNaN(value) ? Number(value) : value;

  const containerProps = {};
  for (let attribute of attributes) {
    const {name, value} = attribute;
    if (name.startsWith(identifier)) {
      let key = name.replace(identifier, "");
      containerProps[toCamelCase(key)] = prepareValue(value);
    }
  }
  return containerProps;
};

export const toCamelCase = (s) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace("-", "")
      .replace("_", "");
  });
};

// render React component into entry point
export const renderRoot = (Component, rootId) => {
  const container = document.getElementById(rootId);
  if (container) {
    const root = createRoot(container);
    root.render(
        <ThemeProvider theme={theme}>
          <ScopedCssBaseline>
            <Component {...getContainerProps(container.attributes)} />
          </ScopedCssBaseline>
        </ThemeProvider>
    );
  }
};