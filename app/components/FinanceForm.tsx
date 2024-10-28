'use client'
import React, { useEffect, useCallback } from 'react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FaUndo } from 'react-icons/fa';

const FinanceForm = () => {
    const t = useTranslations('FinanceForm');
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Record<string, string>>({
        vehicleType: '',
        salary: '',
        budget: '',
        work: '',
        credit: '',
        firstName: '',
        lastName: '',
        phone: '',
        email: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const isStepComplete = useCallback(() => {
        switch(currentStep) {
            case 1:
                return formData.vehicleType !== '';
            case 2:
                return formData.salary !== '' && formData.budget !== '' && formData.work !== '' && formData.credit !== '';
            case 3:
                return formData.firstName !== '' && formData.lastName !== '' && formData.phone !== '' && formData.email !== '';
            default:
                return false;
        }
    }, [currentStep, formData]);

    useEffect(() => {
        if (isStepComplete() && currentStep < 3) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    }, [isStepComplete, currentStep]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isStepComplete()) {
            // Traitement du formulaire ici
            console.log(formData);
        }
    };

    const resetForm = () => {
        setCurrentStep(1);
        setFormData({
            vehicleType: '',
            salary: '',
            budget: '',
            work: '',
            credit: '',
            firstName: '',
            lastName: '',
            phone: '',
            email: ''
        });
    };

    return (
        <div className="container rounded-xl mx-auto text-center text-dark-3 mb-24">
            <div className="px-5 w-full h-auto">
                <div className='mt-20'>
                    {/* Barre de progression avec classes Tailwind */}
                    <div className="relative mb-8">
                        <div className="absolute top-5 left-16 right-10 h-0.5 bg-gray-200">
                            <div 
                                className="h-full bg-primary transition-all duration-300 ease-in-out"
                                style={{ width: `${(currentStep - 1) * 50}%` }}
                            ></div>
                        </div>
                        <ul className="flex justify-between items-center relative z-10">
                            {[1, 2, 3].map((step) => (
                                <li key={step} className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                        currentStep >= step 
                                            ? 'bg-primary text-white' 
                                            : 'bg-gray-200 text-gray-500'
                                    }`}>
                                        {step}
                                    </div>
                                    <span className={`mt-2 text-sm ${
                                        currentStep >= step ? 'text-primary font-medium' : 'text-gray-500'
                                    }`}>
                                        {t(`step${step}`)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <form id="finance-form" name="finance-form" encType="multipart/form-data" onSubmit={handleSubmit}>
                        {currentStep === 1 && (
                            <div id="step-1" className="mt-6">
                                <h2 className="font-bold text-3xl uppercase mt-6">{t("choiceTitle")}</h2>
                                <div className="mt-12">
                                    <div className="w-full flex flex-wrap justify-center items-center">
                                        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-6">
                                            {['coupe', 'hatchback', 'sedan', 'vus', 'convertible', 'station-wagon', 'pickup', 'van'].map((type) => (
                                                <React.Fragment key={type}>
                                                    <input 
                                                        type="radio" 
                                                        id={type} 
                                                        name="vehicleType" 
                                                        value={type}
                                                        className="hidden" 
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    <label 
                                                        htmlFor={type} 
                                                        className={`w-full h-[180px] bg-transparent rounded-lg cursor-pointer text-lg uppercase p-4 transition-all duration-200 ease-in-out text-left mx-auto opacity-50 hover:opacity-80 bg-contain bg-bottom bg-no-repeat ${formData.vehicleType === type ? 'bg-f7 opacity-100' : ''}`}
                                                        style={{backgroundImage: `url('/images/minicars/car-${type}.png')`}}
                                                    >
                                                        {t(type)}
                                                    </label>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div id="step-2" className="form-step mt-6">
                                <h2 className="font-bold text-3xl uppercase mt-6">{t("talkTitle")}</h2>
                                <div className="mt-8">
                                    <div className="w-full h-auto flex flex-row flex-wrap justify-center items-center">
                                        <div className="question">
                                            <label htmlFor="salary">{t("salary")}</label>
                                            <div className="choices">
                                                {["salaryChoice1", "salaryChoice2", "salaryChoice3", "salaryChoice4"].map((choiceKey, index) => (
                                                    <React.Fragment key={choiceKey}>
                                                        <input 
                                                            type="radio" 
                                                            id={`salary${index + 1}`} 
                                                            name="salary" 
                                                            value={t(choiceKey)} 
                                                            className="hidden"
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <label htmlFor={`salary${index + 1}`}>{t(choiceKey)}</label>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="question">
                                            <label htmlFor="budget">{t("budget")}</label>
                                            <div className="choices">
                                                {["budgetChoice1", "budgetChoice2", "budgetChoice3"].map((choiceKey, index) => (
                                                    <React.Fragment key={choiceKey}>
                                                        <input 
                                                            type="radio" 
                                                            id={`budget${index + 1}`} 
                                                            name="budget" 
                                                            value={t(choiceKey)} 
                                                            className="hidden"
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <label htmlFor={`budget${index + 1}`}>{t(choiceKey)}</label>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="question">
                                            <label htmlFor="work">{t("work")}</label>
                                            <div className="choices">
                                                {["workChoice1", "workChoice2", "workChoice3", "workChoice4", "workChoice5"].map((choiceKey, index) => (
                                                    <React.Fragment key={choiceKey}>
                                                        <input 
                                                            type="radio" 
                                                            id={`work${index + 1}`} 
                                                            name="work" 
                                                            value={t(choiceKey)} 
                                                            className="hidden"
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <label htmlFor={`work${index + 1}`}>{t(choiceKey)}</label>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="question">
                                            <label htmlFor="credit">{t("credit")}</label>
                                            <div className="choices">
                                                {["creditChoice1", "creditChoice2", "creditChoice3", "creditChoice4", "creditChoice5"].map((choiceKey, index) => (
                                                    <React.Fragment key={choiceKey}>
                                                        <input 
                                                            type="radio" 
                                                            id={`credit${index + 1}`} 
                                                            name="credit" 
                                                            value={t(choiceKey)} 
                                                            className="hidden"
                                                            onChange={handleInputChange}
                                                            required
                                                        />
                                                        <label htmlFor={`credit${index + 1}`}>{t(choiceKey)}</label>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div id="step-3" className="form-step mt-6">
                                <h2 className="font-bold text-3xl uppercase mt-6">{t("infoTitle")}</h2>
                                <div className="mt-6 ">
                                    <div className="w-full mx-auto bg-f7 h-auto flex flex-col justify-center items-center flex-wrap gap-6 py-8 rounded-xl">
                                        {['firstName', 'lastName', 'phone', 'email'].map((field) => (
                                            <div key={field} className="w-full h-auto flex flex-col items-center justify-center rounded-full gap-2">
                                                <label htmlFor={field}>{t(field)} *</label>
                                                <input 
                                                    type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'} 
                                                    id={field} 
                                                    name={field} 
                                                    className='w-full max-w-[350px] rounded-lg border-[#ccc] focus:ring-primary focus:ring-2 focus:outline-none focus:border-transparent' 
                                                    required 
                                                    onChange={handleInputChange}
                                                    value={formData[field]}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6 flex flex-col items-center justify-center gap-4">
                                    <button type="submit" className="py-4 px-8 bg-primary hover:bg-secondary transition-all duration-200 ease-in-out rounded-lg text-white md:w-[350px] w-full h-auto text-xl font-semibold">
                                        {t("submit")}
                                    </button>
                                    <button type="button" onClick={resetForm} className="transition-all duration-200 ease-in-out rounded-lg text-dark-3 hover:text-primary w-fit h-auto text-xl font-semibold flex items-center justify-center">
                                        <FaUndo className="mr-2" /> {t("reset")}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FinanceForm
