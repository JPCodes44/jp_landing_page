import Frame1 from "./components/Frame1";
import Frame2 from "./components/Frame2";
import Frame3 from "./components/Frame3";
import Frame4 from "./components/Frame4";

const App = () => {
  return (
    <div className="bg-bg-warm">
      <main>
        <nav
          className="sticky top-0 z-50 flex items-center justify-between h-[4.5rem] px-[3.75rem]"
          style={{
            backdropFilter: "blur(8px) saturate(1.58)",
            WebkitBackdropFilter: "blur(8px) saturate(1.58)",
            background: "transparent",
            boxShadow: "0 2px 2px rgba(0,0,0,0.06)",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <span className="font-fanwood text-[1.375rem] text-text-primary">Justin Mak.</span>
          <ul className="flex gap-10 list-none m-0 p-0">
            <li>
              <a
                href="#services"
                className="font-fanwood text-[1.3rem] font-normal text-text-primary no-underline hover:opacity-70"
              >
                services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="font-fanwood text-[1.3rem] font-normal text-text-primary no-underline hover:opacity-70"
              >
                contact
              </a>
            </li>
            <li>
              <a
                href="#experience"
                className="font-fanwood text-[1.3rem] font-normal text-text-primary no-underline hover:opacity-70"
              >
                experience
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="font-fanwood text-[1.3rem] font-normal text-text-primary no-underline hover:opacity-70"
              >
                about
              </a>
            </li>
          </ul>
        </nav>
        <Frame1 />
        <Frame2 />
        <Frame3 />
      </main>
    </div>
  );
};

export default App;
