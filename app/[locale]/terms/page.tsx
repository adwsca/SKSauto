import { notFound } from 'next/navigation';
import companyInfo from '../../../companyInfo.json'

const TermsPage = ({ params }: { params: { locale: string } }) => {
  const { locale } = params;

  let company = companyInfo[0]

  if (!['en', 'fr'].includes(locale)) {
    notFound(); // Handle unsupported locales
  }
  return (
    <div className='bg-white'>
      {locale === 'en' ? (
       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className='flex flex-col gap-2 lg:flex-row justify-center items-center lg:justify-between lg:items-center mb-10'>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms and conditions</h1>
          <p className="text-md text-gray-700 text-justify0">Last Update : 27 Septembre 2024</p>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          1. Acceptance of Terms
        </h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This first and fundamental paragraph establishes the legally binding contract between you, the user of this website, and {company.companyName}, the owner and operator of this website. By accessing or using this site in any way, even by simply browsing it, you signify your unconditional acceptance of all the terms and conditions set forth in this document. You also agree to comply with all relevant laws and regulations that may apply to your use of the Site. If for any reason you do not agree with one or more of these terms and conditions, you must not use the Site. This section also clarifies that the terms &quot;we&quot;, &quot;us&quot; and &quot;the Provider&quot; used throughout this document unambiguously refer to {company.companyName}.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          2. Changes to Terms and Conditions
        </h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This section emphasizes the dynamic nature of these Terms and Conditions. The Company reserves the right to change or update them at any time without any obligation to notify you in advance. It is therefore your responsibility to periodically check this page for changes. Your continued use of the Site following the posting of changes to the Terms and Conditions will be deemed to be your acceptance of the new Terms and Conditions. Although the Company may choose to notify you of important changes by email or by prominently posting a notice on the Site, it is under no legal obligation to do so.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          3. Links to Third Party Sites
        </h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This section addresses the possible presence of hypertext links to external Websites that are not operated or controlled by {company.companyName}. It is important to understand that the Company has no authority over the content, practices, or even the privacy policies of these third-party sites. As a result, the Company disclaims any responsibility for the accuracy, legality, or security of these sites, or for any consequences arising from their use. If you click on these links, you do so at your own risk. We strongly recommend that you carefully read the terms and conditions and privacy policy of any third party site that you visit.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          4. Intellectual Property
        </h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This important section protects the Company&apos;s intellectual property rights. All content on the Site, whether text, images, logos, video, software or other material, is the exclusive property of {company.companyName} or is used with the express permission of the rights holders. This content is protected by copyright, trademark, patent and other laws. It is strictly prohibited to reproduce, modify, distribute, publicly display, publicly perform, republish, or commercially exploit, in whole or in part, the content of the Site without the prior written permission of the Company.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          5. Responsability
        </h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This paragraph defines the limits of the Company&apos;s liability for damages incurred by the User in connection with the use of the Site or its contents. It is important to note that the Company expressly disclaims any liability for indirect, consequential, or special damages, such as loss of profits, loss of data, loss of business opportunity, or other intangible losses, even if the Company has been advised of the possibility of such damages. This limitation of liability is customary in online terms and conditions and is intended to protect the Company from excessive or unforeseeable claims.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          6. Privacy Policy
        </h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This section serves as an introduction to the Company&apos;s Privacy Policy, a separate but important document that details how your personal information is collected, used, stored and shared. It is imperative that you read this policy carefully to understand how your information is processed and what your privacy rights are. The Privacy Policy forms an integral part of these Terms and Conditions and by accepting these Terms and Conditions, you also accept the terms of the Privacy Policy.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Security</h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This paragraph addresses the critical issue of the security of your personal information, in particular your login details (username and password). While the Company is committed to implementing reasonable security measures to protect your information from unauthorized access, it is important to recognize that no method of transmitting or storing information over the Internet is completely infallible. As a result, the Company cannot guarantee the absolute security of your information. It is your responsibility to maintain the confidentiality of your login information and not to disclose it to any third party. The Company declines all responsibility for any loss or damage resulting from your negligence in security matters.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">8. Applicable law</h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This paragraph specifies the legal framework applicable to these Terms and Conditions, as well as to any dispute that may arise from them. It states that the laws of the specified province or country will govern the interpretation and application of these terms. In the event of any conflict or disagreement, you irrevocably agree to submit to the exclusive jurisdiction of the courts of that region. The purpose of this clause is to clarify the legal framework and avoid conflicts of law in the event of a dispute.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">9. Severability Clause</h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This clause, often found in contracts, provides that if any part of these terms and conditions is found by a court of competent jurisdiction to be invalid or unenforceable, that part will be deemed null and void, but the remainder of the agreement will continue in full force and effect. This clause ensures that the invalidity of any provision will not affect the validity of the entire agreement.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">10. Entire Agreement</h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        This section states that these Terms and Conditions, together with the Privacy Policy incorporated herein by reference, constitute the entire agreement between you and the Company with respect to the use of the Site. This means that any prior agreements, arrangements or understandings, whether written or oral, regarding the use of the Site is superseded and canceled by these Terms and Conditions. The purpose of this clause is to avoid any confusion or ambiguity as to the rights and obligations of the parties.</p>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">11. How to contact us</h3>
        <p className="text-lg text-gray-700 mb-4 text-justify">
        At {company.companyName}, your satisfaction is our priority. If you encounter a problem, need additional information, or simply want to send us your comments, please do not hesitate to write to us at {company.companyEmail}. We&apos;ll get back to you as soon as possible.
        </p>
     </div>
      ) : (
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className='flex flex-col gap-2 lg:flex-row justify-center items-center lg:justify-between lg:items-center mb-10'>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Termes et conditions</h1>
            <p className="text-md text-gray-700 text-justify0">Date de mise à jour : 27 Septembre 2024</p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            1. Acceptation des Conditions
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            Ce premier paragraphe, fondamental, établit le contrat juridiquement contraignant entre vous, l&apos;utilisateur du site web, et {company.companyName}, le propriétaire et l&apos;exploitant de ce site. En accédant au site ou en l&apos;utilisant de quelque manière que ce soit, même simplement en le parcourant, vous signifiez votre acceptation inconditionnelle de l&apos;ensemble des termes et conditions énoncés dans ce document. De plus, vous vous engagez à respecter toutes les lois et réglementations pertinentes qui pourraient s&apos;appliquer à votre utilisation du site. Si, pour une raison quelconque, vous n&apos;êtes pas d&apos;accord avec une ou plusieurs de ces conditions, vous devez vous abstenir d&apos;utiliser le site. Ce paragraphe clarifie également que les termes &quot;nous&quot;, &quot;notre&quot; et &quot;le fournisseur&quot; utilisés tout au long du document se réfèrent sans ambiguïté à {company.companyName}.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            2. Modifications des Conditions
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            Ce paragraphe met en évidence la nature dynamique de ces termes et conditions. L&apos;entreprise se réserve le droit de les modifier ou de les mettre à jour à tout moment, et ce, sans aucune obligation de vous en informer au préalable. Il est donc de votre entière responsabilité de consulter régulièrement cette page pour vous tenir informé des éventuelles modifications. Si vous continuez à utiliser le site après que des changements aient été apportés, cela sera interprété comme votre acceptation tacite des nouvelles conditions. Bien que l&apos;entreprise puisse choisir de vous notifier des changements importants par e-mail ou par le biais d&apos;une annonce bien visible sur le site, elle n&apos;est pas légalement tenue de le faire.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            3. Liens vers des Sites Tiers
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            Ce paragraphe traite de la présence potentielle de liens hypertextes pointant vers des sites web externes, qui ne sont ni exploités ni contrôlés par {company.companyName}. Il est crucial de comprendre que l&apos;entreprise n&apos;a aucune autorité sur le contenu, les pratiques, ni même la politique de confidentialité de ces sites tiers. Par conséquent, elle décline toute responsabilité quant à l&apos;exactitude, la légalité ou la sécurité de ces sites, ainsi que pour toute conséquence découlant de leur utilisation. En cliquant sur ces liens, vous le faites à vos propres risques et périls. Il est vivement recommandé de lire attentivement les termes et conditions, ainsi que la politique de confidentialité, de chaque site tiers que vous visitez.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            4. Propriété Intellectuelle
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
            Ce paragraphe crucial protège les droits de propriété intellectuelle de l&apos;entreprise. Tout le contenu présent sur le site, qu&apos;il s&apos;agisse de textes, d&apos;images, de logos, de vidéos, de logiciels ou de tout autre matériel, est la propriété exclusive de {company.companyName} ou est utilisé avec l&apos;autorisation explicite des détenteurs de droits. Ce contenu est protégé par un ensemble de lois, notamment celles relatives au droit d&apos;auteur, aux marques de commerce et aux brevets. Il est strictement interdit de reproduire, de modifier, de distribuer, d&apos;afficher publiquement, de représenter publiquement, de republier ou d&apos;exploiter commercialement tout ou partie du contenu du site sans avoir obtenu au préalable le consentement écrit de l&apos;entreprise.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            5. Responsabilité
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
              Ce paragraphe définit les limites de la responsabilité de l&apos;entreprise en cas de dommages subis par l&apos;utilisateur en relation avec l&apos;utilisation du site ou de son contenu. Il est important de noter que l&apos;entreprise exclut expressément toute responsabilité pour les dommages indirects, consécutifs ou spéciaux, tels que la perte de profits, la perte de données, la perte d&apos;opportunités commerciales ou toute autre perte intangible, même si l&apos;entreprise a été informée de la possibilité de tels dommages. Cette limitation de responsabilité est courante dans les termes et conditions en ligne et vise à protéger l&apos;entreprise contre des réclamations excessives ou imprévisibles.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
              6. Confidentialité
          </h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
              Ce paragraphe sert d&apos;introduction à la politique de confidentialité de l&apos;entreprise, un document distinct mais essentiel qui détaille la manière dont vos informations personnelles sont collectées, utilisées, stockées et partagées. Il est impératif de lire attentivement cette politique pour comprendre comment vos données sont traitées et quels sont vos droits en matière de protection de la vie privée. La politique de confidentialité fait partie intégrante de ces termes et conditions, et en les acceptant, vous acceptez également les modalités de la politique de confidentialité.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">7. Sécurité</h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
              Ce paragraphe aborde la question cruciale de la sécurité de vos informations personnelles, en particulier vos identifiants de connexion (nom d&apos;utilisateur et mot de passe). Bien que l&apos;entreprise s&apos;engage à mettre en œuvre des mesures de sécurité raisonnables pour protéger vos données contre tout accès non autorisé, il est important de reconnaître qu&apos;aucune méthode de transmission ou de stockage de données sur Internet n&apos;est totalement infaillible. Par conséquent, l&apos;entreprise ne peut garantir la sécurité absolue de vos informations. Il vous incombe de protéger la confidentialité de vos identifiants de connexion et de ne pas les divulguer à des tiers. L&apos;entreprise décline toute responsabilité en cas de perte ou de dommage résultant de votre négligence en matière de sécurité.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">8. Droit Applicable</h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
              Ce paragraphe précise le cadre juridique applicable à ces termes et conditions, ainsi qu&apos;à tout litige pouvant en découler. Il stipule que les lois de la province ou de l&apos;État spécifié régissent l&apos;interprétation et l&apos;application de ces termes. En cas de conflit ou de désaccord, vous acceptez irrévocablement de vous soumettre à la juridiction exclusive des tribunaux de cette région. Cette clause vise à clarifier le cadre juridique et à éviter les conflits de lois en cas de litige.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">9. Divisibilité</h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
              Cette clause, souvent présente dans les contrats, prévoit que si une partie quelconque de ces termes et conditions est jugée invalide ou inapplicable par un tribunal compétent, cette partie sera considérée comme nulle et non avenue, mais le reste du contrat restera pleinement en vigueur et de plein effet. Cette clause garantit que l&apos;invalidité d&apos;une disposition n&apos;affecte pas la validité de l&apos;ensemble de l&apos;accord.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">10. Intégralité de l&apos;Accord</h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
              Ce paragraphe affirme que ces termes et conditions, ainsi que la politique de confidentialité qui y est incorporée par référence, constituent l&apos;intégralité de l&apos;accord entre vous et l&apos;entreprise concernant l&apos;utilisation du site. Cela signifie que tout accord, arrangement ou entente antérieur, qu&apos;il soit écrit ou oral, relatif à l&apos;utilisation du site est remplacé et annulé par les présentes conditions. Cette clause vise à éviter toute confusion ou ambiguïté quant aux droits et obligations des parties.</p>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">11. Nous Contacter</h3>
          <p className="text-lg text-gray-700 mb-4 text-justify">
              Chez {company.companyName}, votre satisfaction est notre priorité. Si vous rencontrez un problème, avez besoin d&apos;informations complémentaires ou souhaitez simplement nous faire part de vos commentaires, n&apos;hésitez pas à nous écrire à {company.companyEmail}. Nous nous engageons à vous répondre dans les meilleurs délais.
          </p>
        </div>
      )}
    </div>
  );
};

export default TermsPage;
