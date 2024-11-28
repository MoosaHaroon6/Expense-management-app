'use client';
import { useUser } from "@clerk/nextjs";
import Footer from "./(routes)/_components/Footer"
import Header from "./(routes)/_components/header"
import Hero from "./(routes)/_components/Hero"
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser(); // user context (clerk)
  const route = useRouter();  // route changer hook

  if (user) {  // validation
    route.push('/dashboard');
  }

  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  )
}