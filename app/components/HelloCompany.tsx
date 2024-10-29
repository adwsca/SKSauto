import companyInfo from '../../companyInfo.json';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const HelloCompany = () => {
  const company = companyInfo[0]; 
  const t = useTranslations('HelloCompany')
  return (
    <section className='w-full h-auto bg-gradient-to-b from-white to-ed text-dark-2 py-20'>
        <div className='container mx-auto flex flex-col lg:flex-row gap-12 lg:gap-10 justify-center items-start'>
            <div className='w-full h-auto flex flex-col gap-y-8 max-w-[600px]'>
            <Image
                width={889}
                height={500}
                src='/images/google-sks.jpg'
                alt={company.companyName}
                className=" w-full h-auto"
              />
              <Image
                width={889}
                height={500}
                src='/images/immatriculation.jpg'
                alt={company.companyName}
                className="w-full h-auto"
              />
            </div>
            
            <div className='w-full h-auto lg:text-left text-center'>
                <h2 className='md:text-4xl text-3xl lg:leading-[40px]'>{t("title")} <br/><span className='font-bold'>{t("titleSpan")}</span></h2>
                <div className='my-8 py-0.5 mx-auto lg:mx-0 bg-primary max-w-[100px]'></div>
                <p className='text-[20px] text-dark-2 font-light mb-2 text-justify'>{t("p1")}</p>
                <p className='text-[20px] text-dark-2 font-light mb-2 text-justify'>{t("p2")}</p>
                <p className='text-[20px] text-dark-2 font-light mb-2 text-justify'>{t("p3")}</p>
                <p className='text-[20px] text-dark-2 mb-5 text-justify font-bold'>{t("bold")}</p>
                <Image 
                  src='/images/google-banner-logo.png'
                  width={684}
                  height={109}
                  className='object-contain max-w-[600px] h-auto'
                  alt='logos partners'
                />
            </div>
        </div>
    </section>
  )
}

export default HelloCompany