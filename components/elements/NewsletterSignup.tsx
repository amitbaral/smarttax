import React, { useState } from 'react';
import Link from 'next/link'

export default function NewsletterSignup() {
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage('Successfully subscribed!');
            } else {
                setMessage('Something went wrong. Please try again.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <section className="section-box overflow-visible mb-100">
            <div className="container mt-100">
                <div className="row">
                    <div className="col-lg-10 mx-auto">
                        <div className="bg-2 box-newsletter position-relative">
                            <div className="row">
                                <div className="col-lg-5 col-md-7">
                                    <span className="text-body-capitalized color-gray-500 text-uppercase">newsletter</span>
                                    <h4 className="text-heading-5 mb-10 mt-10">
                                        Tax Tips & Insights Delivered!
                                    </h4>
                                    <p className="text-body-text color-gray-500">
                                    Sign up for Smart Tax & Accounting&apos;s newsletter and get valuable tax tips, updates, and exclusive offers in your inbox.
                                    </p>
                                    <Link href="/privacy-policy">Term and Conditions</Link>
                                    <div className="box-form-newsletter mt-30">
                                        <form className="form-newsletter" onSubmit={handleSubmit}>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} className="input-newsletter" placeholder="Enter you mail .." />
                                            <button className="btn btn-send" />
                                        </form>
                                    </div>
                                    <div className="box-message-newsletter">
                                        {message && <p>{message}</p>}

                                    </div>
                                </div>
                                <div className="col-lg-7 col-md-5 mt-30 mt-lg-0 mt-md-30 mt-sm-30 position-relative text-end">
                                    <div className="block-chart shape-1">
                                        <img src="/assets/imgs/template/chart.png" alt="Smart Tax & Accounting" />
                                    </div>
                                    <img className="img-responsive img-newsletter" src="/assets/imgs/template/img-newsletter.png" alt="Smart Tax & Accounting" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}