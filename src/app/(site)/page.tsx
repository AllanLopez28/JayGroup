// import { AmenitySpotlight } from "@/components/sections/AmenitySpotlight";
// import { Approach } from "@/components/sections/Approach";
// import { Directory } from "@/components/sections/Directory";
// import { FindHome } from "@/components/sections/FindHome";
import { Hero } from "@/components/sections/Hero";
// import { InDevelopment } from "@/components/sections/InDevelopment";
// import { Locations } from "@/components/sections/Locations";
import { Portfolio } from "@/components/sections/Portfolio";
import { Residents } from "@/components/sections/Residents";
// import { Retail } from "@/components/sections/Retail";
import { Story } from "@/components/sections/Story";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Portfolio />
      {/* <Approach /> */}
      {/* <InDevelopment /> */}
      {/* <Directory /> */}
      {/* <FindHome /> */}
      {/* <AmenitySpotlight /> */}
      {/* <Retail /> */}
      {/* <Locations /> */}
      <Residents />
    </>
  );
}
