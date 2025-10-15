import React from "react";

const Footer = () => {
    return (
        <section className='bg-amber-950 text-white py-8'>
            <div className='container mx-auto text-center'>
                <div className='flex justify-between'>
                    <p>
                        &copy; {new Date().getFullYear()}. The Velora Escape.
                        All Right Reserved.
                    </p>
                    <p>Site By : Rahul Prasad</p>
                </div>
            </div>
        </section>
    );
};

export default Footer;
