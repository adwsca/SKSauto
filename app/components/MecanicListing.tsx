import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl';

const MecanicListing = () => {
  const t = useTranslations('Mecanic');
  const services = [
    {
      id: t('services.oilChange.id'),
      title: t('services.oilChange.title'),
      description: t('services.oilChange.description'),
      image: '/images/mecanic/oil-change.jpg'
    },
    {
      id: t('services.tireInstallation.id'),
      title: t('services.tireInstallation.title'),
      description: t('services.tireInstallation.description'),
      image: '/images/mecanic/tire-installation.jpg'
    },
    {
      id: t('services.batteryReplacement.id'),
      title: t('services.batteryReplacement.title'),
      description: t('services.batteryReplacement.description'),
      image: '/images/mecanic/battery-replacement.jpg'
    },
    {
      id: t('services.steeringSuspension.id'),
      title: t('services.steeringSuspension.title'),
      description: t('services.steeringSuspension.description'),
      image: '/images/mecanic/steering-suspension.jpg'
    },
    {
      id: t('services.brakes.id'),
      title: t('services.brakes.title'),
      description: t('services.brakes.description'),
      image: '/images/mecanic/brakes.jpg'
    },
    {
      id: t('services.vehicleInspection.id'),
      title: t('services.vehicleInspection.title'),
      description: t('services.vehicleInspection.description'),
      image: '/images/mecanic/vehicle-inspection.jpg'
    },
  ];
  return (
    <div className="bg-white text-white w-full">
      {services.map((service) => (
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
            <h1 className='text-6xl md:text-8xl font-bold mb-5 opacity-20'>{service.id}</h1>
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

export default MecanicListing
