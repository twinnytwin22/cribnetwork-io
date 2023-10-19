import BuildGrantForm from "@/ui/Forms/BuildGrantForm";
import { getSiteImage } from "@/utils/use-server";
import Image from "next/image";
import { FaBullseye } from "react-icons/fa6";

export const dynamic = "force-dynamic";

function page() {
  const image = getSiteImage("/all-hands.jpg");
  const buildImage = getSiteImage("/build-illustration.png");
  const grantReqs = [
    "Small business (less 1 million in yearly revenue).",
    "Already own your domain name or have plans to get one soon.",
    "Lack the resources to develop the website you envision.",
    "Ready to take your branding and business to the next level.",
  ];
  const disclaimer = [
    `Small Business Build Grant, aimed at empowering and supporting small businesses in their online presence and digital marketing efforts. This non-monetary grant is designed to provide small businesses with the valuable resource of professional web design and development services.`,
    ` We believe that a strong online presence is essential for the success of any small business in today's digital age, and we are committed to helping businesses thrive in the online marketplace.`,
  ];

  const aboutYou = `You embody the essence of a dedicated small business owner, brimming with passion and determination. You possess a clear understanding of your identity, your audience, and the meaningful impact you make on the world. You are primed to achieve your next significant objective and are fully aware of how to leverage this grant to make it happen.`;
  const grantDetails = [
    {
      pre: "Grant Recipients:",
      text: "CRIB Network will select one deserving small business to receive this grant on a quarterly basis.",
    },
    {
      pre: "Grant Type:",
      text: "Non-monetary. Instead of providing financial support, we will allocate a specific amount of time dedicated to free web design services.",
    },
    {
      pre: "Services Covered:",
      text: "The grant includes a wide range of web services, including but not limited to:",
      subtext: [
        "Creation of a new website from scratch.",
        "Website makeovers and redesigns to enhance aesthetics and functionality.",
        "Ongoing updates, maintenance, and security enhancements.",
        "Adding new features and functionalities to existing websites.",
      ],
    },
    {
      pre: "Duration:",
      text: "The grant will provide a specified number of hours for web services, tailored to the unique needs and goals of the selected small business.",
    },
    {
      pre: "Quarterly Selection:",
      text: "CRIB Network will evaluate and choose one small business to receive the grant every quarter, ensuring a fair and equal opportunity for all applicants.",
    },
  ];

  return (
    image && (
      <div className="min-h-[80vh] text-black dark:text-white mt-12 bg-white dark:bg-black relative overflow-x-hidden">
        <section className="rounded-b-[100%] ml-[-50%]  relative min-h-[300px] overflow-hidden flex place-items-center w-[200%] bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <Image
            priority
            src={image}
            alt="Background"
            fill
            quality={75}
            className="z-0  contrast-125 brightness-125 object-cover transform"
            //  style={{ transform: `translateY(${scrollY * 0.5}px)` }}
          />
          <div className="absolute inset-0 bg-black opacity-75 "></div>

          <div className="mx-auto relative z-10">
            <h1 className="text-5xl font-owners font-semibold text-white text-center">
              Small Business Build Grant
            </h1>
          </div>
        </section>
        <section className="px-8">
          <div className="relative right-0 left-0 mx-auto -translate-y-24 max-w-7xl w-full shadow border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 rounded min-h-[300px]">
            <div className="md:grid md:grid-cols-2 gap-8 place-items-center px-8">
              <div className="p-10 object-contain mx-auto ">
                <Image
                  priority
                  width={400}
                  height={325}
                  src={buildImage}
                  alt="mockup"
                  className="rounded-2xl object-cover mx-auto"
                />
              </div>
              <div className="p-8 text-zinc-500 dark:text-zinc-300">
                {disclaimer.map((line) => (
                  <div key={line}>
                    <p>{line}</p>
                    <br />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="-mt-16 relative">
          <div className="relative ">
            <h1 className="text-3xl font-owners font-semibold text-center">
              Grant Details
            </h1>
            <ul className=" text-zinc-500 dark:text-zinc-300 mx-auto max-w-4xl w-full px-8 space-y-6">
              {grantDetails.map((detail) => (
                <div key={detail.pre}>
                  <li className=" mx-auto leading-8">
                    <span className=" font-bold">{detail.pre}&nbsp;</span>
                    {detail.text}
                    {detail.subtext?.map((line) => (
                      <div
                        key={line}
                        className="pl-10 flex space-x-2 items-center"
                      >
                        <FaBullseye />
                        <p>{line}</p>
                      </div>
                    ))}
                  </li>
                </div>
              ))}
            </ul>
          </div>
          <div className="md:grid md:grid-cols-2 max-w-7xl mx-auto ">
            <div className="p-16">
              <h1 className="text-3xl font-owners font-semibold ">
                About you.
              </h1>
              <p className="mb-8 text-zinc-500 dark:text-zinc-300 ">
                {aboutYou}
              </p>
              <ul className="space-y-4 text-left text-zinc-500 dark:text-zinc-300 mx-auto w-full">
                {grantReqs.map((req) => (
                  <li key={req} className="flex items-center space-x-3">
                    <svg
                      className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-16">
              <BuildGrantForm />
            </div>
          </div>
        </section>
      </div>
    )
  );
}

export default page;
