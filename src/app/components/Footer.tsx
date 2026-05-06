import { Computer, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#f4f4f0] border-t-4 border-black mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* 📦 Brand Box */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="bg-yellow-300 border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2">
              <span className="font-black uppercase tracking-tighter text-xl">
                DevVault
              </span>
            </div>
            <p className="font-bold text-sm text-black flex items-center gap-1">
              © 2024. BUILT WITH
              <span className="bg-[#ff90e8] px-1 border border-black text-xs">
                NEXT.JS 14
              </span>
              AND <Heart className="w-4 h-4 fill-red-500 text-red-500 inline" />
            </p>
          </div>

          {/* 🔗 Links Strip */}
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: "About", href: "#" },
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="bg-white border-2 border-black px-4 py-2 font-black uppercase text-xs hover:bg-black hover:text-white hover:translate-y-[-2px] transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* 🐙 Social/GitHub */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/LALIT666/DevVault"
              className="p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
            >
              <Computer className="w-6 h-6 group-hover:text-[#ff90e8]" />
            </a>
            <div className="hidden lg:block">
              <div className="bg-white border-2 border-black p-2 text-[10px] font-black uppercase">
                Status: <span className="text-green-600">All Systems Go</span>
              </div>
            </div>
          </div>
        </div>

        {/* 🖊️ Bottom Tagline */}
        <div className="mt-12 text-center border-t-2 border-black pt-6">
          <span className="font-black italic text-gray-500 uppercase text-xs tracking-[0.2em]">
            Keep building, keep vaulting.
          </span>
        </div>
      </div>
    </footer>
  );
}
