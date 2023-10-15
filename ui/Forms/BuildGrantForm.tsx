'use client'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { toast } from 'react-toastify';
interface FormQuestions {
    question: string | undefined
    response: string | undefined
}


export interface FormProps {
    email: string | undefined
    subject: string | undefined
    message: string | undefined
    first_name: string | undefined
    last_name: string | undefined
    phone_number: string | undefined
    website: string | undefined
    company_name: string | undefined
    linkedin_profile: string | undefined
    form_questions?: FormQuestions[]
    form_type?: string | undefined
}


const min = 1;
const max = 3;
const isInRange = (s: number) => s >= min && s <= max;

function BuildGrantForm() {
    const questions = ['What is your biggest challenge as a small business owner?', 'What is a primary goal you have for your company? List 1-3'];
    const router = useRouter()

    const initialState: FormProps = {
        email: "",
        subject: "",
        message: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        website: '',
        company_name: '',
        linkedin_profile: '',
        form_questions: questions.map((question) => ({
            question: question,
            response: ''
        })),
        form_type: undefined, // You can add the form_type if needed
    };

    const [formData, setFormData] = useState<FormProps>(initialState);
    const [status, setStatus] = useState<string | null>("");
    const [step, setStep] = useState<number | null>(1);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, questionIndex?: number) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData, [name]: value,
            form_questions: prevFormData?.form_questions?.map((question, index) => {
                if (index === questionIndex) {
                    return { ...question, response: value };
                }
                return question;
            }),
        }));
    };



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        if (step === max) {
            e.preventDefault();
            try {
                const updates: FormProps = {
                    ...formData,
                    form_type: 'Build Grant',
                    subject: 'Build Grant'
                }
                const res = await fetch("/api/submissions/general", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updates),
                });
                if (res.ok) {
                    setStatus("success");
                    setStep(null)
                    toast.success("Your message was sent successfully");
                }
                setFormData(initialState);
            } catch (err) {
                setStatus("error");
                console.log("Error sending email. Please try again later.");
            }
        }
    };
    const headers = (index) => [
        {
            GetStarted: 'Get Started',
            TellUsMore: 'Tell Us More About You',
            FinishUp: 'Finish Up',
            Completed: 'All Done'
        }
    ]
    const renderStep1 = () => {
        return (
            <div className=' w-full mx-auto'>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            value={formData?.first_name}
                            onChange={handleChange}
                            type="text" name="first_name" id="first_name" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                        <label htmlFor="first_name" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            value={formData.last_name}
                            onChange={handleChange}
                            type="text" name="last_name" id="last_name" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                        <label htmlFor="last_name" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                    </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        value={formData.email}
                        onChange={handleChange}
                        type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        value={formData.website}
                        onChange={handleChange}
                        type="url" name="website" id="website" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                    <label htmlFor="website" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your website URL</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        value={formData.linkedin_profile}
                        onChange={handleChange}
                        type="url" name="linkedin_profile" id="linkedin_profile" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                    <label htmlFor="linkedin_profile" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">LinkedIn Profile</label>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            value={formData.phone_number}
                            onChange={handleChange}
                            type="tel" name="phone_number" id="phone_number" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                        <label htmlFor="phone_number" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input
                            value={formData.company_name}
                            onChange={handleChange}
                            type="text" name="company_name" id="company_name" className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                        <label htmlFor="company_name" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                    </div>
                </div>
            </div>
        )
    }

    const renderStep2 = () => {
        return (
            <div>
                <p className='mb-8 text-lg text-zinc-500 dark:text-zinc-300'>{formData?.form_questions && formData?.form_questions[0].question}</p>
                <div className="relative z-0 w-full mb-6 group">
                    <textarea
                        value={formData?.form_questions && formData?.form_questions[0].response}
                        onChange={(e) => handleChange(e, 0)}
                        name={`form_questions`}
                        id={`form_questions`}
                        className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                    <label htmlFor="response_1" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Response</label>
                </div>
            </div>
        );
    };

    const renderStep3 = () => {
        return (
            <div>
                <p className='mb-8 text-lg text-zinc-500 dark:text-zinc-300'>{formData?.form_questions && formData?.form_questions[1].question}</p>
                <div className="relative z-0 w-full mb-6 group">
                    <textarea
                        value={formData?.form_questions && formData?.form_questions[1].response}
                        onChange={(e) => handleChange(e, 1)}
                        name={`form_questions`}
                        id={`form_questions`}
                        className="block py-2.5 px-0 w-full text-sm text-zinc-900 bg-transparent border-0 border-b-2 border-zinc-300 appearance-none dark:text-white dark:border-zinc-600 dark:focus:border-red-200 focus:outline-none focus:ring-0 focus:border-red-300 peer" placeholder=" " required />
                    <label htmlFor="response_2" className="peer-focus:font-medium absolute text-sm text-zinc-500 dark:text-zinc-300 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-red-300 peer-focus:dark:text-red-200 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Response</label>
                </div>
            </div>
        );
    };
    return (
        <div>                        
            <h1 className='text-3xl font-owners font-semibold'>{'Get Started'}</h1>
            <form onSubmit={((e: FormEvent<HTMLFormElement>) => handleSubmit(e))} className='w-full mx-auto h-[410px] max-h-full min-h-full relative'>
                <div className='min-h-[315px] max-h-fit'>
                    {step === min && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === max && renderStep3()}
                    {status === 'error' && <div className='text-red-500'>Sorry there was an error</div>}
                    {status === 'success' && !step && <div className='text-green-500'>Success</div>}
                </div>
                {step &&
                    <div className='flex justify-between items-center'>
                        <StepButtons step={step} set={setStep} />
                        {step === max ?
                            <button type='submit' className='text-black bg-red-400 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-300 dark:hover-bg-red-400 dark:focus:ring-red-400'>
                                Submit
                            </button>
                            :
                            <div />
                        }
                    </div>}
            </form>
        </div>
    )
}

export default BuildGrantForm

const StepButtons = ({ step, set }: { step: number, set: (step: number) => void }) => {
    const incrementStep = () => {
        const newStep = step + 1
        if (isInRange(newStep)) {
            set(newStep)
        }
    }
    const decrementStep = () => {
        const prevStep = step - 1
        if (isInRange(prevStep)) {
            set(prevStep)
        }
    }

    return (
        <div className='flex text-black space-x-1'>
            <div
                onClick={decrementStep}
                className='p-2.5 bg-red-300 rounded-l-lg hover:bg-red-400 ease-in-out duration-200'>
                <FaChevronLeft />
            </div>
            <div
                onClick={incrementStep}
                className='p-2.5 bg-red-300 rounded-r-lg hover:bg-red-400 ease-in-out duration-200'>
                <FaChevronRight />
            </div>

        </div>
    )
}