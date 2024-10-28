import { useTranslations } from 'next-intl';

export default function TopSection() {
  const t = useTranslations('TopSection');

  return (
    <section className="hero">
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      {/* Add more content or styles as needed */}
    </section>
  );
}