import { PhoneCall, CalendarDays, PlusSquare } from "lucide-react";

export default function ServiceSteps() {
  return (
    <section className="bg-[#516EFF] py-16 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 px-4 md:px-8">

        <div className="text-white text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold">How to get our service?</h2>
          <p className="mt-3 text-base md:text-lg">Just follow these simple steps</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6">

          <div className="bg-white rounded-2xl w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center">
            <PhoneCall size={28} />
            <p className="text-center mt-3 md:mt-4 text-sm md:text-base">
              Call for
              <br />
              appointment
            </p>
          </div>

          <div className="bg-white rounded-2xl w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center">
            <CalendarDays size={28} />
            <p className="text-center mt-3 md:mt-4 text-sm md:text-base">
              Get a
              <br />
              Date & Serial
            </p>
          </div>

          <div className="bg-white rounded-2xl w-32 h-32 md:w-40 md:h-40 flex flex-col items-center justify-center">
            <PlusSquare size={28} />
            <p className="text-center mt-3 md:mt-4 text-sm md:text-base">
              Consult
              <br />
              Your dentist
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}