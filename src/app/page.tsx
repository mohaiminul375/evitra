import Banner from "@/components/Home/Banner";
import HighLight from "@/components/Home/HighLight";
import LatestEvents from "@/components/Home/LatestEvents";


export default function Home() {
  return (
    <section className="space-y-24">
      <Banner />
      <HighLight />
      <LatestEvents />
    </section>
  );
}
