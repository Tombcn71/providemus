"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  Check,
  Home,
  Building2,
  Zap,
  Settings,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const ProvidemusWebsite = () => {
  const [showScan, setShowScan] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Persoonlijke gegevens
    naam: "",
    email: "",
    telefoon: "",
    adres: "",
    typeKlant: "",

    // Step 2: Pandgegevens
    typeGebouw: "",
    bouwjaar: "",
    oppervlakte: "",
    aantalBouwlagen: "",

    // Step 3: Doelen
    doelen: [],

    // Step 4: Isolatie
    dakisolatie: "",
    muurisolatie: "",
    vloerisolatie: "",
    glas: "",

    // Step 5: Kozijnen & Installaties
    kozijnMateriaal: "",
    kozijnKlachten: [],
    verwarming: "",
    warmWater: "",
    ventilatie: "",
    elektraProblemen: "",

    // Step 6: Energie & Onderhoud
    zonnepanelen: "",
    aantalPanelen: "",
    interesseIn: [],
    dakStaat: "",
    gevelStaat: "",
    kozijnenStaat: "",
    binnenwerkStaat: "",

    // Step 7: Comfort & Subsidie
    comfortProblemen: [],
    subsidieInteresse: [],
    opmerkingen: "",
    akkoord: false,
  });

  const [contactFormData, setContactFormData] = useState({
    naam: "",
    email: "",
    bericht: "",
  });

  const handleContactSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "b055ebee-8555-4ba7-9245-c81ae1698e61",
        ...contactFormData,
      }),
    });
    alert("Bericht verzonden!");
    setContactFormData({ naam: "", email: "", bericht: "" });
  };

  const totalSteps = 7;

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleMultiSelect = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((item: any) => item !== value)
        : [...prev[field], value],
    }));
  };
  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bereid de data voor
    const submissionData = {
      access_key: "b055ebee-8555-4ba7-9245-c81ae1698e61", // Vervang dit met jouw Web3Forms access key
      subject: `Verduurzamingsscan aanvraag van ${formData.naam}`,
      from_name: "Providemus Website",
      ...formData,
      // Maak arrays leesbaar
      doelen: formData.doelen.join(", "),
      kozijnKlachten: formData.kozijnKlachten.join(", "),
      interesseIn: formData.interesseIn.join(", "),
      comfortProblemen: formData.comfortProblemen.join(", "),
      subsidieInteresse: formData.subsidieInteresse.join(", "),
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        alert(
          "✅ Bedankt voor uw aanvraag! We nemen binnen 24 uur contact met u op.",
        );
        // Reset form
        setShowScan(false);
        setCurrentStep(1);
        setFormData({
          naam: "",
          email: "",
          telefoon: "",
          adres: "",
          typeKlant: "",
          typeGebouw: "",
          bouwjaar: "",
          oppervlakte: "",
          aantalBouwlagen: "",
          doelen: [],
          dakisolatie: "",
          muurisolatie: "",
          vloerisolatie: "",
          glas: "",
          kozijnMateriaal: "",
          kozijnKlachten: [],
          verwarming: "",
          warmWater: "",
          ventilatie: "",
          elektraProblemen: "",
          zonnepanelen: "",
          aantalPanelen: "",
          interesseIn: [],
          dakStaat: "",
          gevelStaat: "",
          kozijnenStaat: "",
          binnenwerkStaat: "",
          comfortProblemen: [],
          subsidieInteresse: [],
          opmerkingen: "",
          akkoord: false,
        });
      } else {
        alert(
          "❌ Er ging iets mis. Probeer het opnieuw of neem direct contact op.",
        );
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "❌ Er ging iets mis met het versturen. Controleer je internetverbinding.",
      );
    }
  };

  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Onderhoud",
      description: "Reparaties, herstel, inspecties en planmatig onderhoud",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Renovatie",
      description: "Verbouwingen, schilrenovatie en complete woningverbetering",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Verduurzaming",
      description: "Isolatie, kozijnen, zonnepanelen, warmtepompen",
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: "Installatietechniek",
      description: "Verwarming, elektra, water, ventilatie en daktechniek",
    },
  ];

  if (showScan) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Providemus</h1>
            <button
              onClick={() => setShowScan(false)}
              className="text-sm text-gray-600 hover:text-gray-900">
              Terug naar homepage
            </button>
          </div>
        </header>

        {/* Scan Form */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Gratis verduurzamingsscan
            </h2>
            <p className="text-gray-600">
              Krijg inzicht in onderhoud, energie, isolatie en mogelijke
              verbeteringen van uw woning of bedrijfspand.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {[...Array(totalSteps)].map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      i + 1 < currentStep
                        ? "bg-blue-900 text-white"
                        : i + 1 === currentStep
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}>
                    {i + 1 < currentStep ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  {i < totalSteps - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${i + 1 < currentStep ? "bg-blue-900" : "bg-gray-200"}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-600 text-center mt-2">
              Stap {currentStep} van {totalSteps}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg border border-gray-200 p-8">
            {/* Step 1: Persoonlijke Gegevens */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Uw gegevens
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Naam *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.naam}
                    onChange={(e) => updateFormData("naam", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mailadres *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefoonnummer *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefoon}
                    onChange={(e) => updateFormData("telefoon", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adres van het pand *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.adres}
                    onChange={(e) => updateFormData("adres", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type klant *
                  </label>
                  <select
                    required
                    value={formData.typeKlant}
                    onChange={(e) =>
                      updateFormData("typeKlant", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="particulier">Particulier</option>
                    <option value="vve">VvE</option>
                    <option value="bedrijf">Bedrijf</option>
                    <option value="gemeente">Gemeente / organisatie</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Pandgegevens */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Gegevens van het pand
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type gebouw *
                  </label>
                  <select
                    required
                    value={formData.typeGebouw}
                    onChange={(e) =>
                      updateFormData("typeGebouw", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="appartement">Appartement</option>
                    <option value="eengezinswoning">Eengezinswoning</option>
                    <option value="twee-onder-een-kap">2-onder-1-kap</option>
                    <option value="vrijstaand">Vrijstaande woning</option>
                    <option value="bedrijfspand">Bedrijfspand</option>
                    <option value="anders">Anders</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bouwjaar (indien bekend)
                  </label>
                  <input
                    type="number"
                    value={formData.bouwjaar}
                    onChange={(e) => updateFormData("bouwjaar", e.target.value)}
                    placeholder="bijv. 1985"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Oppervlakte in m² (schatting mag)
                  </label>
                  <input
                    type="number"
                    value={formData.oppervlakte}
                    onChange={(e) =>
                      updateFormData("oppervlakte", e.target.value)
                    }
                    placeholder="bijv. 120"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aantal bouwlagen
                  </label>
                  <input
                    type="number"
                    value={formData.aantalBouwlagen}
                    onChange={(e) =>
                      updateFormData("aantalBouwlagen", e.target.value)
                    }
                    placeholder="bijv. 2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Doelen */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Doel van de scan
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Meerdere keuzes mogelijk
                </p>

                {[
                  "Lagere energiekosten",
                  "Verbeteren van comfort",
                  "Verduurzamen",
                  "Renoveren",
                  "Installaties vernieuwen (CV, warmtepomp, ventilatie, elektra)",
                  "Onderhoud (dak, gevel, kozijnen)",
                  "Subsidiemogelijkheden",
                  "Waardeverhoging woning/pand",
                  "Alles hierboven",
                ].map((doel) => (
                  <label
                    key={doel}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.doelen.includes(doel)}
                      onChange={() => toggleMultiSelect("doelen", doel)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                    />
                    <span className="text-gray-700">{doel}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Step 4: Isolatie & Buitenwerk */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Isolatie & Buitenwerk
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dakisolatie
                  </label>
                  <select
                    value={formData.dakisolatie}
                    onChange={(e) =>
                      updateFormData("dakisolatie", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="ja">Ja</option>
                    <option value="nee">Nee</option>
                    <option value="onbekend">Onbekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Muur/spouwmuurisolatie
                  </label>
                  <select
                    value={formData.muurisolatie}
                    onChange={(e) =>
                      updateFormData("muurisolatie", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="ja">Ja</option>
                    <option value="nee">Nee</option>
                    <option value="onbekend">Onbekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vloerisolatie
                  </label>
                  <select
                    value={formData.vloerisolatie}
                    onChange={(e) =>
                      updateFormData("vloerisolatie", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="ja">Ja</option>
                    <option value="nee">Nee</option>
                    <option value="onbekend">Onbekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beglazing
                  </label>
                  <select
                    value={formData.glas}
                    onChange={(e) => updateFormData("glas", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="enkel">Enkel glas</option>
                    <option value="dubbel">Dubbel glas</option>
                    <option value="hr++">HR++ glas</option>
                    <option value="triple">Triple glas</option>
                    <option value="onbekend">Onbekend</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 5: Kozijnen & Installaties */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Kozijnen & Installaties
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Materiaal kozijnen
                  </label>
                  <select
                    value={formData.kozijnMateriaal}
                    onChange={(e) =>
                      updateFormData("kozijnMateriaal", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="hout">Hout</option>
                    <option value="kunststof">Kunststof</option>
                    <option value="aluminium">Aluminium</option>
                    <option value="gemengd">Gemengd</option>
                    <option value="onbekend">Onbekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Klachten kozijnen (meerdere mogelijk)
                  </label>
                  {[
                    "Tocht",
                    "Slecht sluitend",
                    "Geluidsoverlast",
                    "Houtrot (bij houten kozijnen)",
                    "Geen klachten",
                  ].map((klacht) => (
                    <label
                      key={klacht}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.kozijnKlachten.includes(klacht)}
                        onChange={() =>
                          toggleMultiSelect("kozijnKlachten", klacht)
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-gray-700 text-sm">{klacht}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verwarming
                  </label>
                  <select
                    value={formData.verwarming}
                    onChange={(e) =>
                      updateFormData("verwarming", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="cv-oud">CV-ketel (ouder dan 10 jaar)</option>
                    <option value="cv-nieuw">
                      CV-ketel (jonger dan 10 jaar)
                    </option>
                    <option value="hybride">Hybride warmtepomp</option>
                    <option value="all-electric">
                      All-electric warmtepomp
                    </option>
                    <option value="stadsverwarming">Stadsverwarming</option>
                    <option value="onbekend">Onbekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ventilatie
                  </label>
                  <select
                    value={formData.ventilatie}
                    onChange={(e) =>
                      updateFormData("ventilatie", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="natuurlijk">
                      Natuurlijke ventilatie (ramen)
                    </option>
                    <option value="mechanisch">Mechanische ventilatie</option>
                    <option value="wtw">WTW-installatie</option>
                    <option value="onbekend">Onbekend</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Elektra problemen of wensen
                  </label>
                  <textarea
                    value={formData.elektraProblemen}
                    onChange={(e) =>
                      updateFormData("elektraProblemen", e.target.value)
                    }
                    placeholder="Denk aan: extra groepen, verouderde bedrading, uitbreiden voor warmtepomp/zonnepanelen"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Step 6: Energie & Onderhoud */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Energie & Onderhoudsstaat
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zonnepanelen
                  </label>
                  <select
                    value={formData.zonnepanelen}
                    onChange={(e) =>
                      updateFormData("zonnepanelen", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                    <option value="">Selecteer...</option>
                    <option value="ja">Ja</option>
                    <option value="nee">Nee</option>
                    <option value="geinteresseerd">Geïnteresseerd</option>
                  </select>
                </div>

                {formData.zonnepanelen === "ja" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aantal panelen
                    </label>
                    <input
                      type="number"
                      value={formData.aantalPanelen}
                      onChange={(e) =>
                        updateFormData("aantalPanelen", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Geïnteresseerd in (meerdere mogelijk)
                  </label>
                  {[
                    "Zonnepanelen",
                    "Thuisaccu (batterij)",
                    "Warmtepomp (hybride/all-electric)",
                    "Laadpaal",
                  ].map((interesse) => (
                    <label
                      key={interesse}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.interesseIn.includes(interesse)}
                        onChange={() =>
                          toggleMultiSelect("interesseIn", interesse)
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-gray-700 text-sm">{interesse}</span>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Staat dak
                    </label>
                    <select
                      value={formData.dakStaat}
                      onChange={(e) =>
                        updateFormData("dakStaat", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="">Selecteer...</option>
                      <option value="goed">Goed</option>
                      <option value="matig">Matig</option>
                      <option value="slecht">Slecht</option>
                      <option value="onbekend">Onbekend</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Staat gevel
                    </label>
                    <select
                      value={formData.gevelStaat}
                      onChange={(e) =>
                        updateFormData("gevelStaat", e.target.value)
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
                      <option value="">Selecteer...</option>
                      <option value="goed">Goed</option>
                      <option value="matig">Matig</option>
                      <option value="slecht">Slecht</option>
                      <option value="onbekend">Onbekend</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Comfort & Subsidie */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Comfort & Subsidie
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comfortproblemen (meerdere mogelijk)
                  </label>
                  {[
                    "Tocht",
                    "Koude plekken in huis",
                    "Warme ruimtes in de zomer",
                    "Schimmelplekken",
                    "Vochtproblemen",
                    "Slechte ventilatie",
                    "Geluidsoverlast",
                    "Geen klachten",
                  ].map((probleem) => (
                    <label
                      key={probleem}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.comfortProblemen.includes(probleem)}
                        onChange={() =>
                          toggleMultiSelect("comfortProblemen", probleem)
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-gray-700 text-sm">{probleem}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subsidie-interesse (meerdere mogelijk)
                  </label>
                  {[
                    "ISDE-subsidie",
                    "Warmtefonds lening (lage rente)",
                    "Zakelijke subsidies (EIA/MIA/VAMIL)",
                    "Btw-teruggave zonnepanelen",
                    "Gemeentelijke regelingen",
                    "Advies over terugverdientijden",
                    "Alles hierboven",
                  ].map((subsidie) => (
                    <label
                      key={subsidie}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.subsidieInteresse.includes(subsidie)}
                        onChange={() =>
                          toggleMultiSelect("subsidieInteresse", subsidie)
                        }
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-gray-700 text-sm">{subsidie}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Overige wensen of opmerkingen
                  </label>
                  <textarea
                    value={formData.opmerkingen}
                    onChange={(e) =>
                      updateFormData("opmerkingen", e.target.value)
                    }
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.akkoord}
                      onChange={(e) =>
                        updateFormData("akkoord", e.target.checked)
                      }
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-600 mt-1"
                    />
                    <span className="text-sm text-gray-700">
                      Ik ga akkoord dat Providemus contact met mij opneemt voor
                      een vrijblijvend adviesrapport. *
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Vorige
                </button>
              )}

              <div className={currentStep === 1 ? "ml-auto" : ""}>
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    Volgende
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                    Verstuur aanvraag
                    <Check className="w-5 h-5 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Home className="w-8 h-8 text-blue-900" />
            <h1 className="text-2xl font-bold text-gray-900">Providemus</h1>
          </div>{" "}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#diensten"
              className="text-gray-600 hover:text-blue-900 transition-colors">
              Diensten
            </a>
            <a
              href="#over"
              className="text-gray-600 hover:text-blue-900 transition-colors">
              Over ons
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-blue-900 transition-colors">
              Contact
            </a>
          </nav>
          <button
            onClick={() => setShowScan(true)}
            className="px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
            Gratis scan
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-blue-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold mb-6">
                Bouw, onderhoud en verduurzaming
              </h2>
              <p className="text-2xl mb-4 text-gray-200">
                Professioneel uitgevoerd, helder geregeld.
              </p>
              <p className="text-lg mb-8 text-gray-300">
                Providemus helpt particuliere en zakelijke opdrachtgevers met
                onderhoud, renovatie, verduurzaming en installatietechniek. Wij
                combineren vakmanschap met moderne oplossingen en leveren
                kwaliteit zonder verrassingen.
              </p>
              <button
                onClick={() => setShowScan(true)}
                className="flex items-center px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-500 transition-colors shadow-xl">
                Start uw verduurzamingsscan
                <ChevronRight className="w-6 h-6 ml-2" />
              </button>
            </div>

            {/* House Illustration */}
            <div className="relative">
              <svg
                viewBox="0 0 400 400"
                className="w-full max-w-md mx-auto drop-shadow-2xl">
                {/* Solar panels on roof */}
                <rect
                  x="80"
                  y="100"
                  width="50"
                  height="30"
                  fill="#1e3a8a"
                  opacity="0.9"
                />
                <rect
                  x="135"
                  y="100"
                  width="50"
                  height="30"
                  fill="#1e40af"
                  opacity="0.9"
                />
                <rect
                  x="190"
                  y="100"
                  width="50"
                  height="30"
                  fill="#1e3a8a"
                  opacity="0.9"
                />
                <line
                  x1="80"
                  y1="115"
                  x2="130"
                  y2="115"
                  stroke="#60a5fa"
                  strokeWidth="2"
                />
                <line
                  x1="135"
                  y1="115"
                  x2="185"
                  y2="115"
                  stroke="#60a5fa"
                  strokeWidth="2"
                />
                <line
                  x1="190"
                  y1="115"
                  x2="240"
                  y2="115"
                  stroke="#60a5fa"
                  strokeWidth="2"
                />
                <line
                  x1="105"
                  y1="100"
                  x2="105"
                  y2="130"
                  stroke="#60a5fa"
                  strokeWidth="1"
                />
                <line
                  x1="160"
                  y1="100"
                  x2="160"
                  y2="130"
                  stroke="#60a5fa"
                  strokeWidth="1"
                />
                <line
                  x1="215"
                  y1="100"
                  x2="215"
                  y2="130"
                  stroke="#60a5fa"
                  strokeWidth="1"
                />

                {/* Roof */}
                <polygon
                  points="60,150 200,70 340,150"
                  fill="#475569"
                  stroke="#1e293b"
                  strokeWidth="4"
                />

                {/* Chimney */}
                <rect
                  x="250"
                  y="90"
                  width="30"
                  height="60"
                  fill="#64748b"
                  stroke="#1e293b"
                  strokeWidth="2"
                />

                {/* House body */}
                <rect
                  x="90"
                  y="150"
                  width="220"
                  height="200"
                  fill="#f1f5f9"
                  stroke="#1e293b"
                  strokeWidth="4"
                />

                {/* Windows - top row */}
                <rect
                  x="120"
                  y="180"
                  width="50"
                  height="60"
                  fill="#dbeafe"
                  stroke="#1e293b"
                  strokeWidth="3"
                />
                <line
                  x1="145"
                  y1="180"
                  x2="145"
                  y2="240"
                  stroke="#1e293b"
                  strokeWidth="3"
                />
                <line
                  x1="120"
                  y1="210"
                  x2="170"
                  y2="210"
                  stroke="#1e293b"
                  strokeWidth="3"
                />

                <rect
                  x="230"
                  y="180"
                  width="50"
                  height="60"
                  fill="#dbeafe"
                  stroke="#1e293b"
                  strokeWidth="3"
                />
                <line
                  x1="255"
                  y1="180"
                  x2="255"
                  y2="240"
                  stroke="#1e293b"
                  strokeWidth="3"
                />
                <line
                  x1="230"
                  y1="210"
                  x2="280"
                  y2="210"
                  stroke="#1e293b"
                  strokeWidth="3"
                />

                {/* Door */}
                <rect
                  x="165"
                  y="270"
                  width="70"
                  height="80"
                  fill="#2563eb"
                  stroke="#1e293b"
                  strokeWidth="3"
                  rx="4"
                />
                <circle cx="220" cy="310" r="4" fill="#fbbf24" />
                <rect x="172" y="277" width="56" height="3" fill="#1e40af" />

                {/* Window above door */}
                <rect
                  x="180"
                  y="285"
                  width="40"
                  height="25"
                  fill="#dbeafe"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                <line
                  x1="200"
                  y1="285"
                  x2="200"
                  y2="310"
                  stroke="#1e293b"
                  strokeWidth="2"
                />

                {/* Heat pump unit */}
                <rect
                  x="280"
                  y="290"
                  width="40"
                  height="45"
                  fill="#64748b"
                  stroke="#1e293b"
                  strokeWidth="3"
                  rx="3"
                />
                <circle
                  cx="300"
                  cy="310"
                  r="10"
                  fill="#374151"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                <rect x="285" y="320" width="30" height="2" fill="#1e293b" />
                <rect x="285" y="325" width="30" height="2" fill="#1e293b" />
                <rect x="285" y="330" width="30" height="2" fill="#1e293b" />

                {/* Energy efficiency symbol */}
                <circle cx="330" cy="200" r="28" fill="#10b981" />
                <text
                  x="330"
                  y="212"
                  textAnchor="middle"
                  fill="white"
                  fontSize="24"
                  fontWeight="bold">
                  A
                </text>

                {/* Ground/grass */}
                <ellipse
                  cx="200"
                  cy="360"
                  rx="180"
                  ry="30"
                  fill="#22c55e"
                  opacity="0.8"
                />
                <ellipse
                  cx="200"
                  cy="355"
                  rx="190"
                  ry="25"
                  fill="#86efac"
                  opacity="0.6"
                />

                {/* Bush decorations */}
                <circle cx="70" cy="340" r="22" fill="#16a34a" opacity="0.8" />
                <circle cx="85" cy="345" r="18" fill="#22c55e" opacity="0.7" />
                <circle cx="330" cy="340" r="22" fill="#16a34a" opacity="0.8" />
                <circle cx="350" cy="345" r="18" fill="#22c55e" opacity="0.7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="diensten" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Onze diensten
            </h2>
            <p className="text-xl text-gray-600">
              Eén team. Eén aanspreekpunt. Eén duidelijke planning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border border-gray-200 hover:border-blue-900 hover:shadow-lg transition-all">
                <div className="text-blue-900 mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scan CTA Section */}
      <section
        className="relative py-20 bg-blue-900 text-white w-full block"
        style={{ backgroundColor: "#1e3a8a", display: "block", clear: "both" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-4xl font-bold mb-6 text-white"
            style={{ color: "white" }}>
            Gratis verduurzamingsscan
          </h2>
          <p className="text-xl mb-4 text-white" style={{ color: "white" }}>
            Inzicht in onderhoud, energie en technische staat van uw woning of
            pand.
          </p>
          <p
            className="text-lg mb-8 text-blue-100"
            style={{ color: "#dbeafe" }}>
            Met de gratis verduurzamingsscan van Providemus krijgt u een helder
            en onafhankelijk overzicht van mogelijke energiebesparingen,
            isolatie- en kozijnverbeteringen, staat van dak, gevel en
            installaties, en relevante subsidies en regelingen.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-left">
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <h4
                className="font-semibold mb-2 text-white"
                style={{ color: "white" }}>
                Bouwkundige staat
              </h4>
              <p className="text-sm text-blue-100">
                Dak, gevel, kozijnen, vocht en ventilatie
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <h4
                className="font-semibold mb-2 text-white"
                style={{ color: "white" }}>
                Energie & verduurzaming
              </h4>
              <p className="text-sm text-blue-100">
                Isolatie, glas, warmtepomp, zonnepanelen
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <h4
                className="font-semibold mb-2 text-white"
                style={{ color: "white" }}>
                Installatietechniek
              </h4>
              <p className="text-sm text-blue-100">
                Verwarming, elektra, water en afvoer
              </p>
            </div>
            <div className="bg-white/10 p-6 rounded-lg border border-white/20">
              <h4
                className="font-semibold mb-2 text-white"
                style={{ color: "white" }}>
                Financieel overzicht
              </h4>
              <p className="text-sm text-blue-100">
                Investeringen, terugverdientijden, subsidies
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowScan(true)}
            className="px-8 py-4 bg-white text-blue-900 text-lg font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg"
            style={{ backgroundColor: "white", color: "#1e3a8a" }}>
            Start mijn verduurzamingsscan
          </button>
          <p
            className="text-sm mt-4 text-blue-200"
            style={{ color: "#93c5fd" }}>
            Kosteloos en vrijblijvend
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="over" className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Wie wij zijn
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-6">
              Providemus is een bouw- en verduurzamingsbedrijf met een brede
              technische en bouwkundige achtergrond. Wij werken voor
              particulieren, VvE's, bedrijven en gemeenten en leveren een
              compleet pakket aan diensten onder één organisatie.
            </p>
            <p className="mb-6">
              Onze kracht zit in vakmanschap, goede communicatie, strakke
              organisatie en betrouwbaar advies. Geen poespas. Gewoon goed werk.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mt-10 mb-6">
              Onze aanpak
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-l-4 border-blue-900 pl-6">
                <h4 className="font-bold text-lg mb-2">
                  1. Inventarisatie & advies
                </h4>
                <p className="text-gray-600">
                  We beginnen altijd met een duidelijke opname: bouwkundig,
                  technisch of energetisch.
                </p>
              </div>
              <div className="border-l-4 border-blue-900 pl-6">
                <h4 className="font-bold text-lg mb-2">
                  2. Heldere planning & offerte
                </h4>
                <p className="text-gray-600">
                  Geen vage omschrijvingen, maar concreet wat we doen, hoe lang
                  het duurt en wat het kost.
                </p>
              </div>
              <div className="border-l-4 border-blue-900 pl-6">
                <h4 className="font-bold text-lg mb-2">
                  3. Uitvoering met vaste vakmensen
                </h4>
                <p className="text-gray-600">
                  Korte lijnen, duidelijke afspraken en een nette werkplek.
                </p>
              </div>
              <div className="border-l-4 border-blue-900 pl-6">
                <h4 className="font-bold text-lg mb-2">
                  4. Oplevering & nazorg
                </h4>
                <p className="text-gray-600">
                  Wij blijven aanspreekbaar, ook na de afronding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Neem contact op
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Providemus
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-900 mt-1" />
                  <div>
                    <p className="font-semibold">Adres</p>
                    <p className="text-gray-600">Jachthuislaan 57, Soest</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-900 mt-1" />
                  <div>
                    <p className="font-semibold">E-mail</p>
                    <a
                      href="mailto:info@providemus.nl"
                      className="text-blue-900 hover:underline">
                      info@providemus.nl
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-blue-900 mt-1" />
                  <div>
                    <p className="font-semibold">Telefoon</p>
                    <p className="text-gray-600">Beschikbaar op aanvraag</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* onSubmit toegevoegd */}
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Naam
                  </label>
                  <input
                    type="text"
                    required
                    value={contactFormData.naam}
                    onChange={(e) =>
                      setContactFormData({
                        ...contactFormData,
                        naam: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={contactFormData.email}
                    onChange={(e) =>
                      setContactFormData({
                        ...contactFormData,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bericht
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={contactFormData.bericht}
                    onChange={(e) =>
                      setContactFormData({
                        ...contactFormData,
                        bericht: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  Verstuur bericht
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2026 Providemus. We zeggen wat we doen, en we doen wat we zeggen.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ProvidemusWebsite;
