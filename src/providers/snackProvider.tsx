"use client";
import { SnackbarUtilsConfigurator } from "@/utils/snack";
import { SnackbarProvider } from "notistack";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SnackProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider>
      <SnackbarUtilsConfigurator />
      {children}
    </SnackbarProvider>
  );
};

export default SnackProvider;
