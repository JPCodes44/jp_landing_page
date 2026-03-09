import bellImg from "../../styles/assets/2d/visuals/bell.png";
import calendarImg from "../../styles/assets/2d/visuals/calendar.png";
import sliderImg from "../../styles/assets/2d/visuals/slider.png";
import tasksImg from "../../styles/assets/2d/visuals/tasks.png";
import temperatureImg from "../../styles/assets/2d/visuals/temperature.png";
import workflowImg from "../../styles/assets/2d/visuals/workflow.png";

const icons = [
  { src: sliderImg, alt: "slider" },
  { src: temperatureImg, alt: "temperature" },
  { src: workflowImg, alt: "workflow" },
  { src: bellImg, alt: "bell" },
  { src: calendarImg, alt: "calendar" },
  { src: tasksImg, alt: "tasks" },
];

const Frame2 = () => {
  return (
    <section className="w-full bg-bg-warm py-[6rem] px-[3.75rem]">
      <div className="flex gap-[4rem] items-start">
        <div className="flex-[55%] min-w-0">
          <h2 className="font-fanwood text-[5.375rem] font-normal leading-[1.1] text-text-primary m-0">
            What I do:
          </h2>
          <p className="font-satoshi text-[1.1875rem] font-normal leading-[1.6] text-text-primary max-w-[38.75rem] mt-[3rem] mb-0">
            I specialize in creating &ldquo;
            <span className="text-accent-green">agentic</span>&rdquo; workflows. That means your
            business doesn&rsquo;t just have tools; it has autonomous systems that handle lead gen,
            reporting, and customer care without you lifting a finger.
          </p>
        </div>
        <div className="flex-[45%] min-w-0 grid grid-cols-2 gap-[2rem]">
          {icons.map((icon) => (
            <img key={icon.alt} src={icon.src} alt={icon.alt} className="w-full h-auto" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Frame2;
