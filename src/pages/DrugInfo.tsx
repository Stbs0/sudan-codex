import { getDrugInfo } from "@/services/drugServices";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const DrugInfo = () => {
  const { state: drug } = useLocation();
  console.log(drug);
  const { data, isLoading } = useQuery({
    queryKey: [
      "drugInfo",
      drug.genericName,
      drug.dosageFormName,
      drug.strength,
    ],
    queryFn: async () => {
      return await getDrugInfo(
        drug.genericName,
        drug.dosageFormName,
        drug.strength
      );
    },
  });
  // useEffect(() => {
  //   console.log(
  //     drug.brandName,
  //     drug.genericName,
  //     drug.dosageFormName,
  //     drug.strength
  //   );
  //   const url = getOpenFdaSearchUrl(
  //     drug.genericName,
  //     drug.dosageForm,
  //     drug.strength
  //   );
  //   api.get(url).then((res) => {
  //     console.log(res.data.results);
  //     setData(res.data.results[0]);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  if (isLoading || !data) return <div>Loading...</div>;
  console.log(data);
  return (
    <div className='p-6 max-w-4xl mx-auto font-sans'>
      <h1 className='text-4xl font-bold text-gray-800 mb-8'>
        Drug Information
      </h1>
      <h2 className='text-4xl font-bold text-gray-800 mb-8'>
        {drug.brandName} / {drug.genericName}/ {drug.dosageFormName}
      </h2>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Indications and Usage
        </h2>
        {data.indications_and_usage &&
          data.indications_and_usage.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Dosage and Administration
        </h2>
        {data.dosage_and_administration &&
          data.dosage_and_administration.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
        {data.dosage_and_administration_table &&
          data.dosage_and_administration_table.map((html, index) => (
            <div
              key={index}
              className='mt-4 overflow-x-auto'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Dosage Forms and Strengths
        </h2>
        {data.dosage_forms_and_strengths &&
          data.dosage_forms_and_strengths.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Contraindications
        </h2>
        {data.contraindications &&
          data.contraindications.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Warnings and Cautions
        </h2>
        {data.warnings_and_cautions &&
          data.warnings_and_cautions.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Adverse Reactions
        </h2>
        {data.adverse_reactions &&
          data.adverse_reactions.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
        {data.adverse_reactions_table &&
          data.adverse_reactions_table.map((html, index) => (
            <div
              key={index}
              className='mt-4 overflow-x-auto'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Drug Interactions
        </h2>
        {data.drug_interactions &&
          data.drug_interactions.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
      </section>

      <section className='mb-8'>
        <h2 className='text-2xl font-semibold text-gray-700 mb-4'>
          Use in Specific Populations
        </h2>
        {data.use_in_specific_populations &&
          data.use_in_specific_populations.map((text, index) => (
            <p
              key={index}
              className='text-gray-600 mb-2'>
              {text}
            </p>
          ))}
        {data.use_in_specific_populations_table &&
          data.use_in_specific_populations_table.map((html, index) => (
            <div
              key={index}
              className='mt-4 overflow-x-auto'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ))}
      </section>
    </div>
  );
};

export default DrugInfo;
// [
//   {
//     spl_product_data_elements: [
//     ],
//     indications_and_usage: [""],
//     dosage_and_administration: [""],
//     dosage_and_administration_table: [
//       '<table width="100%" styleCode="Noautorules"><col width="15.000%" align="left"/><col width="85.000%" align="left"/><tbody><tr><td rowspan="2" align="left" valign="middle">Bolus Volume (mL) = </td><td align="justify" valign="top"><content styleCode="underline"> 25 mcg/kg X body weight (kg) </content></td></tr><tr><td align="left" valign="top"> 50 mcg/mL </td></tr></tbody></table>',
//       '<table width="100%" styleCode="Noautorules"><col width="25.000%" align="left"/><col width="75.000%" align="left"/><tbody><tr><td rowspan="2" align="left" valign="middle">Infusion Rate for CrCl &gt; 60 mL/min (mL/h) = </td><td align="left" valign="top"><content styleCode="underline"> 0.15 mcg/kg/min x body weight (kg) x 60 min/h </content></td></tr><tr><td align="justify" valign="top"> 50 mcg/mL </td></tr></tbody></table>',
//       '<table width="100%" styleCode="Noautorules"><col width="25.000%" align="left"/><col width="30.000%" align="left"/><col width="45.000%" align="left"/><tbody><tr><td rowspan="2" align="left" valign="middle">Infusion Rate for CrCl &gt; 60 mL/min (mL/h) = </td><td align="left" valign="top"><content styleCode="underline"> 0.15 mcg/kg/min x 60 kg x 60 min/h </content></td><td rowspan="2" align="left" valign="middle">=10.8 mL/h </td></tr><tr><td align="justify" valign="top"> 50 mcg/mL </td></tr></tbody></table>',
//       '<table width="100%" styleCode="Noautorules"><col width="25.000%" align="left"/><col width="75.000%" align="left"/><tbody><tr><td rowspan="2" align="left" valign="middle">Infusion Rate for CrCl &#x2264; 60 mL/min (mL/h) = </td><td align="justify" valign="top"><content styleCode="underline"> 0.075 mcg/kg/min x body weight (kg) x 60 min/h </content></td></tr><tr><td align="left" valign="top"> 50 mcg/mL </td></tr></tbody></table>',
//     ],
//     dosage_forms_and_strengths: [
// ""    ],
//     contraindications: [
// ""    ],
//     warnings_and_cautions: [
// ""    ],
//     adverse_reactions: [
// ""    ],
//     adverse_reactions_table: [
//       '<table ID="t2" width="100%"><caption>Table 2 TIMI Major and Minor Bleeding in PRISM-PLUS </caption><col width="36.000%" align="left"/><col width="41.133%" align="left"/><col width="22.867%" align="left"/><tfoot><tr><td colspan="3" align="left" valign="top"><paragraph styleCode="footnote">* 0.4 mcg/kg/min initial infusion; 0.10 mcg/kg/min maintenance infusion. </paragraph></td></tr><tr><td colspan="3" align="left" valign="top"><paragraph styleCode="footnote">&#x2021; Major = Hemoglobin drop of &gt; 5.0 g/dL with or without an identified site, intracranial hemorrhage, or cardiac tamponade. </paragraph></td></tr><tr><td colspan="3" align="left" valign="top"><paragraph styleCode="footnote">&#xA7; Minor = Hemoglobin drop of &gt; 3.0 g/dL with bleeding from a known site, spontaneous gross hematuria, hematemesis or hemoptysis. </paragraph></td></tr></tfoot><tbody><tr><td align="left" valign="top" styleCode="Toprule Botrule Lrule Rrule"/><td colspan="2" align="center" valign="top" styleCode="Toprule Botrule Rrule"><content styleCode="bold">PRISM-PLUS (NSTE-ACS)</content></td></tr><tr><td align="left" valign="middle" styleCode="Botrule Lrule Rrule"><content styleCode="bold">Bleeding (TIMI Criteria)&#x2021; &#xA7;</content></td><td align="center" valign="middle" styleCode="Botrule Rrule"><content styleCode="bold">Tirofiban Hydrochloride Injection* +  Heparin (N=773)</content></td><td align="center" valign="middle" styleCode="Botrule Rrule"><content styleCode="bold">Heparin alone</content> <content styleCode="bold">(N=797)</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">Major Bleeding </td><td align="center" valign="top" styleCode="Botrule Rrule">1.4% </td><td align="center" valign="top" styleCode="Botrule Rrule">0.8% </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">Minor Bleeding </td><td align="center" valign="top" styleCode="Botrule Rrule">10.5% </td><td align="center" valign="top" styleCode="Botrule Rrule">8.0% </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">Transfusions </td><td align="center" valign="top" styleCode="Botrule Rrule">4.0% </td><td align="center" valign="top" styleCode="Botrule Rrule">2.8% </td></tr></tbody></table>',
//       '<table ID="t3" width="100%"><caption>Table 3 TIMI Major Bleeding Associated with Percutaneous Procedures in PRISM-PLUS </caption><col width="28.786%" align="left"/><col width="19.944%" align="left"/><col width="18.404%" align="left"/><col width="16.863%" align="left"/><col width="16.003%" align="left"/><tbody><tr><td align="left" valign="top" styleCode="Toprule Lrule Rrule"/><td colspan="2" align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Tirofiban Hydrochloride  Injection + Heparin</content></td><td colspan="2" align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Heparin alone</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule"/><td align="center" valign="top" styleCode="Botrule Rrule"><content styleCode="bold">N</content></td><td align="center" valign="top" styleCode="Botrule Rrule"><content styleCode="bold">%</content></td><td align="center" valign="top" styleCode="Botrule Rrule"><content styleCode="bold">N</content></td><td align="center" valign="top" styleCode="Botrule Rrule"><content styleCode="bold">%</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">Prior to Procedures </td><td align="center" valign="middle" styleCode="Botrule Rrule">773 </td><td align="center" valign="middle" styleCode="Botrule Rrule">0.3 </td><td align="center" valign="middle" styleCode="Botrule Rrule">797 </td><td align="center" valign="middle" styleCode="Botrule Rrule">0.1 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">Following Angiography </td><td align="center" valign="middle" styleCode="Botrule Rrule">697 </td><td align="center" valign="middle" styleCode="Botrule Rrule">1.3 </td><td align="center" valign="middle" styleCode="Botrule Rrule">708 </td><td align="center" valign="middle" styleCode="Botrule Rrule">0.7 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">Following PTCA </td><td align="center" valign="middle" styleCode="Botrule Rrule">239 </td><td align="center" valign="middle" styleCode="Botrule Rrule">2.5 </td><td align="center" valign="middle" styleCode="Botrule Rrule">236 </td><td align="center" valign="middle" styleCode="Botrule Rrule">2.2 </td></tr></tbody></table>',
//       '<table ID="t4" width="100%"><caption>Table 4 Non-bleeding Adverse Reactions in PRISM-PLUS </caption><col width="37.979%" align="left"/><col width="36.812%" align="left"/><col width="25.208%" align="left"/><tbody><tr><td align="left" valign="top" styleCode="Toprule Botrule Lrule Rrule"/><td align="center" valign="top" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Tirofiban Hydrochloride  Injection + Heparin</content> <content styleCode="bold">(N=1953) %</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Heparin alone</content> <content styleCode="bold">(N=1887)%</content></td></tr><tr><td colspan="3" align="left" valign="top" styleCode="Botrule Lrule Rrule"><content styleCode="italics">Body as a Whole</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule"> Edema/swelling </td><td align="center" valign="top" styleCode="Botrule Rrule">2 </td><td align="center" valign="top" styleCode="Botrule Rrule">1 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule"> Pain, pelvic </td><td align="center" valign="top" styleCode="Botrule Rrule">6 </td><td align="center" valign="top" styleCode="Botrule Rrule">5 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule"> Reaction, vasovagal </td><td align="center" valign="top" styleCode="Botrule Rrule">2 </td><td align="center" valign="top" styleCode="Botrule Rrule">1 </td></tr><tr><td colspan="3" align="left" valign="top" styleCode="Botrule Lrule Rrule"><content styleCode="italics">Cardiovascular System</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule"> Bradycardia </td><td align="center" valign="top" styleCode="Botrule Rrule">4 </td><td align="center" valign="top" styleCode="Botrule Rrule">3 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule"> Dissection, coronary artery </td><td align="center" valign="top" styleCode="Botrule Rrule">5 </td><td align="center" valign="top" styleCode="Botrule Rrule">4 </td></tr><tr><td colspan="3" align="left" valign="top" styleCode="Botrule Lrule Rrule"><content styleCode="italics">Musculoskeletal System</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule"> Pain, leg </td><td align="center" valign="top" styleCode="Botrule Rrule">3 </td><td align="center" valign="top" styleCode="Botrule Rrule">2 </td></tr><tr><td colspan="3" align="left" valign="top" styleCode="Botrule Lrule Rrule"><content styleCode="italics">Nervous System/Psychiatric</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule"> Dizziness </td><td align="center" valign="top" styleCode="Botrule Rrule">3 </td><td align="center" valign="top" styleCode="Botrule Rrule">2 </td></tr><tr><td colspan="3" align="left" valign="top" styleCode="Botrule Lrule Rrule"><content styleCode="italics">Skin and Skin Appendage</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule"> Sweating </td><td align="center" valign="top" styleCode="Botrule Rrule">2 </td><td align="center" valign="top" styleCode="Botrule Rrule">1 </td></tr></tbody></table>',
//     ],
//     drug_interactions: [
// ""    ],
//     use_in_specific_populations: [
// ""    ],
//     use_in_specific_populations_table: [
//       '<table ID="t5" width="100%"><caption>Table 5 Developmental Toxicity Studies </caption><col width="27.850%" align="left"/><col width="22.150%" align="left"/><col width="25.000%" align="left"/><col width="25.000%" align="left"/><tfoot><tr><td colspan="4" align="left" valign="top"><paragraph styleCode="footnote">*5 mg/kg/day is ~5 and 13 times the maximum recommended daily human dose for rat and rabbit, respectively, when compared on a body surface area basis. </paragraph></td></tr></tfoot><tbody><tr><td align="center" valign="middle" styleCode="Toprule Botrule Lrule Rrule"><content styleCode="bold">Type of Study</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Species</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Dose/Exposure</content>* </td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Duration/Timing Exposure</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(1) Range-finding </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rat (N=30) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=10 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 6 through LD 20 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(2) Developmental Toxicity </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rat (N=66) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=22 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 6 through GD 20 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(3) Developmental Toxicity with Postweaning Evaluation </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rat (N=66) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=22 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 6 through LD 20 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(4) Range-finding (non-pregnant) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rabbit (N=21) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=7 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily for 14 days </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(5) Range-finding (pregnant) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rabbit (N=30) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=10 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 7 through GD 20 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(6) Developmental Toxicity </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rabbit (N=60) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day (N=20 per group) IV </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 7 through GD 20 </td></tr></tbody></table>',
//     ],
//     pregnancy: [
//     ],
//     pregnancy_table: [
//       '<table ID="t5" width="100%"><caption>Table 5 Developmental Toxicity Studies </caption><col width="27.850%" align="left"/><col width="22.150%" align="left"/><col width="25.000%" align="left"/><col width="25.000%" align="left"/><tfoot><tr><td colspan="4" align="left" valign="top"><paragraph styleCode="footnote">*5 mg/kg/day is ~5 and 13 times the maximum recommended daily human dose for rat and rabbit, respectively, when compared on a body surface area basis. </paragraph></td></tr></tfoot><tbody><tr><td align="center" valign="middle" styleCode="Toprule Botrule Lrule Rrule"><content styleCode="bold">Type of Study</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Species</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Dose/Exposure</content>* </td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Duration/Timing Exposure</content></td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(1) Range-finding </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rat (N=30) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=10 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 6 through LD 20 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(2) Developmental Toxicity </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rat (N=66) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=22 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 6 through GD 20 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(3) Developmental Toxicity with Postweaning Evaluation </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rat (N=66) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=22 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 6 through LD 20 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(4) Range-finding (non-pregnant) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rabbit (N=21) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=7 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily for 14 days </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(5) Range-finding (pregnant) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rabbit (N=30) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day IV (N=10 per group) </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 7 through GD 20 </td></tr><tr><td align="left" valign="top" styleCode="Botrule Lrule Rrule">(6) Developmental Toxicity </td><td align="center" valign="middle" styleCode="Botrule Rrule">Rabbit (N=60) </td><td align="center" valign="middle" styleCode="Botrule Rrule">1, 2, 5 mg/kg/day (N=20 per group) IV </td><td align="center" valign="middle" styleCode="Botrule Rrule">Once daily from GD 7 through GD 20 </td></tr></tbody></table>',
//     ],
//     pediatric_use: [
//     ],
//     geriatric_use: [
//     ],
//     overdosage: [
//     ],
//     description: [
//     ],
//     clinical_pharmacology: [
// ""    ],
//     mechanism_of_action: [
// ""    ],
//     pharmacodynamics: [
// ""    ],
//     pharmacokinetics: [
// ""    ],
//     nonclinical_toxicology: [
// ""    ],
//     carcinogenesis_and_mutagenesis_and_impairment_of_fertility: [
// ""    ],
//     clinical_studies: [
// ""    ],
//     clinical_studies_table: [
//       '<table ID="t6" width="100%"><caption>Table 6 Primary Outcomes at 7 days in PRISM-PLUS </caption><col width="24.820%" align="left"/><col width="35.480%" align="left"/><col width="14.160%" align="left"/><col width="13.700%" align="left"/><col width="11.840%" align="left"/><tbody><tr><td align="left" valign="middle" styleCode="Toprule Botrule Lrule Rrule"><content styleCode="bold">Endpoint</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Tirofiban Hydrochloride Injection + Heparin</content> <content styleCode="bold">(N=773)</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Heparin</content> <content styleCode="bold">(N=797)</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Risk Reduction</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">p-value</content></td></tr><tr><td align="left" valign="middle" styleCode="Botrule Lrule Rrule">Death, new MI, and refractory ischemia at 7 days </td><td align="center" valign="middle" styleCode="Botrule Rrule">12.9% </td><td align="center" valign="middle" styleCode="Botrule Rrule">17.9% </td><td align="center" valign="middle" styleCode="Botrule Rrule">32% </td><td align="center" valign="middle" styleCode="Botrule Rrule">0.004 </td></tr><tr><td align="left" valign="middle" styleCode="Botrule Lrule Rrule"> Death </td><td align="center" valign="middle" styleCode="Botrule Rrule">1.9 % </td><td align="center" valign="middle" styleCode="Botrule Rrule">1.9% </td><td align="center" valign="middle" styleCode="Botrule Rrule">--- </td><td align="center" valign="middle" styleCode="Botrule Rrule">--- </td></tr><tr><td align="left" valign="middle" styleCode="Botrule Lrule Rrule"> MI </td><td align="center" valign="middle" styleCode="Botrule Rrule">3.9% </td><td align="center" valign="middle" styleCode="Botrule Rrule">7.0% </td><td align="center" valign="middle" styleCode="Botrule Rrule">47% </td><td align="center" valign="middle" styleCode="Botrule Rrule">0.006 </td></tr><tr><td align="left" valign="middle" styleCode="Botrule Lrule Rrule"> Refractory Ischemia </td><td align="center" valign="middle" styleCode="Botrule Rrule">9.3% </td><td align="center" valign="middle" styleCode="Botrule Rrule">12.7% </td><td align="center" valign="middle" styleCode="Botrule Rrule">30% </td><td align="center" valign="middle" styleCode="Botrule Rrule">0.023 </td></tr></tbody></table>',
//       '<table ID="t7" width="100%"><caption>Table 7 Primary Outcomes in PRISM &#x2013; Cardiac Ischemia Events </caption><col width="34.140%" align="left"/><col width="24.840%" align="left"/><col width="15.520%" align="left"/><col width="13.960%" align="left"/><col width="11.540%" align="left"/><tbody><tr><td align="left" valign="middle" styleCode="Toprule Botrule Lrule Rrule"><content styleCode="bold">Composite Endpoint (death, MI, or refractory ischemia)</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Tirofiban  Hydrochloride  Injection (N=1616)</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Heparin</content> <content styleCode="bold">(N=1616)</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">Risk  Reduction</content></td><td align="center" valign="middle" styleCode="Toprule Botrule Rrule"><content styleCode="bold">p-value</content></td></tr><tr><td align="left" valign="middle" styleCode="Botrule Lrule Rrule">2 Days (end of drug infusion) </td><td align="center" valign="middle" styleCode="Botrule Rrule">3.8% </td><td align="center" valign="middle" styleCode="Botrule Rrule">5.6% </td><td align="center" valign="middle" styleCode="Botrule Rrule">33% </td><td align="center" valign="middle" styleCode="Botrule Rrule">0.015 </td></tr><tr><td align="left" valign="middle" styleCode="Botrule Lrule Rrule">7 Days </td><td align="center" valign="middle" styleCode="Botrule Rrule">10.3% </td><td align="center" valign="middle" styleCode="Botrule Rrule">11.3% </td><td align="center" valign="middle" styleCode="Botrule Rrule">10% </td><td align="center" valign="middle" styleCode="Botrule Rrule">0.33 </td></tr></tbody></table>',
//     ],
//     how_supplied: [
// ""    ],
//     how_supplied_table: [
// ""    ],
//     storage_and_handling: [
// ""    ],
//     information_for_patients: [
// ""    ],
//     package_label_principal_display_panel: [
// ""    ],

//     openfda: {

//       generic_name: ["TIROFIBAN HYDROCHLORIDE"],

//       route: ["INTRAVENOUS"],
//       substance_name: ["TIROFIBAN HYDROCHLORIDE"],

//     },
//   },
// ];
