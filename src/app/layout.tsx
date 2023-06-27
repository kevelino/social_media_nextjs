import './globals.css';
import SessionProviderContext from '@/contexts/SessionProviderContext';
import { Poppins } from 'next/font/google';
import { BasicDialogsContextProvider } from '@/contexts/BasicDialogsContext';
import { ToastContextProvider } from '@/contexts/ToastContext';
import { VisualMediaModalContextProvider } from '@/contexts/VisualMediaModalContext';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BottomMenu from '../components/BottomMenu';
import 'swiper/css';
import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
  onboarding,
}: {
  children: React.ReactNode;
  onboarding: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
      <body className={poppins.className}>
        <ToastContextProvider>
          <SessionProviderContext>
            <BasicDialogsContextProvider>
              <VisualMediaModalContextProvider>
                <div className="h-screen flex flex-col bg-violet-100">
                  {session ? (
                    <>
                      <Navbar />
                      <Sidebar />
                      <BottomMenu />
                      <div className="transition-[margin] duration-500 overflow-y-auto ml-0 md:ml-[240px]">
                        <div className="flex justify-center">
                          <div className="w-full h-full lg:w-[650px] xl:w-[800px] transition-all duration-500 md:px-4 md:pt-8 mb-10">
                            {children}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    onboarding
                  )}
                </div>
              </VisualMediaModalContextProvider>
            </BasicDialogsContextProvider>
          </SessionProviderContext>
        </ToastContextProvider>
      </body>
    </html>
  );
}
