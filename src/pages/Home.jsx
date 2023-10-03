import HeroImg from "../assets/images/HeroImg";
function Home() {
  return (
    <div className="container mx-auto">
      <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 flex justify-center">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Create, read and share blogs anytime & anywhere
            </h2>
            <p className="hidden text-gray-500 md:mt-4 md:block">
              Dive into a world of captivating narratives and thought-provoking
              content with our innovative blog app. Whether you're a passionate
              reader or a content creator, Blog Life is designed to elevate your
              blogging experience to new heights.
            </p>
            <div className="mt-4 md:mt-8">
              <a
                href="#"
                className="inline-block rounded bg-[#6C63FF] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#6C63FF]/90 focus:outline-none focus:ring focus:ring-skyblue-400"
              >
                Get Started Today
              </a>
            </div>
          </div>
        </div>

        <HeroImg />
      </section>
    </div>
  );
}

export default Home;
