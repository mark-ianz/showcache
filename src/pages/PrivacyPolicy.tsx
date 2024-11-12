import ContactUsLink from "@/components/ContactUsLink";
import HeaderText from "@/components/HeaderText";
import HeaderText2 from "@/components/HeaderText2";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Introduction",
      content: [
        <>
          Welcome to ShowCache. We are dedicated to respecting and protecting
          your privacy as well as safeguarding any personal information you
          provide to us. Our goal is to offer a transparent view of how we
          handle your data and to ensure your privacy is respected at every
          step. We encourage you to reach out if you have questions or concerns
          about our policy or practices.
          <ContactUsLink>Feel free to contact us at any time.</ContactUsLink>
          We are here to address any questions you may have about our approach
          to privacy and data security.
        </>,
      ],
    },
    {
      title: "Information We Collect",
      content: [
        "To provide you with a secure and personalized experience on ShowCache, we collect specific information that you voluntarily share when you register or interact with our services.",
        "These data points allow us to create a secure account for you, verify your identity, and offer features that enhance your overall experience with ShowCache. We gather only the information necessary to facilitate these interactions, ensuring that we respect your privacy while maintaining a high level of service quality and security.",
      ],
    },
    {
      title: "How We Use Your Information",
      content: [
        "Your personal information is used to provide, personalize, and improve the services we offer on ShowCache. We may use your data to set up your account, manage login and security, and communicate updates or relevant information about your account or our services.",
        "Additionally, with your consent, we may send you promotional offers or targeted content that we believe would be of interest to you based on your use of our services. We also analyze general trends based on user data to improve the ShowCache platform, address technical issues, and enhance our security features to protect all users.",
      ],
    },
    {
      title: "Sharing Your Information",
      content: [
        "We understand that your personal information is important, and we only share it in specific situations where it is necessary to do so. We may share your data with trusted third-party service providers who assist us in delivering our services, such as hosting providers or email services, but only to the extent needed for them to perform their services on our behalf.",
        "In certain situations, we may also share information to comply with legal obligations, respond to legal requests, or fulfill other legitimate business interests, such as protecting our rights or supporting essential operations. Rest assured, your information will only be shared with trusted parties when absolutely necessary, and we do not sell your data to third parties for any purpose.",
      ],
    },
  ];

  return (
    <main className="mx-auto p-6 max-sm:p-4">
      <HeaderText className="font-bold mb-4">Privacy Policy</HeaderText>
      {sections.map((section, index) => (
        <section key={index} className="mb-8">
          <HeaderText2 className="mb-2">{section.title}</HeaderText2>
          <div className="text-lg flex gap-1 flex-col">
            {section.content.map((content, index) => (
              <p key={index} className="text-lg max-sm:text-base">
                {content}
              </p>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
