import Image from "next/image";
import bgSign from '@/public/bg-login.jpg'
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
      <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col dark:bg-gray-900 sm:p-0">
<div className="fixed bottom-6 start-6 z-50 hidden sm:block">
          <ThemeTogglerTwo/>
  
</div>        {children}
        <div className="lg:w-1/2 w-full h-full lg:grid items-center hidden relative">

          <Image
            src={bgSign}
            alt="Background"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-blue-500/30"></div>

       <div className="relative z-10 flex flex-col items-center max-w-xs mx-auto">
  <h3 className="text-white text-[80px] sm:text-[100px] md:text-[120px] font-extrabold tracking-wider drop-shadow-lg">
    POS
  </h3>
  <p className="text-white/80 text-lg sm:text-xl mt-2 font-medium">
    Point of Sale System
  </p>
</div>

        </div>
      </div>
    </div>
  );
}
