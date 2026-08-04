/* contract.js — Prime Deals Rental vehicle rental agreement, structured for read-only
   display with interactive initial / signature / date fields. Text is the client's
   final contract, verbatim; only the blank fields are fillable by the renter. */
window.CONTRACT = {
  version: 'PDR-2026-08-04',
  title: 'Prime Deals Rental — Vehicle Rental Agreement',
  blocks: [
  {
    "t": "title",
    "text": "PRIME DEALS RENTAL"
  },
  {
    "t": "subtitle",
    "text": "VEHICLE RENTAL AGREEMENT"
  },
  {
    "t": "part",
    "text": "PART I — RENTAL AGREEMENT TERMS AND CONDITIONS"
  },
  {
    "t": "subhead",
    "text": "RENTAL AGREEMENT TERMS AND CONDITIONS"
  },
  {
    "t": "section",
    "num": "1",
    "text": "1. Definitions:"
  },
  {
    "t": "p",
    "text": "For purposes of this Agreement:"
  },
  {
    "t": "p",
    "text": "Agreement: “Agreement” means this Rental Agreement, together with any applicable reservation documents, vehicle inspection reports, damage reports, fee schedules, and other documents expressly incorporated into or made part of this Agreement."
  },
  {
    "t": "p",
    "text": "Prime Deals Rental / We / Us / Our: “Prime Deals Rental,” “We,” “Us,” or “Our” means Prime Deals Rental.”"
  },
  {
    "t": "p",
    "text": "Renter / You / Your: Renter,” “You,” or “Your” means the individual identified as the renter in this Agreement and any person who signs this Agreement or is otherwise legally responsible for the rental obligations."
  },
  {
    "t": "p",
    "text": "Vehicle: “Vehicle” means the motor vehicle identified in this Agreement, including any replacement or substitute vehicle provided by Prime Deals Rental, together with its keys, key fobs, tires, wheels, tools, floor mats, owner's manuals, charging cables, I-PASS transponder, accessories, removable equipment, and other property provided with the Vehicle."
  },
  {
    "t": "p",
    "text": "Rental Period: “Rental Period” means the period beginning when the Vehicle is provided to the Renter and ending when the Vehicle is returned to Prime Deals Rental in accordance with this Agreement."
  },
  {
    "t": "p",
    "text": "Rental Charges: “Rental Charges” means the amounts payable for the rental of the Vehicle and any additional charges, fees, taxes, governmental charges, or other amounts that become due under this Agreement."
  },
  {
    "t": "p",
    "text": "Authorized Driver: “Authorized Driver” means a person who is approved by Prime Deals Rental to operate the Vehicle and who meets all applicable age, driver's license, insurance, and other eligibility requirements under this Agreement. Only an Authorized Driver may operate the Vehicle."
  },
  {
    "t": "p",
    "text": "Security Deposit: “Security Deposit” means any refundable deposit collected by Prime Deals Rental before the Vehicle is released to the Renter to secure the Renter's performance of obligations and payment of amounts due under this Agreement."
  },
  {
    "t": "p",
    "text": "Damage: “Damage” means physical, cosmetic, mechanical, electrical, structural, electronic, or other damage to the Vehicle or its equipment that occurs during the Rental Period and is not attributable to Ordinary Wear and Tear."
  },
  {
    "t": "p",
    "text": "Ordinary Wear and Tear: “Ordinary Wear and Tear” means normal deterioration resulting from the proper and lawful operation of the Vehicle under ordinary conditions and does not include damage caused by misuse, abuse, negligence, prohibited use, unauthorized use, improper operation, or failure to properly care for the Vehicle."
  },
  {
    "t": "section",
    "num": "3",
    "text": "3. Eligibility and Authorized Drivers"
  },
  {
    "t": "p",
    "text": "To rent or operate a Vehicle, you must (a) be at least eighteen (18) years of age or meet the minimum age required for the Vehicle, (b) possess a valid driver’s license, (c) provide valid government-issued photo identification, (d) maintain the insurance required by applicable law and this Agreement, (e) provide a valid payment method acceptable to Prime Deals Rental, and (f) complete any identity verification required by Prime Deals Rental. Only the Renter and drivers expressly approved by Prime Deals Rental and listed as Authorized Drivers may operate the Vehicle. You may not permit any unauthorized person to operate or possess the Vehicle and remain fully responsible for the Vehicle and for all loss, damage, fees, costs, and expenses arising from its possession, use, or operation, including those caused by an Authorized or unauthorized driver, to the fullest extent permitted by applicable law. Prime Deals Rental may refuse, cancel, or decline any rental or driver for any lawful reason."
  },
  {
    "t": "section",
    "num": "4",
    "text": "4. Rental Period and Date of Return"
  },
  {
    "t": "p",
    "text": "The Rental Period begins on the date and time stated in this Agreement and ends on the scheduled return date and time. You must return the Vehicle to the designated return location by the scheduled return date and time unless Prime Deals Rental approves an extension in advance. Any extension must be requested and approved by Prime Deals Rental before the scheduled return time and is subject to availability, additional rental charges, and any other applicable fees. An extension is not effective unless approved by Prime Deals Rental. Failure to return the Vehicle within one (1) hour after the scheduled return time may result in an additional 24-hour rental charge, and each additional day of late return may result in another 24-hour rental charge. A return more than one (1) hour late may also be subject to the applicable late-return fee stated in the Fee Schedule. Returning the Vehicle after Prime Deals Rental’s stated business hours may result in additional late-return fees as provided in the Fee Schedule. You remain responsible for the Vehicle and all applicable rental charges and fees until it is returned as required by this Agreement."
  },
  {
    "t": "section",
    "num": "5",
    "text": "5. Cancellations and No-Shows"
  },
  {
    "t": "p",
    "text": "All reservation deposits, rental payments, and other amounts paid to Prime Deals Rental are non-refundable, except where a refund is required by applicable law or expressly provided in this Agreement. Cancellations, no-shows, failure to take possession of the Vehicle, early returns, unused rental time, or failure to use the Vehicle for the full reserved Rental Period do not entitle you to a refund, credit, rescheduling, or reduction in charges. Prime Deals Rental may cancel or refuse a reservation for any lawful reason. If Prime Deals Rental cancels a reservation before the Rental Period begins for reasons not caused by you, any refund will be handled as required by applicable law."
  },
  {
    "t": "section",
    "num": "6",
    "text": "6. Payment and Payment Card Terms"
  },
  {
    "t": "p",
    "text": "Prime Deals Rental accepts payment methods approved by Prime Deals Rental and may obtain a pre-authorization hold on the payment card provided before or during the Rental Period for rental charges, the Security Deposit, or an estimated total amount due. A pre-authorization hold is not a completed charge, and the release of any unused funds is controlled by the Renter’s financial institution. Prime Deals Rental may charge the payment method on file for all amounts due under this Agreement, including (a) rental charges and approved extensions, (b) Security Deposits, damage, theft, loss of use, and other Vehicle-related charges, (c) fuel, excess mileage, tolls, parking or traffic-related charges, (d) cleaning, smoke or odor remediation, lost or damaged keys, key fobs, accessories, or equipment, and (e) other documented fees, costs, or charges permitted by this Agreement or applicable law, including charges identified after the Vehicle is returned and inspected. An itemized statement of post-rental charges will be provided upon request."
  },
  {
    "t": "section",
    "num": "7",
    "text": "7. Security Deposit"
  },
  {
    "t": "p",
    "text": "Prime Deals Rental may require a refundable Security Deposit before releasing the Vehicle. The Security Deposit may be retained, applied, or charged against any amounts you owe under this Agreement, including (a) unpaid rental charges or approved extensions, (b) damage, theft, loss of use, or other Vehicle-related loss, (c) fuel, excess mileage, tolls, parking, traffic-related charges, towing, storage, or impound fees, (d) cleaning, smoke or odor remediation, (e) lost or damaged keys, key fobs, charging cables, I-Pass devices, accessories, or other equipment, and (f) any other documented fees, costs, or expenses permitted by this Agreement or applicable law. Prime Deals Rental may hold the Security Deposit for up to seventy-two (72) hours after return to inspect the Vehicle and determine amounts due. If amounts owed exceed the Security Deposit, Prime Deals Rental may charge the remaining balance to the payment method on file, and you remain responsible for any unpaid balance."
  },
  {
    "t": "section",
    "num": "8",
    "text": "8. Charges"
  },
  {
    "t": "p",
    "text": "You agree to pay Prime Deals Rental all amounts due under this Agreement, including (a) rental charges, approved extensions, additional rental time, and excess mileage, (b) applicable taxes, governmental fees, and surcharges, (c) fuel, cleaning, smoke or odor remediation, and damage-related charges, (d) lost or damaged keys, key fobs, charging cables, I-Pass devices, accessories, or other missing equipment, (e) tolls, parking charges, traffic or camera violations, citations, fines, penalties, towing, storage, and impound fees, (f) reasonable costs incurred to recover or return the Vehicle when it is not timely returned, and (g) other documented fees, costs, or expenses permitted by this Agreement or applicable law. You remain responsible for all such amounts whether identified during or after the Rental Period, including amounts discovered during post-rental inspection. All charges are subject to applicable law and the terms of this Agreement."
  },
  {
    "t": "section",
    "num": "9",
    "text": "9. Fee Schedule - Exhibit A"
  },
  {
    "t": "p",
    "text": "Reference to Exhibit A — Fee Schedule"
  },
  {
    "t": "p",
    "text": "The Fee Schedule attached as Exhibit A is incorporated into and made part of this Agreement. The fees and charges listed in Exhibit A apply when the stated circumstances occur and are in addition to any other amounts due under this Agreement. The Fee Schedule does not limit Prime Deals Rental’s right to recover documented actual damages, losses, fees, costs, or expenses otherwise permitted by this Agreement or applicable law."
  },
  {
    "t": "part",
    "text": "PART II — VEHICLE USE, CONDITION, AND RETURN"
  },
  {
    "t": "section",
    "num": "10",
    "text": "10. Vehicle Condition"
  },
  {
    "t": "p",
    "text": "You are responsible for inspecting the Vehicle before signing this Agreement and taking possession. Prime Deals Rental may document the Vehicle's condition through (a) timestamped photographs or videos, (b) a Vehicle Inspection Report, and (c) other electronic records. Any pre-existing damage identified by Prime Deals Rental will be documented before departure. You must immediately report any damage or condition not documented before leaving the pickup location; otherwise, you acknowledge and accept the Vehicle in its documented condition. You are responsible for returning the Vehicle in substantially the same interior and exterior condition in which it was received, excluding ordinary wear and tear, and with all keys, key fobs, accessories, charging cables, I-PASS devices, documents, and other equipment provided by Prime Deals Rental. You must remove all personal belongings before returning the Vehicle. Prime Deals Rental may inspect the Vehicle after return and use photographs, videos, inspection reports, and other records to document its condition and identify damage, loss, missing equipment, or other charges. Any damage or loss not documented before departure may be attributed to the Rental Period to the fullest extent permitted by applicable law. If the Vehicle is returned after business hours or left unattended, you remain responsible for the Vehicle and any loss of or damage to it until Prime Deals Rental has had a reasonable opportunity to inspect it."
  },
  {
    "t": "section",
    "num": "11",
    "text": "11. Mechanical Damage, Vehicle Care, and Condition"
  },
  {
    "t": "p",
    "text": "You must immediately stop operating the Vehicle and notify Prime Deals Rental if any warning light, overheating, loss of oil pressure, transmission or brake malfunction, charging-system or tire-pressure warning, or other condition indicates that continued operation could cause damage or create an unsafe condition. You must not (a) continue operating the Vehicle when doing so could reasonably cause additional damage, (b) modify or alter the Vehicle, (c) disable, remove, disconnect, or tamper with any safety, GPS, camera, telematics, or monitoring equipment, or (d) install aftermarket equipment without Prime Deals Rental’s prior written approval. You are responsible, to the fullest extent permitted by applicable law, for damage occurring during the Rental Period, other than ordinary wear and tear, including damage to tires, wheels, glass, mirrors, sunroofs, interior components, electronics, accessories, or other Vehicle components, and for any repair, replacement, towing, recovery, or related costs resulting from misuse, neglect, failure to promptly report a problem, or continued operation after a warning or unsafe condition occurs. Smoking, vaping, marijuana use, and combustible or vapor-producing substances are prohibited inside the Vehicle. Pets are prohibited unless expressly authorized in writing, and you remain responsible for any resulting damage, hair, odors, cleaning, or remediation costs. You may not use air fresheners, perfumes, ozone generators, or other products to conceal or mask odors without Prime Deals Rental’s prior written approval."
  },
  {
    "t": "section",
    "num": "12",
    "text": "12. Mileage, Fuel, and Late Return"
  },
  {
    "t": "p",
    "text": "The Vehicle includes the mileage allowance stated in this Agreement or Reservation, and any mileage exceeding that allowance will be charged at the applicable rate stated in Exhibit A. The Vehicle must be returned with approximately the same fuel level recorded at pickup. If returned with less fuel, you are responsible for the reasonable cost of replacement fuel and any applicable refueling service fee stated in Exhibit A. Only the fuel type specified by Prime Deals Rental may be used, and you are responsible for all damage and related costs resulting from incorrect or improper fuel. The Vehicle must be returned by the date, time, and location specified in this Agreement unless Prime Deals Rental approves an extension in writing before the scheduled return time. An unauthorized late return or extension may result in additional rental charges, late fees, and other documented costs permitted by this Agreement or applicable law. Failure to return the Vehicle as required may result in Prime Deals Rental pursuing all lawful remedies to recover the Vehicle and any amounts owed."
  },
  {
    "t": "section",
    "num": "13",
    "text": "13. Tires, Wheels, Glass, and Other Vehicle Components"
  },
  {
    "t": "p",
    "text": "You are responsible for damage to the Vehicle occurring during the Rental Period, other than ordinary wear and tear, including (a) tire punctures, blowouts, sidewall damage, or other tire damage, (b) bent, cracked, damaged, or scraped wheels, wheel rash, or missing valve caps or center caps, (c) windshield chips or cracks, and (d) broken or damaged windows, mirrors, sunroofs, or other Vehicle components. You must promptly notify Prime Deals Rental of any such damage or condition and, when continued operation could cause additional damage or create an unsafe condition, immediately discontinue operation of the Vehicle. You are responsible for all documented repair, replacement, towing, recovery, and related costs resulting from such damage to the fullest extent permitted by applicable law."
  },
  {
    "t": "section",
    "num": "14",
    "text": "14. Interior Condition, Cleaning, Smoking, and Odor"
  },
  {
    "t": "p",
    "text": "You must return the Vehicle’s interior in substantially the same condition in which it was received, except for ordinary wear and tear. You are responsible for interior damage or excessive cleaning resulting from (a) excessive dirt, mud, stains, burns, cuts, tears, food or beverage spills or contamination, (b) pet hair, odors, scratches, upholstery or other pet-related damage, (c) damaged trim, electronics, or other interior components, or (d) any other condition requiring repair, replacement, or professional cleaning. Smoking, vaping, marijuana use, and the use of cigarettes or any combustible or vapor-producing substance are prohibited inside the Vehicle. You may not use air fresheners, perfumes, ozone generators, odor-masking products, or other substances to conceal or mask odors without Prime Deals Rental’s prior written approval. If smoking, vaping, marijuana, prohibited substances, excessive contamination, or other conditions cause an odor or require professional cleaning, deodorizing, smoke or odor remediation, or restoration, you are responsible for the applicable fee stated in Exhibit A and any documented additional cleaning, remediation, repair, or related costs permitted by this Agreement or applicable law."
  },
  {
    "t": "section",
    "num": "15",
    "text": "15. Prohibited Uses"
  },
  {
    "t": "p",
    "text": "The following uses of the Vehicle are prohibited and constitute a breach of this Agreement. The Vehicle may not be used (a) by anyone other than an Authorized Driver or by anyone who is not legally licensed to operate the Vehicle, (b) using false, fraudulent, or misleading information to obtain or extend the rental, (c) for any illegal purpose, criminal activity, or while the driver is impaired by alcohol, cannabis, illegal drugs, controlled substances, or any medication that affects safe operation, (d) to transport persons or property for compensation without Prime Deals Rental’s prior written approval, (e) to tow or push any vehicle, trailer, or other object without prior written approval, (f) for racing, speed contests, drifting, burnouts, reckless driving, driver training, demonstrations, or operation on a racetrack, drag strip, closed course, or organized driving event, (g) off-road or on unpaved or unsuitable surfaces, (h) outside the United States or any geographic area authorized by Prime Deals Rental without prior written approval, (i) to transport hazardous materials, illegal substances, explosives, or dangerous cargo, (j) with a disconnected, altered, or tampered odometer, (k) after a warning light or mechanical condition indicates that continued operation could cause damage, (l) in excess of the Vehicle manufacturer’s recommended load capacity, (m) to transport animals without prior written approval, or (n) in any manner that is unsafe, abusive, reckless, or reasonably likely to damage the Vehicle. Any prohibited use may result in immediate termination of the Rental Period, demand for immediate return of the Vehicle, recovery of the Vehicle by lawful means, and your responsibility for all resulting damage, loss, fees, costs, and expenses permitted by this Agreement or applicable law."
  },
  {
    "t": "part",
    "text": "PART III — INSURANCE, DAMAGE, AND LIABILITY"
  },
  {
    "t": "section",
    "num": "16",
    "text": "16. Insurance"
  },
  {
    "t": "p",
    "text": "You are responsible for maintaining, at your own expense, automobile liability insurance meeting all minimum requirements of applicable law and any additional coverage required by this Agreement, including collision and comprehensive coverage for the Vehicle. Your insurance shall be primary to the fullest extent permitted by applicable law. You must provide proof of valid insurance upon request and promptly notify Prime Deals Rental of any cancellation, expiration, limitation, or change in coverage. If Prime Deals Rental is required by law to provide any insurance coverage, such coverage shall apply only to the minimum extent legally required and only as required by applicable law. If your insurance is denied, unavailable, insufficient, or does not fully cover a loss, you remain responsible for all amounts due under this Agreement, including deductibles, uninsured or underinsured losses, damage to the Vehicle, loss of use, diminished value where permitted by law, and other documented costs and expenses permitted by this Agreement or applicable law. You must promptly notify Prime Deals Rental of any accident or claim and fully cooperate with Prime Deals Rental, its insurers, and any claims or investigation. Only Authorized Drivers may operate the Vehicle, and you remain responsible for ensuring that all Authorized Drivers comply with this Agreement. Nothing in this Agreement creates, expands, or modifies any insurance coverage or policy."
  },
  {
    "t": "section",
    "num": "17",
    "text": "17.     Responsibility for Damage or Loss"
  },
  {
    "t": "p",
    "text": "You are responsible, to the fullest extent permitted by applicable law, for loss of, theft of, or damage to the Vehicle during the Rental Period, including damage or loss resulting from collision, vandalism, negligence, misuse, unauthorized use, or any other event for which you are responsible under this Agreement. Where permitted by this Agreement and applicable law, your responsibility may apply regardless of fault. Your responsibility includes (a) reasonable repair or replacement costs and, if the Vehicle is stolen or deemed a total loss, its actual cash value or other applicable vehicle value, (b) reasonable labor, diagnostics, parts, towing, recovery, and storage costs, (c) loss of use and diminished value where permitted by applicable law, (d) administrative and related expenses permitted by this Agreement or applicable law, and (e) lost or damaged keys, key fobs, I-Pass devices, charging cables, accessories, equipment, or other property provided with the Vehicle. These obligations are in addition to any applicable rental charges, fees, insurance obligations, or other amounts due under this Agreement. Prime Deals Rental may recover documented amounts through the Security Deposit or payment method on file as provided in this Agreement, including amounts identified after the Vehicle is returned and inspected."
  },
  {
    "t": "section",
    "num": "18",
    "text": "18. Default, Termination and Recovery"
  },
  {
    "t": "p",
    "text": "A material breach of this Agreement, including (a) failure to make required payments, (b) unauthorized use or operation of the Vehicle, (c) providing false or misleading information, (d) failure to maintain required insurance, (e) failure to return the Vehicle when required, or (f) any prohibited use or conduct that may cause loss, damage, or unreasonable risk to the Vehicle, constitutes a default. Upon default, or when otherwise permitted by this Agreement or applicable law, Prime Deals Rental may terminate the Rental Period, demand immediate return of the Vehicle, decline any extension, and pursue any lawful remedy available to recover the Vehicle and amounts owed. If the Vehicle is not returned as required, Prime Deals Rental may take lawful steps to recover or repossess the Vehicle and may seek recovery of documented reasonable costs arising from the recovery, transportation, towing, storage, and return of the Vehicle, together with other amounts permitted by this Agreement or applicable law. Prime Deals Rental may also charge or apply the payment method on file or Security Deposit for amounts properly due under this Agreement. Prime Deals Rental may report suspected theft, fraud, unauthorized use, or other suspected criminal conduct to law enforcement when appropriate and may cooperate with law enforcement, insurers, and other authorized parties. Termination of the Rental Period does not release you from responsibility for amounts or obligations incurred before or as a result of the termination. To the fullest extent permitted by applicable law, you waive any claim against Prime Deals Rental arising solely from its good-faith reporting of suspected criminal conduct to law enforcement. No delay or failure by Prime Deals Rental to exercise any right or remedy under this Agreement shall constitute a waiver of that right or remedy."
  },
  {
    "t": "section",
    "num": "19",
    "text": "19. Indemnification and Warranties"
  },
  {
    "t": "p",
    "text": "This Agreement is solely a contract for the rental of the Vehicle and does not transfer any ownership interest in the Vehicle to you. To the fullest extent permitted by applicable law, you agree to indemnify, defend, and hold harmless Prime Deals Rental, its owners, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, costs, expenses, and reasonable attorneys’ fees arising out of or relating to your possession, use, operation, or return of the Vehicle or your breach of this Agreement, except to the extent caused by the gross negligence or willful misconduct of Prime Deals Rental or otherwise prohibited by applicable law. To the fullest extent permitted by applicable law, the Vehicle is rented “AS IS” and “WITH ALL FAULTS.” Prime Deals Rental makes no express, implied, or statutory warranties regarding the Vehicle, including any implied warranty of merchantability or fitness for a particular purpose, and the Vehicle is rented \"AS IS\" and \"WITH ALL FAULTS.\""
  },
  {
    "t": "section",
    "num": "20",
    "text": "20. Subrogation"
  },
  {
    "t": "p",
    "text": "If Prime Deals Rental, its insurer, or any other person or entity pays for any loss, damage, claim, liability, or expense arising out of or relating to the Rental Period, all rights of recovery against any person or entity responsible for such loss shall, to the fullest extent permitted by applicable law, transfer to the party that made the payment, up to the amount paid or the amount of the loss incurred, as applicable. You agree to fully cooperate with Prime Deals Rental and its insurer in investigating, protecting, and pursuing any such recovery rights and shall not take any action that impairs, waives, releases, limits, or prejudices those rights."
  },
  {
    "t": "section",
    "num": "21",
    "text": "21. Limitation of Liability"
  },
  {
    "t": "p",
    "text": "To the fullest extent permitted by applicable law, Prime Deals Rental shall not be liable to you or any other person for any indirect, incidental, special, exemplary, punitive, or consequential damages, losses, or expenses arising from or relating to the Vehicle, its rental, condition, possession, use, operation, maintenance, repair, failure, delay, breakdown, accident, or return, or from this Agreement, including loss of profits, income, business, business opportunities, use, transportation, or personal or commercial activities, or any inconvenience or interruption. You assume all risks associated with your possession, use, and operation of the Vehicle, except to the extent liability cannot lawfully be excluded. Nothing in this Agreement shall be construed to waive, limit, or exclude any liability or right that cannot legally be waived, limited, or excluded. To the fullest extent permitted by applicable law, any liability of Prime Deals Rental shall be limited to the direct and actual damages legally recoverable against Prime Deals Rental, and no provision of this Agreement shall create liability for damages that applicable law does not permit you to recover."
  },
  {
    "t": "section",
    "num": "22",
    "text": "22. Prohibited-Use Fee"
  },
  {
    "t": "p",
    "text": "A $2,500 contractual fee may be assessed, to the fullest extent permitted by applicable law, if documented evidence establishes that during the Rental Period: (a) alcohol was consumed in the Vehicle; (b) smoking, vaping, marijuana, cigarettes, or another prohibited smoking or vapor-producing substance was used in the Vehicle; (c) the Vehicle contains smoke, marijuana, or other prohibited odors requiring remediation; (d) an odor-masking product, air freshener, perfume, or similar substance was applied without Prime Deals Rental’s approval; (e) the Vehicle was operated on a racetrack, drag strip, closed course, or other prohibited track or racing facility; or (f) the Vehicle was abused, driven recklessly, or otherwise subjected to prohibited use. This fee is in addition to any documented cleaning, odor-remediation, repair, loss-of-use, towing, recovery, or other amounts recoverable under this Agreement or applicable law."
  },
  {
    "t": "section",
    "num": "23",
    "text": "23. Disclaimer"
  },
  {
    "t": "p",
    "text": "Prime Deals Rental does not guarantee that any particular Vehicle, feature, equipment, accessory, technology, GPS or navigation system, electronic system, connectivity service, mobile application, or third-party service will be available, operational, uninterrupted, accurate, compatible, or free from malfunction during the Rental Period. You acknowledge that GPS, navigation, telecommunications, internet, cellular, satellite, Bluetooth, charging, entertainment, and other technology or third-party services may be unavailable, interrupted, inaccurate, delayed, or subject to limitations outside Prime Deals Rental’s control, and Prime Deals Rental is not responsible for losses arising solely from such limitations to the fullest extent permitted by applicable law. Prime Deals Rental is not responsible for personal property left in, lost from, damaged in, or stolen from the Vehicle. You are responsible for removing all personal property before returning the Vehicle. Nothing in this Section limits any rights or obligations that cannot lawfully be limited or excluded under applicable law."
  },
  {
    "t": "part",
    "text": "PART IV — VIOLATIONS, DEFAULT, AND CONTRACT ENFORCEMENT"
  },
  {
    "t": "section",
    "num": "24",
    "text": "24. Parking, Tolls, and Traffic Violations"
  },
  {
    "t": "p",
    "text": "You are solely responsible for all tolls, Toll-by-Plate charges, parking charges, traffic citations, red-light and speed-camera violations, moving violations, fines, penalties, towing, storage, impoundment, court costs, and other governmental or related charges arising from your possession, use, or operation of the Vehicle during the Rental Period. If Prime Deals Rental receives, pays, or becomes liable for any such amount, you remain responsible for the full amount and any reasonable administrative, processing, collection, or other documented costs permitted by this Agreement or applicable law. Prime Deals Rental may charge the payment method on file or apply the Security Deposit for such amounts, including charges received or identified after the Vehicle is returned."
  },
  {
    "t": "section",
    "num": "25",
    "text": "25. Breach of Agreement"
  },
  {
    "t": "p",
    "text": "You waive all recourse against Us for criminal prosecutions We take against You for breach of this Agreement. If you materially breach this Agreement, Prime Deals Rental may exercise any rights and remedies available under this Agreement or applicable law, including: (a) declaring all unpaid amounts immediately due and payable; (b) terminating the Rental Period and demanding the immediate return of the Vehicle; (c) recovering possession of the Vehicle by any lawful means; (d) recovering damages, fees, costs, and expenses permitted by this Agreement or applicable law, including reasonable attorneys' fees and collection costs where recoverable; and (e) reporting suspected criminal conduct, unauthorized retention, or unauthorized use of the Vehicle to law enforcement when appropriate. To the fullest extent permitted by applicable law, you waive any claim against Prime Deals Rental arising solely from Prime Deals Rental’s good-faith report of suspected criminal conduct, unauthorized retention, or unauthorized use of the Vehicle to law enforcement. No delay or failure by Prime Deals Rental to exercise any right or remedy under this Agreement shall constitute a waiver of that right or remedy. ed."
  },
  {
    "t": "section",
    "num": "26",
    "text": "26. Recovery of Vehicle Breach of Agreement"
  },
  {
    "t": "p",
    "text": "The Vehicle must be returned to Prime Deals Rental at the location, date, and time specified in this Agreement, unless Prime Deals Rental approves an extension in writing. Prime Deals Rental may demand the immediate return and, subject to applicable law, seek lawful recovery of the Vehicle if (a) the Rental Period expires; (b) you fail to return the Vehicle when required; (c) you materially breach this Agreement; (d) you fail to pay amounts due; (e) the Vehicle is used by an unauthorized driver or for a prohibited purpose; (f) required insurance is unavailable or has been materially violated; or (g) Prime Deals Rental reasonably believes the Vehicle is being unlawfully possessed, used, concealed, damaged, abandoned, or is otherwise at risk of loss. If the Vehicle is not returned as required, you remain responsible for all applicable rental charges, late charges, recovery, towing, storage, transportation, and other documented costs and expenses permitted by this Agreement or applicable law. Prime Deals Rental may take any lawful action reasonably necessary to recover possession of the Vehicle, including pursuing available legal remedies and notifying law enforcement when appropriate. Nothing in this Section authorizes any action prohibited by applicable law."
  },
  {
    "t": "section",
    "num": "27",
    "text": "27. Collections, Costs, and Attorney’s Fees Breach of Agreement"
  },
  {
    "t": "p",
    "text": "You remain responsible for all amounts properly due under this Agreement, including unpaid rental charges, damage and loss charges, fees, costs, and other documented amounts. If you fail to timely pay an amount due, Prime Deals Rental may pursue collection and any other remedies available under this Agreement or applicable law. To the fullest extent permitted by applicable law, you are responsible for reasonable and documented costs incurred by Prime Deals Rental in collecting or enforcing amounts properly due, including reasonable court costs, collection costs, and attorneys' fees, but only to the extent such amounts are recoverable under applicable law. This Section does not require payment of any charge, cost, or fee that applicable law prohibits Prime Deals Rental from recovering."
  },
  {
    "t": "part",
    "text": "PART V — GENERAL CONTRACT PROVISIONS"
  },
  {
    "t": "section",
    "num": "28",
    "text": "28. Modifications"
  },
  {
    "t": "p",
    "text": "No modification, waiver, amendment, or change to this Agreement or the Rental Period is effective unless approved by Prime Deals Rental in writing. Any extension or change to the scheduled return date or other material rental terms requires Prime Deals Rental's prior written approval and may be subject to additional charges and conditions under this Agreement. Electronic communications, including email, text messages, electronic signatures, and other electronic records, may constitute written approval or notice when permitted by applicable law. No oral statement, representation, or promise by any person shall modify or waive this Agreement unless confirmed in writing by Prime Deals Rental. A waiver of any provision on one occasion does not constitute a waiver of that provision or any other provision on any subsequent occasion."
  },
  {
    "t": "section",
    "num": "29",
    "text": "29. Force Majeure"
  },
  {
    "t": "p",
    "text": "Prime Deals Rental shall not be liable for any delay, interruption, cancellation, or failure to perform its obligations under this Agreement to the extent caused by circumstances beyond its reasonable control, including (a) natural disasters, severe weather, fire, flood, pandemics, epidemics, public health emergencies, or other emergencies; (b) government actions, court orders, regulatory restrictions, or changes in law; (c) road closures or utility, communication, transportation, or supply chain disruptions; (d) labor disputes, strikes, civil unrest, war, terrorism, or acts of public enemies; or (e) any other event beyond Prime Deals Rental's reasonable control. This Section does not relieve either party of any payment obligation, liability, or responsibility that accrued before the event or that otherwise remains due under this Agreement or applicable law."
  },
  {
    "t": "section",
    "num": "30",
    "text": "30. Miscellaneous Provisions"
  },
  {
    "t": "p",
    "text": "No waiver, concession, accommodation, acceptance of payment, delay, failure, or refusal by Prime Deals Rental to enforce or exercise any provision, right, remedy, or obligation under this Agreement shall constitute or be deemed a waiver of that or any other provision, right, remedy, or obligation, and Prime Deals Rental may enforce any provision or exercise any right or remedy at any time to the fullest extent permitted by applicable law. This Agreement shall be binding upon and inure to the benefit of the parties and their respective permitted successors and assigns, and no person or entity other than the parties shall be deemed a third-party beneficiary or have any right to enforce or receive any benefit under this Agreement except as expressly required by applicable law. Prime Deals Rental may provide notices, demands, invoices, statements, communications, and other records electronically to the extent permitted by applicable law, and electronic records, photographs, videos, inspection reports, communications, acknowledgments, payment records, and electronic signatures may be created, retained, presented, and enforced as evidence of the matters documented therein to the fullest extent permitted by applicable law. Headings are for convenience only and shall not limit, expand, or otherwise affect the meaning or interpretation of any provision. If any provision of this Agreement is determined to be invalid, unlawful, or unenforceable, it shall be modified or enforced to the maximum extent permitted by applicable law, and such determination shall not affect the validity or enforceability of any remaining provision. All rights, remedies, payment obligations, financial responsibilities, liabilities for loss or damage, indemnification obligations, insurance obligations, collection and enforcement rights, dispute-related provisions, limitations of liability, and any other provisions that by their nature or express terms are intended to continue beyond the expiration, termination, or completion of the Rental Period shall survive and remain enforceable to the fullest extent permitted by applicable law. Nothing in this Section shall be construed to waive, limit, release, or impair any right or remedy that Prime Deals Rental is entitled to retain or enforce under this Agreement or applicable law."
  },
  {
    "t": "section",
    "num": "31",
    "text": "31. Governing Law; Jurisdiction and Venue"
  },
  {
    "t": "p",
    "text": "This Agreement shall be governed by and construed in accordance with the laws of the State of Illinois, without regard to its conflict-of-law principles, except to the extent that applicable law requires otherwise. Any legal action or proceeding arising out of or relating to this Agreement or the rental, possession, use, condition, damage, or return of the Vehicle shall, to the fullest extent permitted by applicable law, be brought in a court of competent jurisdiction located in Cook County, Illinois, or, where federal jurisdiction exists, in the United States District Court for the Northern District of Illinois. You consent to the jurisdiction and venue of such courts and, to the fullest extent permitted by applicable law, waive any objection based on improper venue, inconvenient forum, or similar grounds. Nothing in this Section shall limit or waive any mandatory rights, protections, remedies, jurisdictional requirements, or venue requirements imposed by applicable law."
  },
  {
    "t": "section",
    "num": "32",
    "text": "32. Entire Agreement and Acknowledgment"
  },
  {
    "t": "p",
    "text": "This Agreement, together with the Reservation, Vehicle Inspection Report, Pre-Rental Inspection and Condition Records, timestamped photographs and videos, applicable Fee Schedule, payment and security-deposit terms, Damage Acknowledgment and Financial Responsibility form, and any other documents or records expressly incorporated into or referenced by this Agreement, constitutes the entire agreement between you and Prime Deals Rental concerning the rental, possession, use, operation, and return of the Vehicle and supersedes all prior or contemporaneous oral or written representations, negotiations, understandings, promises, statements, and agreements relating to the Rental Period. You acknowledge that you have been provided a reasonable opportunity to read and review this Agreement and the documents incorporated into it before signing or accepting the rental, that you understand the material terms and conditions applicable to the Rental Period, and that you agree to comply with all of them. You further acknowledge that you are responsible for reviewing the Vehicle's documented condition, including applicable photographs, videos, and inspection records, before taking possession and for promptly reporting any discrepancy or pre-existing damage as required by this Agreement. No oral statement, representation, promise, modification, waiver, or agreement by any person acting on behalf of Prime Deals Rental shall modify, waive, or amend this Agreement unless the modification or waiver is made in writing and approved by Prime Deals Rental, except as otherwise expressly permitted by this Agreement or required by applicable law. To the fullest extent permitted by applicable law, no course of dealing, delay, acceptance of payment, failure to enforce a provision, or other conduct by Prime Deals Rental shall be deemed to modify, waive, or amend any provision of this Agreement. If an incorporated document conflicts with this Agreement, this Agreement shall control unless this Agreement expressly provides otherwise or applicable law requires a different result."
  },
  {
    "t": "initial",
    "label": "Renter’s Initials",
    "role": "renter"
  },
  {
    "t": "section",
    "num": "33",
    "text": "33. Renter's Certification"
  },
  {
    "t": "p",
    "text": "By signing this Agreement, you certify that all information you have provided to Prime Deals Rental, including your name, address, driver's license and identification information, insurance information, payment information, and information concerning any Authorized Driver, is true, complete, and accurate. You acknowledge that Prime Deals Rental is relying on the accuracy of this information in approving and administering the Rental Period and that providing false, incomplete, misleading, or fraudulent information may constitute a material breach of this Agreement. You acknowledge that you have been provided a reasonable opportunity to read and review this Agreement and all applicable rental documents before signing, including the Reservation, applicable Fee Schedule, Vehicle Inspection Report, and pre-rental photographs and/or videos, and that you have had an opportunity to ask questions and obtain clarification regarding the terms applicable to your rental. You acknowledge that you inspected the Vehicle before taking possession, had a reasonable opportunity to identify and report pre-existing damage or other conditions, and reviewed the applicable inspection records and photographs and/or videos documenting the Vehicle's condition at pickup. Unless otherwise documented and reported to Prime Deals Rental before the Vehicle leaves its possession, you acknowledge the Vehicle in its documented condition and accept responsibility for the Vehicle during the Rental Period as provided by this Agreement. You acknowledge that Prime Deals Rental may compare the Vehicle's condition at return with its pre-rental photographs, videos, inspection reports, electronic records, and other documentation and may determine and assess documented charges authorized by this Agreement after the Vehicle is returned and inspected. You further acknowledge and agree that the payment method and/or security deposit provided in connection with the rental may be used or charged for amounts properly due under this Agreement, including amounts identified after return and inspection, to the fullest extent permitted by applicable law. By signing below, you acknowledge that you have read, understood, and agree to comply with this Agreement and accept the rights, responsibilities, fees, charges, and obligations assigned to you under it, including responsibility for the Vehicle and for any damage, loss, theft, unauthorized use, tolls, citations, fines, fees, costs, or other documented amounts for which you are responsible under this Agreement and applicable law. Your signature constitutes your acknowledgment and acceptance of this Agreement and the obligations applicable to you and does not waive any right, remedy, defense, or protection that cannot lawfully be waived"
  },
  {
    "t": "initial",
    "label": "Renter’s Initials",
    "role": "renter"
  },
  {
    "t": "section",
    "num": "34",
    "text": "34. Signatures and Electronic Acceptance"
  },
  {
    "t": "p",
    "text": "By signing or electronically accepting this Agreement, the Renter acknowledges, represents, and agrees that: (a) the Renter has received and had a reasonable opportunity to read, review, understand, and ask questions about this Agreement and all documents incorporated into or referenced by it, including any applicable Reservation, Fee Schedule, Vehicle Inspection Report, pre-rental photographs and videos, Damage Acknowledgment and Financial Responsibility form, payment and security-deposit terms, and other applicable rental documents; (b) all information provided by the Renter to Prime Deals Rental is true, complete, current, and accurate, including information concerning the Renter, any Authorized Driver, driver's license, identification, insurance, and payment information; (c) the Renter accepts this Agreement and agrees to comply fully with all terms and conditions applicable to the Renter, including responsibility for the Vehicle and all damages, losses, theft, charges, fees, costs, expenses, and other amounts for which the Renter is responsible under this Agreement or applicable law; (d) the Vehicle's condition may be documented before, during, and after the Rental Period through photographs, videos, inspection reports, timestamps, electronic records, and other documentation, and Prime Deals Rental may compare such records to determine the Vehicle's condition and assess documented charges authorized by this Agreement or applicable law; (e) to the fullest extent permitted by applicable law, an electronic signature, electronic acceptance, digital acknowledgment, checkbox, electronic initials, typed name, or other electronic indication of assent by the Renter shall have the same force and effect as a handwritten signature or initials; (f) electronic records maintained by Prime Deals Rental, including electronically signed or accepted agreements, timestamps, inspection records, photographs, videos, payment records, communications, and other records relating to the Rental Period, may be created, retained, reproduced, and used as evidence of the Renter's acceptance, obligations, performance, and transactions under this Agreement to the fullest extent permitted by applicable law; and (g) this Agreement creates no ownership interest in the Vehicle and the Renter agrees to be legally bound by its terms and conditions. The Renter further acknowledges that Prime Deals Rental may rely upon the Renter's representations, certifications, electronic acceptance, and records provided or maintained in connection with the Rental Period. Nothing in this acknowledgment shall waive, limit, or release any right, remedy, defense, or protection that cannot lawfully be waived, limited, or released."
  },
  {
    "t": "initial",
    "label": "Renter's Initials",
    "role": "renter"
  },
  {
    "t": "subhead",
    "text": "RENTER"
  },
  {
    "t": "sign",
    "label": "Renter's Signature",
    "role": "renter"
  },
  {
    "t": "field",
    "key": "printedName",
    "label": "Printed Name"
  },
  {
    "t": "field",
    "key": "date",
    "label": "Date"
  },
  {
    "t": "field",
    "key": "time",
    "label": "Time"
  },
  {
    "t": "checkboxes",
    "items": [
      "Electronic Signature / Acceptance (if applicable):",
      "Electronic Signature   Electronic Acceptance   Handwritten Signature"
    ]
  },
  {
    "t": "subhead",
    "text": "PRIME DEALS RENTAL REPRESENTATIVE"
  },
  {
    "t": "sign",
    "label": "Representative's Signature",
    "role": "rep"
  },
  {
    "t": "field",
    "key": "printedName",
    "label": "Printed Name"
  },
  {
    "t": "field",
    "key": "date",
    "label": "Date"
  },
  {
    "t": "field",
    "key": "time",
    "label": "Time"
  },
  {
    "t": "fieldline",
    "text": "Prime Deals Rental Representative Initials (if applicable): __________"
  },
  {
    "t": "part",
    "text": "PART VI — EXHIBITS AND ATTACHMENTS"
  },
  {
    "t": "exhibit",
    "text": "EXHIBIT A — FEE SCHEDULE"
  },
  {
    "t": "p",
    "text": "This Fee Schedule is incorporated into and made part of the Rental Agreement (“Agreement”). The charges below apply when the stated circumstances occur and are in addition to other amounts properly due under the Agreement. Where a charge is identified as “Actual Cost,” Prime Deals Rental may charge the documented reasonable cost actually incurred or reasonably necessary to address the applicable loss, damage, expense, violation, or service, together with any specifically stated fee. All charges are subject to the Agreement and applicable law and shall not be interpreted to permit recovery of any amount prohibited by applicable law."
  },
  {
    "t": "subhead",
    "text": "FEE SCHEDULE TERMS"
  },
  {
    "t": "p",
    "text": "(a) Late Returns. The scheduled return date and time are stated in the Agreement or Reservation. A return within the first sixty (60) minutes after the scheduled return time is subject to the applicable $100.00 late-return fee. A return more than sixty (60) minutes late without prior written approval may result in an additional rental day at the applicable daily rental rate, with each additional twenty-four (24) hour period subject to the applicable daily rental rate. Late-return charges do not limit Prime Deals Rental's right to pursue other remedies available under the Agreement or applicable law for failure to timely return the Vehicle."
  },
  {
    "t": "p",
    "text": "(b) After-Hours Returns. Where applicable and permitted by law, a Vehicle returned after Prime Deals Rental’s stated business hours may be subject to the after-hours fee listed above. If the Vehicle is left unattended, the Renter remains responsible for the Vehicle and any loss or damage until Prime Deals Rental takes possession and is able to inspect the Vehicle in accordance with the Agreement."
  },
  {
    "t": "p",
    "text": "(c) Actual Costs. Where this Fee Schedule states “Actual Cost,” Prime Deals Rental may charge the documented reasonable cost incurred or reasonably necessary to repair, replace, recover, clean, transport, store, inspect, remediate, or otherwise address the applicable loss, damage, expense, violation, or condition."
  },
  {
    "t": "p",
    "text": "(d) Government and Third-Party Charges. Taxes, governmental fees, tolls, parking charges, citations, fines, penalties, towing, impound charges, and other amounts imposed by a governmental authority or third party may be charged to the Renter, together with applicable processing or administrative fees stated in this Fee Schedule, to the extent permitted by law."
  },
  {
    "t": "p",
    "text": "(e) Damage and Loss. Damage, loss, theft, missing equipment, and Vehicle-related losses for which the Renter is responsible may be charged based on documented reasonable repair or replacement costs and other amounts recoverable under the Agreement or applicable law, including loss of use, diminished value, towing, recovery, storage, labor, diagnostics, and related expenses where permitted by law."
  },
  {
    "t": "p",
    "text": "(f) Smoking, Vaping, Marijuana, and Odor Remediation. Smoking, vaping, marijuana use, and the use of prohibited combustible or vapor-producing substances inside the Vehicle are prohibited. If documented evidence establishes prohibited use during the Rental Period, the Renter may be charged the $2,500.00 contractual fee listed above, together with documented reasonable cleaning, odor-remediation, repair, restoration, or related costs, to the fullest extent permitted by applicable law."
  },
  {
    "t": "p",
    "text": "(g) Post-Rental Charges. Charges or damage discovered after return may be assessed following inspection, documentation, and verification. Prime Deals Rental may apply the Security Deposit and/or charge the payment method on file for amounts properly due under the Agreement, including amounts identified after return and inspection, to the fullest extent permitted by applicable law."
  },
  {
    "t": "p",
    "text": "(h) Payment of Fees. Applicable fees and other amounts properly due may be charged to the payment method on file or deducted from the Security Deposit as provided in the Agreement."
  },
  {
    "t": "p",
    "text": "(i) Additional Recovery. The charges listed in this Exhibit do not limit Prime Deals Rental’s right to recover other documented damages, losses, fees, costs, expenses, or other amounts for which the Renter is responsible under the Agreement or applicable law."
  },
  {
    "t": "p",
    "text": "(j) No Duplicate Recovery. Prime Deals Rental will not recover the same loss or expense more than once. Where a specific fee and an actual documented cost apply to the same event, both may be assessed only to the extent permitted by the Agreement and applicable law and only where they compensate for separate losses, costs, services, or obligations."
  },
  {
    "t": "p",
    "text": "(k) Applicable Law. All fees and charges are subject to the Agreement and applicable federal, state, and local law. If any fee or charge exceeds the amount permitted by applicable law, it shall be reduced to the maximum amount lawfully permitted, without invalidating the remaining provisions of this Fee Schedule or the Agreement."
  },
  {
    "t": "exhibit",
    "text": "EXHIBIT B — VEHICLE INSPECTION REPORT"
  },
  {
    "t": "p",
    "text": "Pre-Rental Vehicle Inspection and Condition Documentation"
  },
  {
    "t": "p",
    "text": "Before the Vehicle is released to the Renter, Prime Deals Rental shall document the Vehicle’s condition through a Vehicle Inspection Report, timestamped photographs and/or video, mileage and fuel records, and other electronic or written records maintained in connection with the Rental Period. The inspection documentation may identify the Vehicle’s year, make, model, VIN, license plate, inspection date and time, starting mileage, fuel level, exterior and interior condition, tires and wheels, windshield and other glass, mirrors, lights, dashboard and warning indicators, and any existing damage, defects, missing equipment, accessories, keys, key fobs, charging cables, I-PASS/transponder, floor mats, manuals, or other property provided with the Vehicle. Photographs and/or video may document the front, rear, driver side, passenger side, hood, roof, trunk, windshield, rear glass, wheels and tires, exterior lights, interior, seats, dashboard, center console, odometer, fuel gauge, VIN, license plate, and any existing damage or condition requiring documentation. Prime Deals Rental may retain these records in its rental file and may compare them with the Vehicle’s condition following return."
  },
  {
    "t": "p",
    "text": "The Renter is solely responsible for carefully inspecting the Vehicle before taking possession and for reviewing the applicable Vehicle Inspection Report and available photographs and/or video. The Renter must immediately identify and report to Prime Deals Rental, before the Vehicle leaves Prime Deals Rental’s possession, any damage, defect, discrepancy, missing equipment, or other condition that is not accurately reflected in the pre-rental documentation. Unless a condition is documented by Prime Deals Rental or reported and acknowledged by Prime Deals Rental in writing before departure, the Renter acknowledges and accepts the Vehicle in the condition documented by Prime Deals Rental and agrees, to the fullest extent permitted by applicable law, that damage, loss, missing equipment, or other chargeable conditions not documented before departure may be attributed to the Rental Period."
  },
  {
    "t": "p",
    "text": "The Renter remains responsible for the Vehicle throughout the Rental Period as provided by this Agreement, including responsibility for damage, loss, theft, missing equipment, improper use, and other charges for which the Renter is responsible under the Agreement or applicable law. Prime Deals Rental may conduct a post-return inspection and compare the Vehicle’s condition with the pre-rental inspection report, photographs, video, mileage and fuel records, and other documentation to identify and document any new damage, loss, missing equipment, excessive cleaning, improper condition, or other chargeable event. Prime Deals Rental may obtain photographs and/or video, written damage reports, repair estimates, invoices, receipts, and other supporting documentation as reasonably necessary to document and verify post-rental charges. To the fullest extent permitted by applicable law, the pre-rental and post-return inspection records, timestamped photographs and videos, electronic records, mileage and fuel records, repair estimates, invoices, communications, and other records maintained by Prime Deals Rental may be used as evidence of the Vehicle’s condition before, during, and after the Rental Period and to support applicable damage, loss, payment, insurance, collection, recovery, or other claims under the Agreement or applicable law."
  },
  {
    "t": "exhibit",
    "text": "EXHIBIT C — DAMAGE ACKNOWLEDGMENT & FINANCIAL RESPONSIBILITY"
  },
  {
    "t": "p",
    "text": "This Damage Acknowledgment & Financial Responsibility form is incorporated into and made part of the Rental Agreement (“Agreement”) between the Renter and Prime Deals Rental. Before taking possession of the Vehicle, the Renter is responsible for inspecting the Vehicle and reviewing the applicable Vehicle Inspection Report, timestamped photographs and/or video, and other condition records provided or made available by Prime Deals Rental. The Renter must identify and report any pre-existing damage, defect, discrepancy, or missing equipment that is not accurately reflected in the pre-rental documentation before the Vehicle leaves Prime Deals Rental’s possession."
  },
  {
    "t": "p",
    "text": "Unless otherwise documented and reported before departure, the Renter acknowledges and accepts the Vehicle in the condition documented by Prime Deals Rental and agrees that damage, loss, theft, missing equipment, or other conditions not documented before the Vehicle leaves Prime Deals Rental’s possession may be attributed to the Rental Period, to the fullest extent permitted by applicable law. The Renter is responsible, to the fullest extent permitted by applicable law, for loss of, theft of, or damage to the Vehicle and its equipment, accessories, keys, key fobs, charging cables, I-PASS/transponder, and other property provided with the Vehicle occurring during the Rental Period, except to the extent liability is expressly excluded or limited by the Agreement or applicable law."
  },
  {
    "t": "p",
    "text": "Following return of the Vehicle, Prime Deals Rental may inspect the Vehicle and compare its condition with the pre-rental inspection report, timestamped photographs and/or video, mileage and fuel records, and other documentation maintained by Prime Deals Rental. Prime Deals Rental may document any new damage, loss, missing equipment, excessive wear, cleaning requirement, mechanical or other condition and may obtain photographs, video, inspection reports, repair estimates, invoices, or other supporting documentation. Charges arising from damage, loss, theft, missing equipment, cleaning, recovery, repair, replacement, or other responsibility of the Renter may be assessed after return and inspection and may be charged to the payment method on file or applied against the Security Deposit as provided in the Agreement, to the fullest extent permitted by applicable law."
  },
  {
    "t": "p",
    "text": "The Renter acknowledges that Prime Deals Rental’s photographs, videos, inspection reports, timestamps, mileage records, fuel records, repair estimates, invoices, electronic records, and other documentation may be used to establish and compare the Vehicle’s condition before and after the Rental Period and to support any applicable damage, loss, payment, insurance, collection, or other claim permitted by the Agreement and applicable law. The Renter agrees to promptly notify Prime Deals Rental of any accident, theft, vandalism, mechanical incident, towing, impoundment, or other event involving the Vehicle as required by the Agreement and to cooperate with any resulting investigation or claim."
  },
  {
    "t": "p",
    "text": "Nothing in this acknowledgment limits Prime Deals Rental’s rights or remedies under the Agreement or applicable law, and nothing in this form requires the Renter to waive any right, defense, remedy, limitation, or protection that cannot lawfully be waived."
  },
  {
    "t": "sign",
    "label": "Renter’s Signature",
    "role": "renter"
  },
  {
    "t": "field",
    "key": "printedName",
    "label": "Printed Name"
  },
  {
    "t": "field",
    "key": "date",
    "label": "Date"
  },
  {
    "t": "subhead",
    "text": "PRE-RENTAL CONDITION ACKNOWLEDGMENT"
  },
  {
    "t": "checkboxes",
    "items": [
      "Renter reviewed the Vehicle Inspection Report.",
      "Renter reviewed the available timestamped photographs and/or video.",
      "Existing damage was identified and documented before departure.",
      "No additional pre-existing damage or condition was reported before departure.",
      "Missing equipment/accessories were identified and documented, if applicable."
    ]
  },
  {
    "t": "sign",
    "label": "Renter’s Signature",
    "role": "renter"
  },
  {
    "t": "field",
    "key": "printedName",
    "label": "Printed Name"
  },
  {
    "t": "field",
    "key": "date",
    "label": "Date"
  },
  {
    "t": "subhead",
    "text": "RENTER ACKNOWLEDGMENT"
  },
  {
    "t": "p",
    "text": "By signing below, I acknowledge that I had a reasonable opportunity to inspect the Vehicle and review the applicable pre-rental inspection documentation, photographs, and/or video before taking possession. I acknowledge that I reported any pre-existing damage, defect, discrepancy, or missing equipment known to me before the Vehicle left Prime Deals Rental’s possession. Except as specifically documented above or otherwise accepted by Prime Deals Rental in writing, I acknowledge the Vehicle in its documented condition and understand that damage, loss, theft, or missing equipment not documented before departure may be attributed to the Rental Period to the fullest extent permitted by applicable law. I understand that Prime Deals Rental may inspect the Vehicle after return, compare its condition with the pre-rental documentation, and assess documented charges for which I am responsible under the Agreement and applicable law. I further acknowledge that this form supplements the Rental Agreement and does not replace or limit any applicable obligations, fees, charges, or remedies contained in the Agreement."
  },
  {
    "t": "sign",
    "label": "Renter’s Signature",
    "role": "renter"
  },
  {
    "t": "field",
    "key": "printedName",
    "label": "Printed Name"
  },
  {
    "t": "field",
    "key": "date",
    "label": "Date"
  },
  {
    "t": "exhibit",
    "text": "EXHIBIT D — PAYMENT CARD / PAYMENT AUTHORIZATION TERMS"
  },
  {
    "t": "p",
    "text": "I authorize Prime Deals Rental to obtain a pre-authorization hold on the payment card or other payment method I provide before or during the Rental Period for rental charges, the Security Deposit, estimated charges, and other amounts permitted under the Rental Agreement. I understand that a pre-authorization hold is not a completed charge and that the release of any unused funds or available credit is determined by my financial institution or payment provider. I authorize Prime Deals Rental to charge the payment method I provide for all amounts properly due under the Rental Agreement, including rental charges, approved extensions, Security Deposit obligations, damage, loss, theft, loss of use or diminished value where permitted by applicable law, fuel, excess mileage, tolls, parking or traffic-related charges, cleaning, smoke or odor remediation, lost or damaged keys or key fobs, missing equipment or accessories, towing, storage, vehicle recovery, applicable administrative fees, returned-payment charges, collection costs recoverable under applicable law, and other documented fees, costs, damages, or expenses authorized by the Rental Agreement or applicable law. I further authorize Prime Deals Rental to process charges identified after the Vehicle is returned and inspected, including charges for damage, loss, missing equipment, cleaning, mileage, fuel, tolls, violations, or other amounts properly due under the Rental Agreement. I understand that I remain responsible for all amounts properly due under the Rental Agreement even if a pre-authorization hold is released, expires, or is insufficient to cover the amount due. I authorize Prime Deals Rental to apply the Security Deposit and/or charge the payment method on file for amounts properly due under the Rental Agreement, to the fullest extent permitted by applicable law. An itemized statement of post-rental charges will be provided upon request. Nothing in this authorization permits Prime Deals Rental to charge or recover any amount prohibited by applicable law."
  },
  {
    "t": "subhead",
    "text": "RENTER PAYMENT AUTHORIZATION"
  },
  {
    "t": "p",
    "text": "By signing below, I acknowledge that I have read and understand the Payment Card / Payment Authorization Terms above and expressly authorize Prime Deals Rental to process my payment method as provided in these terms and the Rental Agreement."
  },
  {
    "t": "sign",
    "label": "Renter’s Signature",
    "role": "renter"
  },
  {
    "t": "field",
    "key": "printedName",
    "label": "Printed Name"
  },
  {
    "t": "field",
    "key": "date",
    "label": "Date"
  },
  {
    "t": "exhibit",
    "text": "EXHIBIT E — AUTHORIZED DRIVER FORM"
  },
  {
    "t": "p",
    "text": "This Authorized Driver Form is incorporated into and made part of the Rental Agreement (“Agreement”). Only the Renter and individuals expressly identified and approved as Authorized Drivers by Prime Deals Rental may operate the Vehicle. Each Authorized Driver must satisfy all eligibility, licensing, identification, insurance, and other requirements applicable under the Agreement and applicable law. The Renter remains responsible for ensuring that no unauthorized person operates the Vehicle and remains responsible for all obligations, liabilities, damage, loss, charges, and other amounts arising from the Vehicle’s use or operation by the Renter or any Authorized Driver, to the fullest extent permitted by applicable law. Prime Deals Rental may refuse or revoke authorization for any driver who does not satisfy its requirements or applicable law."
  },
  {
    "t": "subhead",
    "text": "RENTER INFORMATION"
  },
  {
    "t": "fieldline",
    "text": "Renter’s Full Legal Name: ___________________________________________"
  },
  {
    "t": "fieldline",
    "text": "Driver’s License/ID Number: _________________________________________"
  },
  {
    "t": "fieldline",
    "text": "State/Country Issued: ___________________ Expiration: ________________"
  },
  {
    "t": "subhead",
    "text": "AUTHORIZED DRIVER INFORMATION"
  },
  {
    "t": "fieldline",
    "text": "Authorized Driver’s Full Legal Name: __________________________________"
  },
  {
    "t": "fieldline",
    "text": "Date of Birth: ______________________"
  },
  {
    "t": "fieldline",
    "text": "Driver’s License/ID Number: _________________________________________"
  },
  {
    "t": "fieldline",
    "text": "State/Country Issued: ___________________ Expiration: ________________"
  },
  {
    "t": "fieldline",
    "text": "Address: ___________________________________________________________"
  },
  {
    "t": "fieldline",
    "text": "Phone Number: _____________________________________________________"
  },
  {
    "t": "subhead",
    "text": "IDENTIFICATION & ELIGIBILITY VERIFICATION"
  },
  {
    "t": "checkboxes",
    "items": [
      "Valid Driver’s License Verified",
      "Government-Issued Photo Identification Verified",
      "Required Insurance Information Verified, if applicable",
      "Driver Meets Prime Deals Rental’s Eligibility Requirements",
      "Driver Approved by Prime Deals Rental"
    ]
  },
  {
    "t": "subhead",
    "text": "AUTHORIZED DRIVER ACKNOWLEDGMENT"
  },
  {
    "t": "p",
    "text": "I certify that the information I have provided is true, complete, current, and accurate. I acknowledge that I have been provided a reasonable opportunity to review the applicable terms of the Rental Agreement governing my operation of the Vehicle and agree to comply with all requirements applicable to an Authorized Driver. I understand that I may operate the Vehicle only during the Rental Period and only as permitted by the Agreement and applicable law. I understand that I may not permit any other person to operate the Vehicle unless that person is separately approved as an Authorized Driver by Prime Deals Rental. I acknowledge that authorization to operate the Vehicle does not create any ownership interest or other property interest in the Vehicle."
  },
  {
    "t": "sign",
    "label": "Authorized Driver’s Signature",
    "role": "driver"
  },
  {
    "t": "field",
    "key": "printedName",
    "label": "Printed Name"
  },
  {
    "t": "field",
    "key": "date",
    "label": "Date"
  },
  {
    "t": "subhead",
    "text": "RENTER ACKNOWLEDGMENT"
  },
  {
    "t": "p",
    "text": "I acknowledge that the individual identified above is an Authorized Driver approved by Prime Deals Rental. I understand that adding an Authorized Driver does not release, reduce, or transfer my responsibilities under the Rental Agreement. I remain responsible, to the fullest extent permitted by applicable law, for the Vehicle and for obligations, damage, loss, charges, and other liabilities arising from its use or operation by an Authorized Driver."
  },
  {
    "t": "sign",
    "label": "Renter’s Signature",
    "role": "renter"
  },
  {
    "t": "field",
    "key": "printedName",
    "label": "Printed Name"
  },
  {
    "t": "field",
    "key": "date",
    "label": "Date"
  },
  {
    "t": "subhead",
    "text": "PRIME DEALS RENTAL APPROVAL"
  },
  {
    "t": "checkboxes",
    "items": [
      "Authorized Driver Approved:  Yes  No"
    ]
  },
  {
    "t": "fieldline",
    "text": "Prime Deals Rental Representative: __________________________________"
  },
  {
    "t": "sign",
    "label": "Representative Signature",
    "role": "rep"
  },
  {
    "t": "field",
    "key": "date",
    "label": "Date"
  },
  {
    "t": "exhibit",
    "text": "EXHIBIT F — POST-RENTAL VEHICLE INSPECTION / RETURN REPORT"
  },
  {
    "t": "p",
    "text": "For Prime Deals Rental internal staff."
  }
]
};
