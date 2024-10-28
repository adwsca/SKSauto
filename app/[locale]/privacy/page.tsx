import { notFound } from 'next/navigation';
import companyInfo from '../../../companyInfo.json'

const PrivacyPage = ({ params }: { params: { locale: string } }) => {
  const { locale } = params;

  if (!['en', 'fr'].includes(locale)) {
    notFound(); // Handle unsupported locales
  }

  let company = companyInfo[0];
  
  return (
    <div className='bg-white'>
      {locale === 'en' ? (
       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
       <div className='flex flex-col gap-2 lg:flex-row justify-center items-center lg:justify-between lg:items-center mb-10'>
         <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy policy</h1>
         <p className="text-md text-gray-700 text-justify0">Last update : September 27, 2024</p>
       </div>

       <p className="text-lg text-gray-700 mb-4 text-justify">
        By accessing and using {company.url}, you expressly agree to the terms and conditions set forth in this Privacy Policy. At {company.companyName}, we take the protection of your privacy and the security of your personal information very seriously. We have implemented advanced security measures and follow best practices to ensure that your information is protected from unauthorized access, use or disclosure. This consent is effective the first time you use our site and indicate your understanding and agreement that we may collect, use and disclose your information in accordance with the practices described in this policy.
       </p>
       <p className="text-lg text-gray-700 mb-4 text-justify">
        We encourage you to read and understand this Privacy Policy. It is designed to inform you of our practices regarding the collection, use, security and disclosure of information you provide to us. Your continued use of this site following the posting of changes to our privacy policy will mean you accept those changes. We agree to notify you of any material changes by posting a notice on our site or by emailing you so that you may review the changes before continuing to use our services.
       </p>

       <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
        Collection and Use of Information:
       </h3>
       <p className="text-lg text-gray-700 mb-4 text-justify">
       We collect various types of information in order to continually improve our services and communicate effectively with you. This information includes:
       </p>
         <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'><span className='font-semibold'>Personal Information:</span> We collect information that directly or indirectly identifies you. This includes your name, mailing address, email address, telephone number, IP address, and other unique identifiers. This information allows us to manage your transactions, answer your questions, and provide you with appropriate customer support.
         </p>
         <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'>
         <span className='font-semibold'>Non-Personally Identifiable Information:</span> We also collect information that does not directly reveal your identity. This includes demographic statistics and other aggregate measures to assess how our users interact with our site. This information helps us improve our services and evaluate the effectiveness of our features.
         </p>
         <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'>
         <span className='font-semibold'>Informations d&apos;Utilisation :</span> Ces données comprennent les détails de votre  navigation sur notre site, comme les types de navigateur utilisés, les horodatages de vos visites, les pages consultées, et les interactions avec le site. Nous utilisons ces informations pour améliorer l&apos;expérience utilisateur sur notre site et pour analyser les tendances d&apos;utilisation.
         </p>

         <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
           Utilisation, Partage et Sécurité des Informations : 
         </h3>
         <p className="text-lg text-gray-700 mb-4 text-justify">
           <span className='font-bold'>Usage Information:</span> This information includes details about your browsing on our site, such as browser types used, visit timestamps, pages viewed, and site interactions. We use this information to improve your experience on our site and to analyze usage trends.
         </p>
         <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'>
          - Use, Disclosure and Security of Information<br/> 
          - Use of Information We use the information you provide to us, including personal information, for the efficient management of our business and to strengthen our relationship with you. These uses include
          Presenting and improving the content of our website.<br/> 
          - Responding to your requests for products or services.<br/> 
          - Processing your transactions, warranties, or maintenance programs.<br/> 
          - Sending important notices about your account.<br/> 
          - Comply with our legal obligations and enforce our rights under our agreements.<br/> 
          - Notify you about changes to our services or terms of use.<br/> 
          - Participate in interactive or social media features available on our site.<br/> 
          - Analyze and improve the effectiveness of our advertising to provide you with targeted promotions.
         </p>

         <p className="text-lg text-gray-700 mb-4 text-justify">
           We will not sell or rent your personal information to third parties without your explicit consent. We share your information in the following contexts.
         </p>
         <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'>
          - To service providers and partners who assist us with our operations and services.<br/> 
          - To comply with legal requirements or in response to legal process.<br/>
          - As part of corporate transactions, such as mergers, acquisitions or sales of assets.<br/>
          - With partners and third parties for operational needs or with your explicit consent for specific promotions or services.
         </p>

         <p className="text-lg text-gray-700 mb-4 text-justify">
           <span className='font-bold'>Security and Retention of Information :</span> We use robust security measures to protect your information, including SSL encryption and secure transmission protocols. Access to your information is strictly limited to our employees and contractors who need it to do their jobs, and all are required to respect the confidentiality of your information.
         </p>
         <p className="text-lg text-gray-700 mb-4 text-justify">Your information is stored in secure infrastructure managed by Amazon Web Services in Canada, although certain operations may require data to be transferred outside of Canada, where regulations may be different.
         </p>
         <p className="text-lg text-gray-700 mb-4 text-justify">We retain your personal information for as long as necessary to fulfill the purposes for which it was collected and to comply with legal retention requirements. After this period, the information is securely destroyed in accordance with our internal policies.
         </p>
         <p className="text-lg text-gray-700 mb-4 text-justify">
         <span className='font-bold'>Your Consent and Rights :</span> By using our site, you consent to the processing of your information as described. You have the right to access, modify, or request deletion of your personal information, and you may also object to certain uses of your information as described in our Privacy Policy.
         </p>
         <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
          Cookies and Similar Technologies: 
         </h3>
         <p className="text-lg text-gray-700 mb-4 text-justify">
          We use cookies to enhance your experience, analyze traffic, and personalize content. You can control the use of cookies through your browser preferences.
         </p>
         <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
          Changes to this policy: 
         </h3>
         <p className="text-lg text-gray-700 mb-4 text-justify">
          We may update this policy from time to time. We will notify you of any material changes by posting a notice on our site or by email.
         </p>
         <p className="text-lg text-gray-700 mb-4 text-justify">
          If you have any questions about this policy or your personal information, please contact our Privacy Officer at infos@dfab.ca.
         </p>
         <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
         How to contact us
         </h3>
         <p className="text-lg text-gray-700 mb-4 text-justify">
          If you have any questions about this Privacy Policy or your personal information, please contact our Privacy Officer at {company.companyEmail}.
         </p>
     </div>
      ) : (
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className='flex flex-col gap-2 lg:flex-row justify-center items-center lg:justify-between lg:items-center mb-10'>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Politique de confidentialité</h1>
          <p className="text-md text-gray-700 text-justify0">Date de mise à jour : 27 Septembre 2024</p>
        </div>

        <p className="text-lg text-gray-700 mb-4 text-justify">
          En accédant et en utilisant https://www.dfab.ca/, vous consentez explicitement aux termes énoncés dans cette politique de confidentialité. Chez {company.companyName}, nous prenons très au sérieux la protection de votre vie privée et la sécurité de vos informations personnelles. Nous avons implémenté des mesures de sécurité avancées et suivi les meilleures pratiques pour assurer que vos données sont protégées de tout accès, utilisation ou divulgation non autorisée. Ce consentement est actif dès votre première utilisation de notre site et implique votre compréhension et votre accord que nous puissions collecter, utiliser, et partager vos informations selon les pratiques décrites dans cette politique.
        </p>
        <p className="text-lg text-gray-700 mb-4 text-justify">
         Nous vous encourageons à lire attentivement et à comprendre cette politique de confidentialité. Elle est conçue pour vous informer de nos pratiques concernant la collecte, l&apos;utilisation, la sécurité et le partage des informations que vous nous fournissez. Votre utilisation continue de ce site après toute modification apportée à notre politique de confidentialité sera interprétée comme une acceptation de ces modifications. Nous nous engageons à vous informer de toute modification substantielle par une notification sur notre site ou par email, vous permettant ainsi de revoir les changements avant de continuer à utiliser nos services.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
          Collecte et utilisation des Données : 
        </h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
          Nous recueillons divers types d&apos;informations pour améliorer continuellement nos services et communiquer efficacement avec vous. Ces données incluent :
        </p>
          <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'><span className='font-semibold'>Informations personnelles :</span> Nous collectons des informations qui peuvent vous identifier, que ce soit directement ou indirectement. Cela comprend votre nom, adresse postale, courriel, numéro de téléphone, adresse IP, et d&apos;autres identifiants uniques. Ces informations nous permettent de gérer vos transactions, de répondre à vos questions, et de vous offrir un support client adapté.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'>
          <span className='font-semibold'>Informations non personnelles :</span> Nous recueillons également des données qui ne révèlent pas directement votre identité. Cela inclut des statistiques démographiques et d&apos;autres mesures agrégées pour évaluer comment nos utilisateurs interagissent avec notre site. Ces informations nous aident à optimiser nos services et à évaluer l&apos;efficacité de nos fonctionnalités.
          </p>
          <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'>
          <span className='font-semibold'>Informations d&apos;Utilisation :</span> Ces données comprennent les détails de votre  navigation sur notre site, comme les types de navigateur utilisés, les horodatages de vos visites, les pages consultées, et les interactions avec le site. Nous utilisons ces informations pour améliorer l&apos;expérience utilisateur sur notre site et pour analyser les tendances d&apos;utilisation.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
            Utilisation, Partage et Sécurité des Informations : 
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            <span className='font-bold'>Utilisation des Informations :</span>  Nous utilisons les informations que vous nous fournissez, y compris les Informations Personnelles, pour une gestion efficace de nos activités et pour renforcer les relations commerciales avec vous. Ces utilisations comprennent:
          </p>
          <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'>- Présenter et améliorer le contenu de notre site.<br/>
            - Répondre à vos demandes de produits ou services.<br/>
            - Gérer vos transactions, garanties, ou programmes d&apos;entretien.<br/>
            - Envoyer des notifications importantes concernant votre compte.<br/>
            - Se conformer à nos obligations légales et faire valoir nos droits dans le cadre de nos relations contractuelles.<br/>
            - Informer des modifications de nos services ou conditions d&apos;utilisation.<br/>
            - Participer à des fonctionnalités interactives ou des médias sociaux disponibles sur notre site.<br/>
            - Analyser et améliorer l&apos;efficacité de nos publicités pour vous proposer des promotions ciblées.
          </p>

          <p className="text-lg text-gray-700 mb-4 text-justify">
            <span className='font-bold'>Partage des Informations :</span>  Nous nous engageons à ne pas vendre ni louer vos informations personnelles à des tiers sans votre consentement explicite. Nous partageons vos informations dans les contextes suivants :
          </p>
          <p className='text-lg text-gray-700 mb-4 text-justify lg:ml-10'>
          - Avec des prestataires de services et partenaires qui nous assistent dans nos opérations et services.<br/>
          - Lors de conformité avec des exigences légales ou en réponse à des procédures judiciaires.<br/>
          - Dans le cadre de transactions d&apos;entreprise, telles que fusions, acquisitions, ou ventes d&apos;actifs.<br/>
          - Avec des partenaires et tiers pour les nécessités opérationnelles ou avec votre consentement explicite pour des promotions ou services spécifiques.
          </p>

          <p className="text-lg text-gray-700 mb-4 text-justify">
            <span className='font-bold'>Sécurité et Conservation des Informations :</span>  Nous adoptons des mesures de sécurité robustes pour protéger vos informations, incluant le cryptage SSL et des protocoles sécurisés pour la transmission des données. L&apos;accès à vos informations est strictement limité à notre personnel et aux prestataires qui en ont besoin pour leur travail, et tous sont tenus de respecter la confidentialité de vos données.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-justify">Vos informations sont stockées dans des infrastructures sécurisées gérées par Amazon Web Services au Canada, bien que certaines opérations puissent nécessiter un transfert de données en dehors du Canada, où les régulations peuvent différer.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-justify">Nous conservons vos informations personnelles aussi longtemps que nécessaire pour les fins spécifiées, et nous nous conformons aux obligations légales pour la conservation des données. Après ce terme, les données sont sécuritairement détruites conformément à nos politiques internes.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-justify">
          <span className='font-bold'>Votre consentement et vos droits :</span> En utilisant notre site, vous consentez au traitement de vos informations comme décrit. Vous avez le droit d&apos;accéder, modifier ou demander la suppression de vos informations personnelles, et vous pouvez également vous opposer à certaines utilisations de vos données comme spécifié dans notre politique de confidentialité.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
          Cookies et technologies similaires :
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic, et personnaliser le contenu. Vous pouvez contrôler l&apos;utilisation des cookies via les paramètres de votre navigateur.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
            Modifications de cette Politique : 
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            Nous pouvons mettre à jour cette politique périodiquement. Nous vous informerons de toute modification significative par une annonce sur notre site ou par email.
          </p>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            Contactez-nous Pour toute question relative à cette politique ou vos données personnelles, veuillez contacter notre Responsable de la Protection des Données à infos@dfab.ca.
          </p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 mt-10">
            Contactez-nous
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            Pour toute question relative à cette politique de confidentialité ou à vos données personnelles, veuillez contacter notre Responsable de la Protection des Données à l&apos;adresse suivante : {company.companyEmail}
          </p>
      </div>
      )}
    </div>
  );
};

export default PrivacyPage;
