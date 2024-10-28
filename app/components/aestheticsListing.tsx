import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl';

const AestheticsListing = () => {
  const t = useTranslations('Aesthetics');

  const servicesCarrosserieEsthetique = [
    {
      id: t('services.polishing.id'),
      title: t('services.polishing.title'),
      description: t('services.polishing.description'),
      image: '/images/carrosserie/polishing.jpg'
    },
    {
      id: t('services.ceramicCoating.id'),
      title: t('services.ceramicCoating.title'),
      description: t('services.ceramicCoating.description'),
      image: '/images/carrosserie/ceramic-coating.jpg'
    },
    {
      id: t('services.dentRepair.id'),
      title: t('services.dentRepair.title'),
      description: t('services.dentRepair.description'),
      image: '/images/carrosserie/dent-repair.jpg'
    },
    {
      id: t('services.headlightRestoration.id'),
      title: t('services.headlightRestoration.title'),
      description: t('services.headlightRestoration.description'),
      image: '/images/carrosserie/headlight-restoration.jpg'
    },
    {
      id: t('services.exteriorWash.id'),
      title: t('services.exteriorWash.title'),
      description: t('services.exteriorWash.description'),
      image: '/images/carrosserie/exterior-wash.jpg'
    },
    {
      id: t('services.interiorRestoration.id'),
      title: t('services.interiorRestoration.title'),
      description: t('services.interiorRestoration.description'),
      image: '/images/carrosserie/interior-restoration.jpg'
    },
  ];

  return (
    <div className="bg-white text-white w-full">
      {servicesCarrosserieEsthetique.map((service) => (
        <div key={service.id} className="h-auto w-full md:container grid grid-cols-1 md:grid-cols-2 mt-8 mb-8 justify-center items-center">
          <div className="w-full h-full">
            <Image
              src={service.image}
              alt={service.title}
              width={500}
              height={300}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-full h-full flex flex-col justify-center md:p-12 px-6 py-4 bg-gradient-to-bl from-black to-secondary">
            <h1 className='text-6xl md:text-8xl font-bold mb-5 opacity-30'>{service.id}</h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-4">{service.title}</h2>
            <p className="text-lg md:text-xl mb-4 font-light text-justify">{service.description}</p>
            <Link 
                href="/contact" 
                className="bg-primary block w-fit text-white px-4 py-2 my-4 rounded hover:bg-secondary transition-colors">
              NOUS CONTACTER
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AestheticsListing
