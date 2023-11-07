'use client'
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import faqs from '../../../lib/site/musicFaqs';
function FAQ() {
    const [activeIndex, setActiveIndex] = useState(-1);

      return (
        <div id='faq' className="py-16 p-4 select-none">
            <h2 className="mb-4 text-4xl tracking-tight font-medium font-owners text-zinc-900 dark:text-white">FAQs.</h2>

          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full flex items-center justify-between p-2.5 bg-zinc-100 dark:bg-zinc-950 text-black dark:text-white rounded hover:bg-zinc-50 dark:hover:bg-zinc-900 focus:outline-none border border-zinc-200 dark:border-zinc-800"
                onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
              >
                <span className=' font-work-sans text-sm'>{faq.question}</span>
                <FaChevronDown/>
              </button>
              {index === activeIndex && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-b mx-2 font-work-sans text-sm">
                  <p>{faq.answer}</p>{faq?.href && <Link className='underline cursor-pointer' href={faq.href}>{faq.linkText}</Link>}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    };
    
    export default FAQ