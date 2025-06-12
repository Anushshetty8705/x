import SignPage from './SignPage';
export const metadata = {
  title: "Xtrack-SigningPage",
  description: "tarck your expense",
icons: {
    icon: [
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
  },
};
export default function SigningPage() {
  return <SignPage />;
}
