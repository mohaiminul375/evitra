import Banner from "@/components/Home/Banner";
import HighLight from "@/components/Home/HighLight";
import LatestEvents from "@/components/Home/LatestEvents";


export const metadata = {
  title: "Home | Evitra",
}
export default function Home() {
  return (
    <section className="space-y-24">
      <Banner />
      <HighLight />
      <LatestEvents />
    </section>
  );
}
