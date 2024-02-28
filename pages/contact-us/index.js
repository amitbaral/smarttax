import Link from "next/link";
import Layout from "../../components/layout/Layout";
import Image from "next/image";
import { hygraphClient } from '../../lib/_client'
import { generalQuery, pageQuery } from '../../lib/_queries'
import { parseGeneralData } from '../../utils/_parseGeneralPageData'
import { Controller, useForm } from "react-hook-form"
import {  useState, useEffect } from "react";
import Select from "react-select";


function ContactPage({ page }) {
    const { register, handleSubmit, control, formState: { isLoading, errors } } = useForm();
    const [message, setMessage] = useState("")
    const [subjectValue, setSubjectValue] = useState(null);
    

    useEffect(() => {
    setTimeout(() => {
        setSubjectValue({ label: "General Enquiry", value: "General Enquiry" });
    }, 2000);
}, []);
    const default_value = "General Enquiry"

    let subject = [
        { value: 'General Enquiry', label: 'General Enquiry' },
        { value: 'Website Re-design', label: 'Website Re-design' },
        { value: 'Website Development', label: 'Website Development' },
        { value: 'Website Maintenance', label: 'Website Maintenance' }
    ];



    const submitHandler = async (formData, event) => {
        const { fullName, mail, phone, company, message, subject } = formData
        // const token = await recaptchaRef.current.executeAsync();
        // setLoading(true);
        const data = {
            form: "contact_us",
            fullName,
            company,
            email: mail,
            phone,
            message,
            subject,
            //token: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
        }
        await fetch('/api/send-mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                if (res.ok && res.status === 200) {
                    event.target.reset()
                    setMessage("Message Sent Successfully ✅")
                }
            })
            .catch(err => {
                setMessage("Something went wrong ❌")
                console.log("ERROR: Sending email", err)
            })
    }

    return (
        <>
            <Layout page={page} >
                <section className="section-box">
                    <div className="banner-hero banner-breadcrums">
                        <div className="container text-center">
                            <h1 className="text-heading-2 color-gray-1000 mb-20">Contact Us</h1>
                            <div className="row">
                                <div className="col-md-6 offset-md-3">
                                    <p className="text-body-text color-gray-500">
                                        Whether you&apos;re looking for a new website, need maintenance for your existing one,
                                        or simply have a few questions about WordPress, we&apos;re here to help. Reach out to us today and
                                        let&apos;s start building your online success together!
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-box">
                    <div className="container mb-20 mt-140">
                        <div className="bdrd-58 box-gray-100 icon-wave">
                            <div className="row">
                                <div className="col-lg-12 mb-60"><span className="text-body-capitalized text-uppercase">Contact us</span>
                                    <h2 className="text-heading-3 color-gray-900 mt-10">Have an project in mind?</h2>
                                    <p className="text-body-text color-gray-600 mt-20">The right move at the right time saves your time and investment.<br className="d-lg-block d-none" />live the dream of expanding your business.</p>
                                </div>
                                <div className="col-lg-4 mb-40">
                                    <h4 className="text-heading-6 color-gray-900 icon-home mb-10 mt-10">WP PRO</h4>
                                    <p className="text-body-text color-gray-600">1/10 Moorlands Road<br />Ingleburn NSW 2565</p>
                                    <p className="text-body-text color-gray-600">(02) 8740 7058</p>
                                    <p className="text-body-text color-gray-600">info@wppro.au</p>
                                </div>
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <div className="form-group">
                                                <form className="form" onSubmit={handleSubmit(submitHandler)}>
                                                    <div className="row">
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <input className={`form-control ${errors.fullName && "is-invalid"}`} placeholder="Enter your name" {...register("fullName", {
                                                                    required: "required",
                                                                    minLength: {
                                                                        value: 3,
                                                                    }
                                                                })} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group"><input className="form-control" placeholder="Company (optional)" {...register("company")} /></div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <input className={`form-control ${errors.mail && "is-invalid"}`} placeholder="Your email" {...register("mail", {
                                                                    required: "required",
                                                                    pattern: {
                                                                        value: /\S+@\S+\.\S+/,
                                                                        message: "Entered value does not match email format"
                                                                    }
                                                                })} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <input className={`form-control ${errors.phone && "is-invalid"}`} placeholder="Phone number" {...register("phone", {
                                                                    required: "required",
                                                                })} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                    
                                                                {subjectValue && (
                                                                    <Controller
                                                                        name="subject"
                                                                        control={control}
                                                                        render={({ field: { onChange, onBlur, ref } }) => (
                                                                            <Select
                                                                            styles={{
                                                                                control: (provided, state) => {
                                                                                    return ({
                                                                                        ...provided,
                                                                                        paddingLeft: "20px",
                                                                                        borderRadius: "0",
                                                                                    })
                                                                                },
                                                                            }} // style object
                                                                                options={subject}
                                                                                defaultValue={default_value}
                                                                                value={subject.find((c) => c.value === subjectValue)}
                                                                                onChange={(val) => onChange(val.value)}
                                                                            />
                                                                        )}
                                                                        rules={{ required: true }}
                                                                    />
                                                                )}
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12">
                                                            <div className="form-group">
                                                                <textarea className={`form-control ${errors.message && "is-invalid"}`} placeholder="Tell us about yourself"  {...register("message")} />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 mt-15">
                                                            <button className="btn btn-black icon-arrow-right-white mr-40 mb-20" type="submit">Send Message</button><br className="d-lg-none d-block" />
                                                            {message && <span className="text-body-text-md color-gray-500 mb-20">{message}</span>}
                                                            </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            </Layout>

        </>
    )
}
export async function getStaticProps({ preview = false }) {
    const client = hygraphClient(preview)
    const { pages, page } = await client.request(generalQuery, {
        slug: 'contact-us'
    })
    const parsedPageData = await parseGeneralData(page)
    return {
        props: {
            page: parsedPageData,
            preview
        },
        revalidate: 60
    }
}

export default ContactPage;

