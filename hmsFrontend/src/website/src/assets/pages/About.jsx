import logo from '../../../Images/fortuneabout.jpg'

const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-16 px-8 sm:px-16 md:px-24 lg:px-40">
      <div className="flex flex-col lg:flex-row items-center justify-between">
        {/* Left Section - Image */}
        <div className="lg:w-1/3 bg-[var(--accent-2)] rounded-lg shadow-lg overflow-hidden">
          <img
            className="w-full h-auto object-cover rounded-md shadow-lg"
            src={logo}
            alt="About Fortune Hospital"
          />
        </div>

        {/* Right Section - Text Content */}
        <div className="lg:w-2/3 lg:pl-10 mt-8 lg:mt-0">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">About Us</h1>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Fortune MultiSpeciality Hospital in Thergaon stands as a beacon of quality healthcare, dedicated to serving the community with compassion and excellence. Our hospital, equipped with state-of-the-art facilities such as a modular operation theatre, ICU, and 24/7 medical services, ensures that patients receive the best possible care at any time. With a team of highly skilled doctors and support staff, we specialize in the diagnosis and treatment of complex and chronic diseases, all while maintaining the highest standards of hygiene.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Fortune Hospital is not just a healthcare facility but a trusted partner in your journey to better health.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
