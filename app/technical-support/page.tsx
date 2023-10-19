import ContactButton from "@/ui/Buttons/ContactButton/ContactButton";
import HomeCTA from "@/ui/Sections/CTA/HomeCTA";
import { getSiteImage } from "@/utils/use-server";
import Image from "next/image";

export const dynamic = "force-static";

async function page() {
  //HEADINGS

  // HEADINGS
  // HEADINGS
  const techSupportH = `Technical Support: `;
  const debuggingCodeReviewH = `Debugging and Code Review`;
  const systemAdminH = `System Administration`;
  const systemIntegrationH = `System Integration`;
  const troubleshootingSupportH = `Troubleshooting Support`;
  const techTrainingH = `Technical Training`;

  // SUBHEADINGS
  const techSupportSub = `Empowering Businesses for Success`;
  const debuggingCodeReviewSub = `Enhancing Code Quality and Performance`;
  const systemAdminSub = `Efficient System Management and Maintenance`;
  const systemIntegrationSub = `Seamless Integration of Complex Systems`;
  const troubleshootingSupportSub = `Rapid Resolution of Technical Issues`;
  const techTrainingSub = `Building Technical Proficiency and Expertise`;

  // PARAGRAPHS
  const techSupportP = `At CRIB, we are dedicated to empowering businesses for success. Unlock your full potential with our transformative multichannel services and innovative technology. Enhance customer experiences, drive revenue growth, and achieve sustainable success with our seamless solutions.`;

  const debuggingCodeReviewP = `Code quality and performance are critical to your software's success. Our experts specialize in debugging and code review for Javascript, Typescript, React, and Solidity. We ensure your code is efficient, secure, and error-free.`;

  const systemAdminP = `Efficient system administration is the backbone of a stable IT environment. Our team excels at managing and maintaining your systems, ensuring they run smoothly and securely, so you can focus on core business activities.`;

  const systemIntegrationP = `Complex systems often require seamless integration. Our specialists have a proven track record of integrating various systems, allowing them to work together harmoniously to meet your specific business needs.`;

  const troubleshootingSupportP = `Technical issues can disrupt operations. With our troubleshooting support, you can count on rapid problem resolution. We're here to get your systems back on track, minimizing downtime and maximizing productivity.`;

  const techTrainingP = `Building technical proficiency and expertise is essential. We offer comprehensive technical training programs that equip your team with the knowledge and skills they need to excel in today's tech-driven landscape.`;

  const whyUs = `Why Choose Us
  At CRIB, we are committed to excellence in every aspect of web design. Here's why you should choose us:
  Experience: With years of industry experience, we've honed our skills to perfection.
  Dedicated Team: Our passionate team of designers, developers, and support staff are always ready to assist you.
  Client-Centric Approach: Your success is our priority. We listen to your needs and tailor solutions accordingly.
  Cutting-Edge Technology: We stay ahead of the curve with the latest design trends and technologies.
  Results-Driven: Our focus is on delivering websites and applications that drive real results for your business.`;

  //IMAGES
  const introImage = getSiteImage(`/tech-support.png`)!;
  const techTrainingImage = getSiteImage(`/tech-training.png`)!;
  const troubleShootingImage = getSiteImage(`/trouble-shooting.png`)!;
  const systemAdminImage = getSiteImage(`/system-admin.png`)!;
  const debuggingCodeReviewImage = getSiteImage(`/debugging.png`)!;

  return (
    <div className="w-full mt-12">
      <section className="bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8  lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-semibold tracking-tight leading-none md:text-5xl xl:text-6xl text-black dark:text-white font-owners">
              {techSupportH}{" "}
            </h1>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {techSupportSub}
            </p>
            <p className="font-light text-zinc-500 sm:text-lg dark:text-zinc-400 mb-4">
              {techSupportP}
            </p>
            <ContactButton />
          </div>
          <div className="mx-auto object-cover max-w-lg w-full relative order-first lg:order-last col-span-5">
            <Image
              width={400}
              height={325}
              src={introImage}
              alt="mockup"
              className="mt-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-black  border-b border-zinc-300 dark:border-zinc-800">
        <div className="gap-16 flex flex-col items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light  text-zinc-500 sm:text-lg dark:text-zinc-400 order-last lg:order-first">
            <h2 className="mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners">
              {techTrainingH}
            </h2>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {techTrainingSub}
            </p>

            <p className="mb-4">{techTrainingP}</p>
            <ContactButton />
          </div>
          <div className="mx-auto object-cover max-w-lg w-full relative order-first lg:order-last">
            <Image
              width={400}
              height={325}
              src={techTrainingImage}
              alt="mockup"
              className="mt-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
        </div>
      </section>
      <section className="bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="object-cover max-w-lg w-full relative mx-auto">
            <Image
              width={400}
              height={325}
              src={troubleShootingImage}
              alt="mockup"
              className="my-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
          <div className="font-light text-zinc-500 sm:text-lg dark:text-zinc-400">
            <h2 className="mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners">
              {troubleshootingSupportH}
            </h2>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {troubleshootingSupportSub}
            </p>

            <p className="mb-4">{troubleshootingSupportP}</p>
            <ContactButton />
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-black  border-b border-zinc-300 dark:border-zinc-800">
        <div className="gap-16 flex flex-col items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light  text-zinc-500 sm:text-lg dark:text-zinc-400 order-last lg:order-first">
            <h2 className="mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners">
              {systemAdminH}
            </h2>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {systemAdminSub}
            </p>

            <p className="mb-4">{systemAdminP}</p>
            <ContactButton />
          </div>
          <div className="mx-auto object-cover max-w-lg w-full relative order-first lg:order-last">
            <Image
              width={400}
              height={325}
              src={systemAdminImage}
              alt="mockup"
              className="mt-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
        </div>
      </section>
      <section
        id="about"
        className="bg-zinc-100 dark:bg-zinc-950 w-full border-b border-zinc-300 dark:border-zinc-800"
      >
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="object-cover max-w-lg w-full relative mx-auto">
            <Image
              width={400}
              height={325}
              src={debuggingCodeReviewImage}
              alt="mockup"
              className="my-8 rounded-2xl object-cover w-max h-max"
            />
          </div>
          <div className="font-light text-zinc-500 sm:text-lg dark:text-zinc-400">
            <h2 className="mb-4 text-4xl tracking-tight font-semibold text-zinc-900 dark:text-white  font-owners">
              {debuggingCodeReviewH}
            </h2>
            <p className="max-w-2xl mb-6 font-light text-zinc-600 lg:mb-8 md:text-lg lg:text-xl dark:text-zinc-300 italic">
              {debuggingCodeReviewSub}
            </p>

            <p className="mb-4">z{debuggingCodeReviewP}</p>
            <ContactButton />
          </div>
        </div>
        <HomeCTA />
      </section>
    </div>
  );
}

export default page;
