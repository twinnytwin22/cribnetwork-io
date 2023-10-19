import React from "react";
import Pricing from "@/ui/Sections/Subscriptions/Pricing";
import {
  getActiveProductsWithPrices,
  getSession,
  getSubscription,
} from "@/lib/providers/supabase/supabase-server";
import CourseCard from "@/ui/Cards/CourseCard";
import {
  getAllCourses,
  getCoursesPageSettings,
  getSiteSettings,
} from "@/lib/providers/sanity/sanity";
import CoursesHeader from "@/ui/Headers/CoursesHeader";
import SearchBar from "@/ui/Components/SearchBar";

export const revalidate = 60;

//export const dynamic = 'force-dynamic'
async function Learning() {
  const [products, subscription, courses, settings] = await Promise.all([
    getActiveProductsWithPrices(),
    getSubscription(),
    getAllCourses(),
    getCoursesPageSettings(),
  ]);

  if (!subscription && products) {
    return (
      <section className="w-full h-full mx-auto relative max-w-screen">
        <div className="relative flex place-items-center min-h-full mx-auto w-full">
          <Pricing products={products} subscription={subscription} />
        </div>
      </section>
    );
  }
  return (
    settings &&
    courses &&
    courses && (
      <section className="w-full h-full mx-auto relative max-w-screen -mt-16">
        <CoursesHeader settings={settings} />
        <div className="mx-10 mt-8">
          <SearchBar />
        </div>
        <div className="relative my-8 min-h-full mx-auto w-full">
          <div className="flex flex-wrap w-full gap-4 mx-10">
            {courses?.map((course: any) => (
              <div className="w-72 md:w-80" key={course._id}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
}

export default Learning;
