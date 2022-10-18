import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useEffect, useMemo } from "react";
import { getQuestions } from '../../../services';

export const PageHome = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery(['todos'], getQuestions)
  
  return (
    <p>Home</p>
  )
}