import ContactUsLink from "@/components/ContactUsLink";
import HeaderText from "@/components/HeaderText";

export default function About() {
  const sections = [
    {
      title: "About ShowCache",
      desc: "ShowCache is your ultimate destination for discovering and exploring movies and TV shows. Our platform provides detailed information about your favorite shows, including genres, ratings, cast, crew, and much more. We aim to be the most comprehensive and user-friendly resource for all your entertainment needs.",
    },
    {
      title: "Our Mission",
      desc: "Our mission is to make it easy for you to find and enjoy the best movies and TV shows. We strive to provide accurate and up-to-date information to help you make informed decisions about what to watch next. Whether you're looking for the latest releases, popular trends, or hidden gems, ShowCache has got you covered.",
    },
    {
      title: "Credits",
      desc: "ShowCache uses the TMDB API but is not endorsed or certified by TMDB. All movie and TV show data, including images, are provided by The Movie Database (TMDB). We are grateful for their comprehensive and reliable data, which makes our service possible.",
    },
    {
      title: "Contact Us",
      desc: (
        <>
          If you have any questions or feedback, feel free to
          <ContactUsLink>reach out to us.</ContactUsLink>
          We value your input and are always looking for ways to improve our
          service. Your suggestions and comments help us to better serve you and
          the entire ShowCache community.
        </>
      ),
    },
  ];

  return (
    <main className="mx-auto p-6 max-sm:p-4">
      {sections.map((section, index) => (
        <section key={index} className="mb-8">
          <HeaderText className="mb-2">{section.title}</HeaderText>
          <p className="text-lg max-sm:text-base">{section.desc}</p>
        </section>
      ))}
    </main>
  );
}
