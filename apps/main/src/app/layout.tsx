import { NavBar } from '@katie-portofolio/navigation';
import './global.css';

export const metadata = {
  title: 'Kathleen Miller',
  description:
    'Portfolio of Kathleen Miller — science, nature-based solutions, projects, and publications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="min-h-full bg-stone-100 dark:bg-slate-800"
      >
        <NavBar />
        {children}
      </body>
    </html>
  );
}
