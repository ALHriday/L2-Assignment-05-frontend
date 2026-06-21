import AboutMediStore from "@/lib/components/aboutMediStore/AboutMediStore";
import Medicines from "@/lib/components/medicines/medicines";
import WhyChooseUs from "@/lib/components/whyChooseUs/WhyChooseUs";

export default function Home() {

  return (
    <div>
      <main>
        <Medicines />
        <section className="my-8 px-4 py-10 flex flex-col gap-2 justify-center items-center rounded-md text-center m-4 border transition-all ease-in bg-slate-50">
          <h1 className="text-3xl md:text-4xl font-bold bg-[rgba(255,255,255,0.49)] rounded-md px-4 py-2"><span>💁‍♂️</span>Stay Informed. <span>🥰</span> Stay Healthy.</h1>
          <p className="text-md md:text-xl text-gray-600 py-1 px-2 rounded-md">Discover practical health tips, medicine guides, and wellness advice to help you make better decisions every day.</p>
        </section>
        <WhyChooseUs />
        <div className="mt-4">
          <AboutMediStore />
        </div>
      </main>
    </div>
  );
}
