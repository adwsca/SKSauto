import { useTranslations } from 'next-intl';

export default function AboutUs() {
  const t = useTranslations('AboutUs');

  return (
    <section className="aboutus">
      <h1>{t('aboutus')}</h1>
      {/* Add more content or styles as needed */}
    </section>
  );
}