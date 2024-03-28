import Login from "@/modules/Login";


export const metadata = {
 title: 'Login - MemoShop',
 description: 'Login - MemoShop App Login Page',
};

type Props = {
  params: {
    locale: string;
  }
}

export default function LoginPage({ params: { locale } }: Props) {
  return <Login locale={locale} /> 
}