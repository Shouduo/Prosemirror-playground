import React from "react";
import { ChakraProvider, CSSReset, Box } from "@chakra-ui/core";
// 多语言配置
import nottaTheme from "@/assets/theme";
import GlobalCSS from "@/assets/theme/Global";
import "@/assets/style/index.less";
import AgendaAndTask from "@/components/AgendaAndTask";

export const rootContainer = () => (
  <ChakraProvider theme={nottaTheme}>
    <CSSReset />
    <GlobalCSS theme={nottaTheme} />
    <Box style={{ backgroundColor: "#eee", padding: "32px", height: "100vh" }}>
      <AgendaAndTask />
    </Box>
  </ChakraProvider>
);
