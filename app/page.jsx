import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main
        className="w-full h-full min-h-screen flex items-center justify-center relative p-8"
        id="home-page"
      >
        <div className="absolute top-0 left-0 w-3/5 h-full -z-10">
          <Image
            src={"/img/home-page-banner-img-01.png"}
            alt="Home Page Banner Img 01"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 w-3/5 h-full -z-10">
          <Image
            src={"/img/home-page-banner-img-02.png"}
            alt="Home Page Banner Img 01"
            width={1000}
            height={1000}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex items-center lg:gap-28 gap-10 lg:justify-between justify-center w-full max-w-5xl flex-wrap">
          <div className="text-center">
            <Image
              src={"/img/music-hype-logo.png"}
              alt="Music Hype Logo"
              width={300}
              height={300}
              className="mx-auto"
            />
            <h2 className="text-5xl text-white font-bold mt-3">
              BUY & SELL <br />
              <span className="bg-[#eb6f37] py-1 px-8 block w-fit mx-auto">
                Music
              </span>
            </h2>
            <p className="text-white my-5 italic">
              Search Your Favourite Artist & Music
            </p>
            <Link href={"/music"}>
              <button className="rounded-full bg-transparent text-white py-2 px-7 text-lg border-2 border-white bg-gradient-to-b from-[#EB6F37] to-[#5A1C00] hover:from-transparent hover:to-transparent hover:text-[#eb6f37] hover:border-[#eb6f37] hover:translate-y-[-5px] transition-all">
                Explore Now
              </button>
            </Link>
          </div>
          <div className="text-center">
            <Image
              src={"/img/merchandise-logo.png"}
              alt="Merchandise Logo"
              width={300}
              height={300}
              className="mx-auto"
            />
            <h2 className="text-5xl text-white font-bold mt-3">
              BUY & SELL <br />
              <span className="bg-[#0a92d4] py-1 px-8 block w-fit mx-auto">
                MERCHANDISE
              </span>
            </h2>
            <p className="text-white my-5 italic">
              Create and Purchase the hottest brand
            </p>
            <Link href={"/merchandise"}>
              <button className="rounded-full bg-transparent text-white py-2 px-7 text-lg border-2 border-white bg-gradient-to-b from-[#0A92D4] to-[#012435] hover:from-transparent hover:to-transparent hover:text-[#0a92d4] hover:border-[#0a92d4] hover:translate-y-[-5px] transition-all">
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
