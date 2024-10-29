'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react'
import companyInfo from '../../companyInfo.json';
import { useTranslations } from 'next-intl';

interface FormData {
  nom: string;
  prenom: string;
  dateNaissance: string;
  sin: string;
  etatCivil: string;
  faillite: string;
  dateSortie: string;
  telephone: string;
  telephoneAutre: string;
  email: string;
  permisConduire: string;
  dateExpiration: string;
  numeroRue: string;
  rue: string;
  appartement: string;
  ville: string;
  province: string;
  codePostal: string;
  residence: string;
  proprietaire: string;
  dureeOccupation: string;
  hypotheque: string;
  occupation: string;
  nomEmployeur: string;
  typeCommerce: string;
  telephoneEmployeur: string;
  dureeEmploi: string;
  revenuAnnuel: string;
  typeRemuneration: string;
  typeCorps: string[];
  groupeMotopropulseur: string[];
  typeCarburant: string[];
  marqueModele: string;
  preferenceCouleur: string;
  detailsSupplementaires: string;
  autorisation: boolean;
}

interface FormErrors {
  [key: string]: string;
}

const FinanceFormOnePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    dateNaissance: '',
    sin: '',
    etatCivil: '',
    faillite: 'Non',
    dateSortie: '',
    telephone: '',
    telephoneAutre: '',
    email: '',
    permisConduire: '',
    dateExpiration: '',
    numeroRue: '',
    rue: '',
    appartement: '',
    ville: '',
    province: '',
    codePostal: '',
    residence: '',
    proprietaire: '',
    dureeOccupation: '',
    hypotheque: '',
    occupation: '',
    nomEmployeur: '',
    typeCommerce: '',
    telephoneEmployeur: '',
    dureeEmploi: '',
    revenuAnnuel: '',
    typeRemuneration: '',
    typeCorps: [],
    groupeMotopropulseur: [],
    typeCarburant: [],
    marqueModele: '',
    preferenceCouleur: '',
    detailsSupplementaires: '',
    autorisation: false
  })

  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleArrayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: checked
        ? [...prevState[name as keyof FormData] as string[], value]
        : (prevState[name as keyof FormData] as string[]).filter(item => item !== value)
    }))
  }

  const validateForm = (): FormErrors => {
    let errors: FormErrors = {}
    if (!formData.nom) errors.nom = "Le nom est requis"
    if (!formData.prenom) errors.prenom = "Le prénom est requis"
    if (!formData.dateNaissance) errors.dateNaissance = "La date de naissance est requise"
    if (!formData.telephone) errors.telephone = "Le téléphone est requis"
    if (!formData.email) errors.email = "L'email est requis"
    if (!formData.numeroRue) errors.numeroRue = "Le numéro de rue est requis"
    if (!formData.rue) errors.rue = "La rue est requise"
    if (!formData.ville) errors.ville = "La ville est requise"
    if (!formData.province) errors.province = "La province est requise"
    if (!formData.codePostal) errors.codePostal = "Le code postal est requis"
    if (!formData.occupation) errors.occupation = "L'occupation est requise"
    if (!formData.nomEmployeur) errors.nomEmployeur = "Le nom de l'employeur est requis"
    if (!formData.revenuAnnuel) errors.revenuAnnuel = "Le revenu annuel est requis"
    if (!formData.autorisation) errors.autorisation = "L'autorisation est requise"
    return errors
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
    } else {
      console.log('Formulaire soumis:', formData)
      setFormData({
        nom: '',
        prenom: '',
        dateNaissance: '',
        sin: '',
        etatCivil: '',
        faillite: 'Non',
        dateSortie: '',
        telephone: '',
        telephoneAutre: '',
        email: '',
        permisConduire: '',
        dateExpiration: '',
        numeroRue: '',
        rue: '',
        appartement: '',
        ville: '',
        province: '',
        codePostal: '',
        residence: '',
        proprietaire: '',
        dureeOccupation: '',
        hypotheque: '',
        occupation: '',
        nomEmployeur: '',
        typeCommerce: '',
        telephoneEmployeur: '',
        dureeEmploi: '',
        revenuAnnuel: '',
        typeRemuneration: '',
        typeCorps: [],
        groupeMotopropulseur: [],
        typeCarburant: [],
        marqueModele: '',
        preferenceCouleur: '',
        detailsSupplementaires: '',
        autorisation: false
      })
      setErrors({})
      alert('Formulaire soumis avec succès!')
    }
  }

  const company = companyInfo[0];
  const t = useTranslations('FinanceFormOnePage');

  return (
    <div className="w-full h-auto container">
      <form onSubmit={handleSubmit}>
        {/* Informations sur le demandeur */}
        <section className="mb-8 mx-auto my-10 p-8 bg-white rounded-lg border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-secondary mb-4">{t("title-1")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="nom" className="block text-sm font-medium text-gray-700">{t("lname")}</label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.nom ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
            </div>
            <div>
              <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">{t("fname")}</label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.prenom ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.prenom && <p className="mt-1 text-sm text-red-500">{errors.prenom}</p>}
            </div>
            <div>
              <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700">{t("dateOfBirth")}</label>
              <input
                type="date"
                id="dateNaissance"
                name="dateNaissance"
                value={formData.dateNaissance}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.dateNaissance ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.dateNaissance && <p className="mt-1 text-sm text-red-500">{errors.dateNaissance}</p>}
            </div>
            <div>
              <label htmlFor="sin" className="block text-sm font-medium text-gray-700">{t("socialSecurityNumber")}</label>
              <input
                type="text"
                id="sin"
                name="sin"
                value={formData.sin}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
            <div>
              <label htmlFor="etatCivil" className="block text-sm font-medium text-gray-700">{t("maritalStatus")}</label>
              <select
                id="etatCivil"
                name="etatCivil"
                value={formData.etatCivil}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              >
                <option value="">{t("select")}</option>
                <option value="Célibataire">{t("single")}</option>
                <option value="Marié(e)">{t("married")}</option>
                <option value="Divorcé(e)">{t("divorced")}</option>
                <option value="Veuf/Veuve">{t("widowed")}</option>
              </select>
            </div>
            <div>
              <label htmlFor="faillite" className="block text-sm font-medium text-gray-700">{t("bankruptcy")}</label>
              <select
                id="faillite"
                name="faillite"
                value={formData.faillite}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              >
                <option value="Non">{t("no")}</option>
                <option value="Oui">{t("yes")}</option>
              </select>
            </div>
            {formData.faillite === 'Oui' && (
              <div>
                <label htmlFor="dateSortie" className="block text-sm font-medium text-gray-700">{t("dischargeDate")}</label>
                <input
                  type="date"
                  id="dateSortie"
                  name="dateSortie"
                  value={formData.dateSortie}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
                />
              </div>
            )}
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">{t("phone")}</label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.telephone ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.telephone && <p className="mt-1 text-sm text-red-500">{errors.telephone}</p>}
            </div>
            <div>
              <label htmlFor="telephoneAutre" className="block text-sm font-medium text-gray-700">{t("otherPhone")}</label>
              <input
                type="tel"
                id="telephoneAutre"
                name="telephoneAutre"
                value={formData.telephoneAutre}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t("email")}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.email ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="permisConduire" className="block text-sm font-medium text-gray-700">{t("driverLicenseNumber")}</label>
              <input
                type="text"
                id="permisConduire"
                name="permisConduire"
                value={formData.permisConduire}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
            <div>
              <label htmlFor="dateExpiration" className="block text-sm font-medium text-gray-700">{t("expirationDate")}</label>
              <input
                type="date"
                id="dateExpiration"
                name="dateExpiration"
                value={formData.dateExpiration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
          </div>
        </section>
        
        {/* Adresse actuelle */}
        <section className="mb-8 mx-auto my-10 p-8 bg-white rounded-lg border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-secondary mb-4">{t("title-2")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="numeroRue" className="block text-sm font-medium text-gray-700">{t("streetNumber")}</label>
              <input
                type="text"
                id="numeroRue"
                name="numeroRue"
                value={formData.numeroRue}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.numeroRue ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.numeroRue && <p className="mt-1 text-sm text-red-500">{errors.numeroRue}</p>}
            </div>
            <div>
              <label htmlFor="rue" className="block text-sm font-medium text-gray-700">{t("streetName")}</label>
              <input
                type="text"
                id="rue"
                name="rue"
                value={formData.rue}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.rue ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.rue && <p className="mt-1 text-sm text-red-500">{errors.rue}</p>}
            </div>
            <div>
              <label htmlFor="appartement" className="block text-sm font-medium text-gray-700">{t("apartment")}</label>
              <input
                type="text"
                id="appartement"
                name="appartement"
                value={formData.appartement}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
            <div>
                <label htmlFor="ville" className="block text-sm font-medium text-gray-700">{t("city")}</label>
              <input
                type="text"
                id="ville"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.ville ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.ville && <p className="mt-1 text-sm text-red-500">{errors.ville}</p>}
            </div>
            <div>
              <label htmlFor="province" className="block text-sm font-medium text-gray-700">{t("province")}</label>
              <input
                type="text"
                id="province"
                name="province"
                value={formData.province}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.province ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.province && <p className="mt-1 text-sm text-red-500">{errors.province}</p>}
            </div>
            <div>
              <label htmlFor="codePostal" className="block text-sm font-medium text-gray-700">{t("postalCode")}</label>
              <input
                type="text"
                id="codePostal"
                name="codePostal"
                value={formData.codePostal}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.codePostal ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.codePostal && <p className="mt-1 text-sm text-red-500">{errors.codePostal}</p>}
            </div>
          </div>
        </section>
        
        {/* Occupation actuelle */}
        <section className="mb-8 mx-auto my-10 p-8 bg-white rounded-lg border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-secondary mb-4">{t("title-3")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">{t("occupation")}</label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.occupation ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.occupation && <p className="mt-1 text-sm text-red-500">{errors.occupation}</p>}
            </div>
            <div>
              <label htmlFor="nomEmployeur" className="block text-sm font-medium text-gray-700">{t("employerName")}</label>
              <input
                type="text"
                id="nomEmployeur"
                name="nomEmployeur"
                value={formData.nomEmployeur}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.nomEmployeur ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.nomEmployeur && <p className="mt-1 text-sm text-red-500">{errors.nomEmployeur}</p>}
            </div>
            <div>
              <label htmlFor="typeCommerce" className="block text-sm font-medium text-gray-700">{t("businessType")}</label>
              <input
                type="text"
                id="typeCommerce"
                name="typeCommerce"
                value={formData.typeCommerce}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
            <div>
              <label htmlFor="telephoneEmployeur" className="block text-sm font-medium text-gray-700">{t("employerPhone")}</label>
              <input
                type="tel"
                id="telephoneEmployeur"
                name="telephoneEmployeur"
                value={formData.telephoneEmployeur}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
            <div>
              <label htmlFor="dureeEmploi" className="block text-sm font-medium text-gray-700">{t("employmentDuration")}</label>
              <input
                type="text"
                id="dureeEmploi"
                name="dureeEmploi"
                value={formData.dureeEmploi}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
            <div>
              <label htmlFor="revenuAnnuel" className="block text-sm font-medium text-gray-700">{t("annualIncome")}</label>
              <input
                type="text"
                id="revenuAnnuel"
                name="revenuAnnuel"
                value={formData.revenuAnnuel}
                onChange={handleChange}
                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 ${errors.revenuAnnuel ? 'border-red-500' : ''} text-dark-1`}
                required
              />
              {errors.revenuAnnuel && <p className="mt-1 text-sm text-red-500">{errors.revenuAnnuel}</p>}
            </div>
            <div>
              <label htmlFor="typeRemuneration" className="block text-sm font-medium text-gray-700">{t("typeRemuneration")}</label>
              <select
                id="typeRemuneration"
                name="typeRemuneration"
                value={formData.typeRemuneration}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              >
                <option value="">{t("select")}</option>
                <option value="Horaire">{t("hourly")}</option>
                <option value="Salaire">{t("salary")}</option>
                <option value="Commission">{t("commission")}</option>
                <option value="Autre">{t("other")}</option>
              </select>
            </div>
          </div>
        </section>
        
        {/* Véhicule d'intérêt */}
        <section className="mb-8 mx-auto my-10 p-8 bg-white rounded-lg border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-secondary mb-4">{t("title-4")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{t("bodyType")}</label>
              <div className="mt-2 space-y-2">
                {['Voiture', 'Camion', 'Convertible', 'Minifourgonnette', 'VUS'].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type.toLowerCase()}
                      name="typeCorps"
                      value={type}
                      checked={formData.typeCorps.includes(type)}
                      onChange={handleArrayChange}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor={type.toLowerCase()} className="ml-2 text-sm text-gray-700">{type}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t("engineGroup")}</label>
              <div className="mt-2 space-y-2">
                {['2 roues motrices', '4 roues motrices', 'Traction avant', 'Traction arrière'].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type.toLowerCase().replace(/\s+/g, '-')}
                      name="groupeMotopropulseur"
                      value={type}
                      checked={formData.groupeMotopropulseur.includes(type)}
                      onChange={handleArrayChange}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor={type.toLowerCase().replace(/\s+/g, '-')} className="ml-2 text-sm text-gray-700">{type}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">{t("fuelType")}</label>
              <div className="mt-2 space-y-2">
                {['Essence', 'Diesel', 'Électrique', 'Hybride'].map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type.toLowerCase()}
                      name="typeCarburant"
                      value={type}
                      checked={formData.typeCarburant.includes(type)}
                      onChange={handleArrayChange}
                      className="rounded text-primary focus:ring-primary"
                    />
                    <label htmlFor={type.toLowerCase()} className="ml-2 text-sm text-gray-700">{type}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="marqueModele" className="block text-sm font-medium text-gray-700">{t("brandModel")}</label>
              <input
                type="text"
                id="marqueModele"
                name="marqueModele"
                value={formData.marqueModele}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
            <div>
              <label htmlFor="preferenceCouleur" className="block text-sm font-medium text-gray-700">{t("colorPreference")}</label>
              <input
                type="text"
                id="preferenceCouleur"
                name="preferenceCouleur"
                value={formData.preferenceCouleur}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
              />
            </div>
          </div>
        </section>
        
        {/* Optimisez votre demande de crédit */}
        <section className="mb-8 mx-auto my-10 p-8 bg-white rounded-lg border-2 border-gray-200">
          <h2 className="text-2xl font-bold text-secondary mb-4">{t("title-5")}</h2>
          <p className="text-sm text-gray-600 mb-2">{t("moreDetails")}</p>
          <textarea
            name="detailsSupplementaires"
            value={formData.detailsSupplementaires}
            onChange={handleChange}
            className="w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 text-dark-1"
          />
        </section>
        
        {/* Autorisation */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="autorisation"
            name="autorisation"
            checked={formData.autorisation}
            onChange={handleChange}
            className={`rounded text-primary focus:ring-primary ${errors.autorisation ? 'border-red-500' : ''}`}
            required
          />
          <label htmlFor="autorisation" className="ml-2 text-sm text-gray-700">{t("authorization", { companyName: "Macdonalds Autosource" })}</label>
        </div>
        {errors.autorisation && <p className="mt-1 text-sm text-red-500">{errors.autorisation}</p>}
        
        {/* Bouton d'envoi */}
        <button 
            type="submit" 
            className="w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 hover:bg-dark-2 transition-all duration-200 ease-in-out mb-12">
          {t("send")}
        </button>
      </form>
    </div>
  )
}

export default FinanceFormOnePage
