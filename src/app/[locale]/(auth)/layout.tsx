import { Box, Container } from "@mui/material";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container component='main' maxWidth='xs'>
      {children}
    </Container>
  );
}