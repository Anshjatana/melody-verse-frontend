import About from "./components/About";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Navbar />
      <Toaster position="top-right" toastOptions={{duration:2000}} />
      <About/>
    </>
  );
}
