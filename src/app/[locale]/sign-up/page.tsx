import SignUp from "@/modules/SignUp";

type Props = {
  params: {
    locale: string;
  }
}

export default function SignUpPage({ params: { locale } }: Props) {
  return (
    <>
      <SignUp locale={locale} />
    </>
  );
}