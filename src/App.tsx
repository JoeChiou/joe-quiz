import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PageHome } from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

const theme = createTheme({
  palette: {
  },
  typography: {
    h5: { fontWeight: 'bold' },
    h6: { fontWeight: 'bold' },
    fontFamily: ['Roboto', 'Arial', 'sans-serif'].join(','),
  },
  components: {
    MuiList: {
      variants: [
        {
          props: { disablePadding: true },
          style: {},
        }
      ],
    },
    MuiListItem: {
      variants: [
        {
          props: { disableGutters: true },
          style: {},
        }
      ],
      styleOverrides: {
        root: { justifyContent: 'space-between' }
      }
    }
  }
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <PageHome />
    </ThemeProvider>
  </QueryClientProvider >
);
