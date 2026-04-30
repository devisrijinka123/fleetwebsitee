import { Footer } from "@/components/Footer";
import Image from "next/image";
import { Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#F2F0FF] min-h-screen text-[#00031F]">
      <main className="pt-48 pb-32 px-6 max-w-5xl mx-auto text-center flex flex-col items-center gap-16">
        <div className="flex items-center gap-2">
          <div className="relative w-18 h-18">
            <Image
              src="/logo.jpeg"
              alt="Ravity Logo"
              fill
              className="object-contain mix-blend-multiply"
            />
          </div>
        </div>

        <div className="space-y-10 max-w-4xl">
          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            Software should accelerate what people can do, not add complexity to their day.
          </p>

          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            Fleet management software, however, has lost its way. Instead of empowering operators, most platforms overwhelm them with dashboards and raw data while offering little real support for the decisions that matter.
          </p>

          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            These tools are ineffective and outdated. Fleet software should automate, accelerate, and optimize operations so teams can focus on what matters most.
          </p>

          <p className="text-xl md:text-2xl font-medium leading-relaxed">
            Ravity Fleet restores this vision. It is the first platform designed to truly automate fleet management, created by engineers and operators with experience at the world&apos;s largest automotive companies.
          </p>
        </div>

        {/* Trust Signals */}
        <div className="w-full pt-16 border-t border-black/10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight text-[#00031F] text-center">
            Backed by Global Giants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <div className="bg-[#FFFFFF] p-10 flex flex-col items-center text-center shadow-sm ring-1 ring-black/6">
              <div className="h-20 flex items-center justify-center mb-6">
                <div className="relative w-32 h-16">
                  <Image src="/maruti.svg" alt="Maruti Suzuki" fill className="object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#00031F] mb-2">Backed by Maruti Suzuki</h3>
                <p className="text-[#00031F]/80 font-medium text-sm">
                  Strategic investment from India&apos;s largest automotive manufacturer.
                </p>
              </div>
            </div>
            <div className="bg-[#FFFFFF] p-10 flex flex-col items-center text-center shadow-sm ring-1 ring-black/6">
              <div className="h-20 flex items-center justify-center mb-6">
                <div className="relative w-40 h-12">
                  <Image src="/nasscom-emerge50.svg" alt="Nasscom Emerge 50" fill className="object-contain" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#00031F] mb-2">Nasscom Emerge 50 Winner</h3>
                <p className="text-[#00031F]/80 font-medium text-sm">
                  Recognized among India&apos;s top 50 emerging technology companies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Part of Ravity */}
        {/* <div className="text-center">
          <a
            href="https://ravity.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-[#00031F]/65 hover:text-[#F0197A] transition-colors uppercase tracking-widest"
          >
            Part of Ravity &rarr; ravity.io
          </a>
        </div> */}

        {/* News Section */}
        <div id="news" className="w-full pt-24 border-t border-black/10 scroll-mt-24">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-12 tracking-tight text-[#00031F] text-center">
            News
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
            {[
              {
                source: "MARUTI SUZUKI",
                title: "Maruti Suzuki Invests in Connected Mobility Intelligence based Startup",
                date: "Nov 21, 2025",
                url: "https://www.marutisuzuki.com/corporate/media/press-releases/2025/november/maruti-suzuki-invests-in-connected-mobility-intelligence-based-startup?srsltid=AfmBOoqdCbyBoRncgW8YGbbbQBbfes7wnFwlZL34vSDE4UhMcYUph2So"
              },
              {
                source: "NASSCOM",
                title: "Ravity Software Solutions recognized as a NASSCOM Emerge 50 Winner",
                date: "2025",
                url: "https://nasscom.in/emerge50-2025/winner/ravity-software-solutions.html"
              },
              {
                source: "SILICONINDIA",
                title: "Ravity recognized as a Top SDV Tech by SiliconIndia",
                date: "2025",
                url: "https://www.linkedin.com/posts/vikas-rungta-6351093_ravity-recognized-as-a-top-sdv-tech-by-siliconindia-activity-7399389820327862272-LrVm?utm_source=share&utm_medium=member_desktop&rcm=ACoAADJzCCEBxY2BFouPKdT04Jy1K2w16b9I0_Y"
              },
              {
                source: "LINKEDIN",
                title: "Ravity at Bharat Mobility Expo 2025: Future-Driven Mobility",
                date: "Jan 2025",
                url: "https://www.linkedin.com/posts/vikas-rungta-6351093_bharatmobility2025-futuredrivenmobility-connectedvehicles-activity-7289212838458318849-Big5?utm_source=share&utm_medium=member_desktop&rcm=ACoAADJzCCEBxY2BFouPKdT04Jy1K2w16b9I0_Y"
              }
            ].map((news, i) => (
              <a
                key={i}
                href={news.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[#FFFFFF] p-8 flex flex-col gap-8 hover:bg-white transition-all shadow-sm ring-1 ring-black/6"
              >
                <div className="text-[12px] font-black text-[#00031F] uppercase tracking-[0.1em] leading-tight">
                  {news.source.split(' ').map((word, j) => (
                    <div key={j}>{word}</div>
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-[#F0197A] transition-colors">
                  {news.title}
                </h3>
                <div className="mt-auto text-sm text-[#00031F]/65 font-bold uppercase tracking-widest">
                  {news.date}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Careers Section (Simplified) */}
        <div id="careers" className="w-full pt-24 border-t border-black/10 scroll-mt-24">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight text-[#00031F] text-center">
            Careers
          </h2>

          <div className="bg-[#FFFFFF] p-10 md:p-16 text-center space-y-6 shadow-sm ring-1 ring-black/6">
            <p className="text-xl md:text-2xl font-medium text-[#00031F]/85 leading-relaxed">
              We are always looking to work with the most exceptional people. Reach out if you are excited by the future of fleet sage.
            </p>
            <a
              href="mailto:careers@ravity.io"
              className="inline-flex items-center gap-2 bg-[#F0197A] text-white px-8 py-4 rounded-lg font-bold text-base hover:bg-[#C0106A] transition-all shadow-[0_4px_20px_rgba(240,25,122,0.3)]"
            >
              Get in touch <Mail size={20} />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
