import { useTranslations } from 'next-intl';

export default function BrowseMake() {
  const t = useTranslations('BrowseMake');

  return (
    <section className="browsemake">
      <h1>{t('browsemake')}</h1>
      {/* Add more content or styles as needed */}
    </section>
  );
}