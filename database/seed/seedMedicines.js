/**
 * MediCare - Comprehensive Medicine Catalog Database Seeder
 * Populates MongoDB with 325+ demo pharmacy products across 13 certified categories:
 * Tablets, Capsules, Syrups, Tonics, Serums, Injections, Creams, Gels, ORS,
 * First Aid, Vitamins, Supplements, and Baby Care.
 *
 * Safe and Repeatable: Uses upsert on unique product names to avoid duplicates.
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../backend/.env') });

const brands = [
  'Cipla Health Demo',
  'Sun Pharma Demo',
  "Dr. Reddy's Demo",
  'Abbott Healthcare Demo',
  'Zydus Lifesciences Demo',
  'Mankind Pharma Demo',
  'Torrent Pharma Demo',
  'Lupin Pharmaceuticals Demo',
  'Glenmark Health Demo',
  'Alkem Laboratories Demo',
  'Himalaya Wellness Demo',
  'Dabur Healthcare Demo',
  'Patanjali Bio Demo',
  'Johnson & Baby Demo',
  'Sebamed Derma Demo',
  'Piramal Pharma Demo'
];

// Helper to generate demo products
const createProduct = ({
  name,
  genericName,
  category,
  dosageForm,
  strength,
  price,
  originalPrice,
  requiresPrescription = false,
  stockQuantity = 120,
  brandIdx = 0,
  desc,
  imageUrl,
}) => {
  const brand = brands[brandIdx % brands.length];
  const orig = originalPrice || Math.round(price * 1.25);
  const discount = Math.round(((orig - price) / orig) * 100);

  return {
    name: `${name} (Demo)`,
    genericName,
    brand,
    manufacturer: `${brand} Labs Ltd.`,
    category,
    dosageForm,
    strength,
    price,
    originalPrice: orig,
    discountPercentage: discount,
    stockQuantity,
    requiresPrescription,
    isAvailable: stockQuantity > 0,
    description: desc || `Demo Inventory: Standard pharmaceutical preparation categorized under ${category}. Quality tested & certified distributor batch.`,
    expiryDate: new Date('2028-08-30'),
    imageUrl: imageUrl || `/images/categories/${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}.svg`,
  };
};

const rawCatalog = [
  // ==================== 1. TABLETS (25) ====================
  createProduct({ name: 'Paracip 500mg Tablets', genericName: 'Paracetamol 500mg', category: 'Tablets', dosageForm: 'Tablet', strength: '500mg', price: 42, originalPrice: 50, stockQuantity: 280, brandIdx: 0 }),
  createProduct({ name: 'Dolo-650 Paracetamol Tablets', genericName: 'Paracetamol 650mg', category: 'Tablets', dosageForm: 'Tablet', strength: '650mg', price: 32, originalPrice: 38, stockQuantity: 350, brandIdx: 1 }),
  createProduct({ name: 'Brufen 400mg Pain Relief', genericName: 'Ibuprofen 400mg', category: 'Tablets', dosageForm: 'Tablet', strength: '400mg', price: 28, originalPrice: 35, stockQuantity: 190, brandIdx: 2 }),
  createProduct({ name: 'Cetzine 10mg Allergy Relief', genericName: 'Cetirizine HCl 10mg', category: 'Tablets', dosageForm: 'Tablet', strength: '10mg', price: 45, originalPrice: 55, stockQuantity: 240, brandIdx: 3 }),
  createProduct({ name: 'Levocet 5mg Non-Drowsy Tabs', genericName: 'Levocetirizine 5mg', category: 'Tablets', dosageForm: 'Tablet', strength: '5mg', price: 58, originalPrice: 70, stockQuantity: 180, brandIdx: 4 }),
  createProduct({ name: 'Pan-40 Gastro-Resistant Tabs', genericName: 'Pantoprazole 40mg', category: 'Tablets', dosageForm: 'Tablet', strength: '40mg', price: 110, originalPrice: 135, requiresPrescription: true, stockQuantity: 220, brandIdx: 5 }),
  createProduct({ name: 'Razo 20mg Acidity Reducer', genericName: 'Rabeprazole Sodium 20mg', category: 'Tablets', dosageForm: 'Tablet', strength: '20mg', price: 95, originalPrice: 120, requiresPrescription: true, stockQuantity: 160, brandIdx: 6 }),
  createProduct({ name: 'Glycomet 500mg Diabetes Care', genericName: 'Metformin HCl 500mg', category: 'Tablets', dosageForm: 'Tablet', strength: '500mg', price: 48, originalPrice: 60, requiresPrescription: true, stockQuantity: 310, brandIdx: 7 }),
  createProduct({ name: 'Amaryl 1mg Blood Sugar Tabs', genericName: 'Glimepiride 1mg', category: 'Tablets', dosageForm: 'Tablet', strength: '1mg', price: 65, originalPrice: 80, requiresPrescription: true, stockQuantity: 140, brandIdx: 8 }),
  createProduct({ name: 'Telma 40mg BP Control', genericName: 'Telmisartan 40mg', category: 'Tablets', dosageForm: 'Tablet', strength: '40mg', price: 125, originalPrice: 155, requiresPrescription: true, stockQuantity: 200, brandIdx: 9 }),
  createProduct({ name: 'Amlong 5mg Hypertension Tabs', genericName: 'Amlodipine Besylate 5mg', category: 'Tablets', dosageForm: 'Tablet', strength: '5mg', price: 38, originalPrice: 48, requiresPrescription: true, stockQuantity: 175, brandIdx: 10 }),
  createProduct({ name: 'Atorva 10mg Cholesterol Care', genericName: 'Atorvastatin 10mg', category: 'Tablets', dosageForm: 'Tablet', strength: '10mg', price: 85, originalPrice: 105, requiresPrescription: true, stockQuantity: 190, brandIdx: 11 }),
  createProduct({ name: 'Montair-LC Anti-Allergy Tabs', genericName: 'Montelukast + Levocetirizine', category: 'Tablets', dosageForm: 'Tablet', strength: '10mg+5mg', price: 165, originalPrice: 200, requiresPrescription: true, stockQuantity: 150, brandIdx: 0 }),
  createProduct({ name: 'Azee 500mg Antibiotic Tabs', genericName: 'Azithromycin 500mg', category: 'Tablets', dosageForm: 'Tablet', strength: '500mg', price: 120, originalPrice: 145, requiresPrescription: true, stockQuantity: 130, brandIdx: 1 }),
  createProduct({ name: 'Taxim-O 200mg Bacterial Care', genericName: 'Cefixime 200mg', category: 'Tablets', dosageForm: 'Tablet', strength: '200mg', price: 145, originalPrice: 175, requiresPrescription: true, stockQuantity: 110, brandIdx: 2 }),
  createProduct({ name: 'Zenflox 200mg Tablets', genericName: 'Ofloxacin 200mg', category: 'Tablets', dosageForm: 'Tablet', strength: '200mg', price: 78, originalPrice: 95, requiresPrescription: true, stockQuantity: 140, brandIdx: 3 }),
  createProduct({ name: 'Ciplox 500mg Antimicrobial', genericName: 'Ciprofloxacin 500mg', category: 'Tablets', dosageForm: 'Tablet', strength: '500mg', price: 52, originalPrice: 65, requiresPrescription: true, stockQuantity: 160, brandIdx: 0 }),
  createProduct({ name: 'Voveran 50mg Pain Relief', genericName: 'Diclofenac Sodium 50mg', category: 'Tablets', dosageForm: 'Tablet', strength: '50mg', price: 44, originalPrice: 55, stockQuantity: 210, brandIdx: 4 }),
  createProduct({ name: 'Zerodol-SP Triple Action Tabs', genericName: 'Aceclofenac + Paracetamol + Serratiopeptidase', category: 'Tablets', dosageForm: 'Tablet', strength: '100mg+325mg+15mg', price: 98, originalPrice: 120, stockQuantity: 270, brandIdx: 5 }),
  createProduct({ name: 'Domstal 10mg Anti-Nausea', genericName: 'Domperidone 10mg', category: 'Tablets', dosageForm: 'Tablet', strength: '10mg', price: 40, originalPrice: 50, stockQuantity: 190, brandIdx: 6 }),
  createProduct({ name: 'Emeset 4mg Nausea Relief', genericName: 'Ondansetron 4mg', category: 'Tablets', dosageForm: 'Tablet', strength: '4mg', price: 55, originalPrice: 68, requiresPrescription: true, stockQuantity: 130, brandIdx: 7 }),
  createProduct({ name: 'Rantac 150mg Stomach Acid Care', genericName: 'Ranitidine 150mg', category: 'Tablets', dosageForm: 'Tablet', strength: '150mg', price: 35, originalPrice: 42, stockQuantity: 180, brandIdx: 8 }),
  createProduct({ name: 'Folvite 5mg Folic Acid Tabs', genericName: 'Folic Acid 5mg', category: 'Tablets', dosageForm: 'Tablet', strength: '5mg', price: 65, originalPrice: 78, stockQuantity: 220, brandIdx: 9 }),
  createProduct({ name: 'Shelcal 500mg Calcium & D3', genericName: 'Calcium Carbonate 500mg + Vit D3', category: 'Tablets', dosageForm: 'Tablet', strength: '500mg+250IU', price: 115, originalPrice: 140, stockQuantity: 300, brandIdx: 10 }),
  createProduct({ name: 'Supradyn Daily Multi-Nutrient', genericName: 'Multivitamin with Minerals & Trace Elements', category: 'Tablets', dosageForm: 'Tablet', strength: 'Daily Complex', price: 52, originalPrice: 62, stockQuantity: 380, brandIdx: 11 }),

  // ==================== 2. CAPSULES (25) ====================
  createProduct({ name: 'Omez 20mg Antacid Capsules', genericName: 'Omeprazole 20mg', category: 'Capsules', dosageForm: 'Capsule', strength: '20mg', price: 62, originalPrice: 75, stockQuantity: 290, brandIdx: 2 }),
  createProduct({ name: 'Nexpro 40mg Acid Reflux Caps', genericName: 'Esomeprazole Magnesium 40mg', category: 'Capsules', dosageForm: 'Capsule', strength: '40mg', price: 135, originalPrice: 160, requiresPrescription: true, stockQuantity: 140, brandIdx: 0 }),
  createProduct({ name: 'Rabium-DSR Dual Release Caps', genericName: 'Rabeprazole + Domperidone SR', category: 'Capsules', dosageForm: 'Capsule', strength: '20mg+30mg', price: 185, originalPrice: 220, requiresPrescription: true, stockQuantity: 210, brandIdx: 3 }),
  createProduct({ name: 'Pantocid-DSR Sustained Release', genericName: 'Pantoprazole + Domperidone SR', category: 'Capsules', dosageForm: 'Capsule', strength: '40mg+30mg', price: 198, originalPrice: 240, requiresPrescription: true, stockQuantity: 190, brandIdx: 1 }),
  createProduct({ name: 'Novamox 500mg Antibacterial', genericName: 'Amoxicillin 500mg', category: 'Capsules', dosageForm: 'Capsule', strength: '500mg', price: 82, originalPrice: 100, requiresPrescription: true, stockQuantity: 160, brandIdx: 4 }),
  createProduct({ name: 'Amoxil 250mg Pediatric Caps', genericName: 'Amoxicillin 250mg', category: 'Capsules', dosageForm: 'Capsule', strength: '250mg', price: 55, originalPrice: 68, requiresPrescription: true, stockQuantity: 130, brandIdx: 5 }),
  createProduct({ name: 'Doxt-SL 100mg Doxycycline', genericName: 'Doxycycline 100mg + Lactic Acid Bacillus', category: 'Capsules', dosageForm: 'Capsule', strength: '100mg', price: 92, originalPrice: 112, requiresPrescription: true, stockQuantity: 140, brandIdx: 6 }),
  createProduct({ name: 'Sporidex 500mg Cephalexin', genericName: 'Cephalexin 500mg', category: 'Capsules', dosageForm: 'Capsule', strength: '500mg', price: 180, originalPrice: 215, requiresPrescription: true, stockQuantity: 110, brandIdx: 7 }),
  createProduct({ name: 'Dalacin C 300mg Clindamycin', genericName: 'Clindamycin HCl 300mg', category: 'Capsules', dosageForm: 'Capsule', strength: '300mg', price: 290, originalPrice: 345, requiresPrescription: true, stockQuantity: 95, brandIdx: 8 }),
  createProduct({ name: 'Canditral 100mg Antifungal', genericName: 'Itraconazole 100mg', category: 'Capsules', dosageForm: 'Capsule', strength: '100mg', price: 165, originalPrice: 200, requiresPrescription: true, stockQuantity: 150, brandIdx: 9 }),
  createProduct({ name: 'Itramec 200mg Fungus Fighter', genericName: 'Itraconazole 200mg', category: 'Capsules', dosageForm: 'Capsule', strength: '200mg', price: 280, originalPrice: 340, requiresPrescription: true, stockQuantity: 120, brandIdx: 10 }),
  createProduct({ name: 'Pregalin 75mg Nerve Care Caps', genericName: 'Pregabalin 75mg', category: 'Capsules', dosageForm: 'Capsule', strength: '75mg', price: 145, originalPrice: 175, requiresPrescription: true, stockQuantity: 115, brandIdx: 11 }),
  createProduct({ name: 'Gabapin 300mg Neuropathy Caps', genericName: 'Gabapentin 300mg', category: 'Capsules', dosageForm: 'Capsule', strength: '300mg', price: 160, originalPrice: 195, requiresPrescription: true, stockQuantity: 105, brandIdx: 0 }),
  createProduct({ name: 'Evion 400mg Vitamin E Softgels', genericName: 'Tocopheryl Acetate 400mg', category: 'Capsules', dosageForm: 'Softgel Capsule', strength: '400mg', price: 38, originalPrice: 45, stockQuantity: 420, brandIdx: 1 }),
  createProduct({ name: 'Becosules Z B-Complex & Zinc', genericName: 'B-Complex + Vitamin C + Zinc', category: 'Capsules', dosageForm: 'Capsule', strength: 'High Potency', price: 46, originalPrice: 54, stockQuantity: 360, brandIdx: 2 }),
  createProduct({ name: 'Autrin Iron & Folic Acid Caps', genericName: 'Ferrous Fumarate + Folic Acid + B12', category: 'Capsules', dosageForm: 'Capsule', strength: 'Hematrap Complex', price: 125, originalPrice: 150, stockQuantity: 210, brandIdx: 3 }),
  createProduct({ name: 'Silybon 140mg Liver Guard', genericName: 'Silymarin Milk Thistle Extract 140mg', category: 'Capsules', dosageForm: 'Capsule', strength: '140mg', price: 230, originalPrice: 275, stockQuantity: 130, brandIdx: 4 }),
  createProduct({ name: 'Darolac Multi-Strain Probiotic', genericName: 'Lactobacillus & Bifidobacterium Complex', category: 'Capsules', dosageForm: 'Capsule', strength: '1.25 Billion Spores', price: 115, originalPrice: 140, stockQuantity: 240, brandIdx: 5 }),
  createProduct({ name: 'Primosa 1000 Evening Primrose', genericName: 'Evening Primrose Oil 1000mg', category: 'Capsules', dosageForm: 'Softgel Capsule', strength: '1000mg', price: 340, originalPrice: 410, stockQuantity: 90, brandIdx: 6 }),
  createProduct({ name: 'Maxepa Omega-3 Fish Oil', genericName: 'EPA 180mg + DHA 120mg Fish Oil', category: 'Capsules', dosageForm: 'Softgel Capsule', strength: '1000mg', price: 320, originalPrice: 390, stockQuantity: 180, brandIdx: 7 }),
  createProduct({ name: 'Revital H Daily Energy Caps', genericName: 'Ginseng with 9 Vitamins & 8 Minerals', category: 'Capsules', dosageForm: 'Softgel Capsule', strength: 'Daily Vitality', price: 110, originalPrice: 130, stockQuantity: 330, brandIdx: 8 }),
  createProduct({ name: 'CoQ-10 100mg Heart Energy', genericName: 'Coenzyme Q10 100mg', category: 'Capsules', dosageForm: 'Softgel Capsule', strength: '100mg', price: 480, originalPrice: 580, stockQuantity: 85, brandIdx: 9 }),
  createProduct({ name: 'Curcutop 500mg Turmeric Extract', genericName: 'Curcumin 95% + Piperine', category: 'Capsules', dosageForm: 'Capsule', strength: '500mg', price: 260, originalPrice: 320, stockQuantity: 140, brandIdx: 10 }),
  createProduct({ name: 'Uti-Shield Cranberry Extract', genericName: 'Pure Cranberry Extract + D-Mannose', category: 'Capsules', dosageForm: 'Capsule', strength: '300mg+200mg', price: 350, originalPrice: 420, stockQuantity: 110, brandIdx: 11 }),
  createProduct({ name: 'Ashwagandha Gold Pure Caps', genericName: 'Withania Somnifera Extract 500mg', category: 'Capsules', dosageForm: 'Capsule', strength: '500mg', price: 195, originalPrice: 240, stockQuantity: 260, brandIdx: 12 }),

  // ==================== 3. SYRUPS (25) ====================
  createProduct({ name: 'Benadryl DR Cough Syrup 100ml', genericName: 'Dextromethorphan HBr 15mg/5ml', category: 'Syrups', dosageForm: 'Syrup', strength: '100ml', price: 125, originalPrice: 145, stockQuantity: 210, brandIdx: 13 }),
  createProduct({ name: 'Ascoril LS Expectorant 100ml', genericName: 'Levosalbutamol + Ambroxol + Guaiphenesin', category: 'Syrups', dosageForm: 'Syrup', strength: '100ml', price: 118, originalPrice: 140, stockQuantity: 240, brandIdx: 0 }),
  createProduct({ name: 'Calpol Pediatric Suspension 60ml', genericName: 'Paracetamol 250mg/5ml Suspension', category: 'Syrups', dosageForm: 'Suspension', strength: '60ml', price: 48, originalPrice: 58, stockQuantity: 310, brandIdx: 1 }),
  createProduct({ name: 'Ibugesic Plus Oral Suspension', genericName: 'Ibuprofen 100mg + Paracetamol 162.5mg', category: 'Syrups', dosageForm: 'Suspension', strength: '100ml', price: 42, originalPrice: 52, stockQuantity: 220, brandIdx: 2 }),
  createProduct({ name: 'Alerid Cold & Allergy Syrup', genericName: 'Cetirizine Hydrochloride 5mg/5ml', category: 'Syrups', dosageForm: 'Syrup', strength: '60ml', price: 54, originalPrice: 65, stockQuantity: 180, brandIdx: 3 }),
  createProduct({ name: 'Phenergan 5mg Anti-Nausea Syrup', genericName: 'Promethazine HCl 5mg/5ml', category: 'Syrups', dosageForm: 'Syrup', strength: '100ml', price: 45, originalPrice: 55, requiresPrescription: true, stockQuantity: 130, brandIdx: 4 }),
  createProduct({ name: 'Sucrafil O Gel Suspension 200ml', genericName: 'Sucralfate 1g + Oxetacaine 20mg', category: 'Syrups', dosageForm: 'Suspension', strength: '200ml', price: 210, originalPrice: 250, stockQuantity: 140, brandIdx: 5 }),
  createProduct({ name: 'A-Z Multivitamin Syrup 200ml', genericName: 'Multivitamin & Zinc Dietary Syrup', category: 'Syrups', dosageForm: 'Syrup', strength: '200ml', price: 165, originalPrice: 195, stockQuantity: 190, brandIdx: 6 }),
  createProduct({ name: 'Dexorange Iron Tonic Syrup 200ml', genericName: 'Ferric Ammonium Citrate + B12 + Folate', category: 'Syrups', dosageForm: 'Syrup', strength: '200ml', price: 160, originalPrice: 185, stockQuantity: 290, brandIdx: 7 }),
  createProduct({ name: 'Zinconia Oral Zinc Drops 50ml', genericName: 'Zinc Acetate Solution 20mg/ml', category: 'Syrups', dosageForm: 'Syrup', strength: '50ml', price: 62, originalPrice: 75, stockQuantity: 170, brandIdx: 8 }),
  createProduct({ name: 'Practin Hunger Stimulant Syrup', genericName: 'Cyproheptadine HCl 2mg/5ml', category: 'Syrups', dosageForm: 'Syrup', strength: '200ml', price: 135, originalPrice: 160, requiresPrescription: true, stockQuantity: 120, brandIdx: 9 }),
  createProduct({ name: 'Digene Mint Antacid Liquid 200ml', genericName: 'Magnesium Hydroxide + Aluminium + Simethicone', category: 'Syrups', dosageForm: 'Suspension', strength: '200ml', price: 145, originalPrice: 165, stockQuantity: 340, brandIdx: 10 }),
  createProduct({ name: 'Duphalac Constipation Care Syrup', genericName: 'Lactulose Oral Solution 3.33g/5ml', category: 'Syrups', dosageForm: 'Solution', strength: '200ml', price: 275, originalPrice: 320, stockQuantity: 160, brandIdx: 11 }),
  createProduct({ name: 'Cremaffin Mixed Fruit Laxative', genericName: 'Liquid Paraffin + Milk of Magnesia', category: 'Syrups', dosageForm: 'Suspension', strength: '225ml', price: 195, originalPrice: 230, stockQuantity: 210, brandIdx: 0 }),
  createProduct({ name: 'Honitus Ayurvedic Honey Syrup', genericName: 'Tulsi, Mulethi & Banapsha Herbal Base', category: 'Syrups', dosageForm: 'Syrup', strength: '100ml', price: 85, originalPrice: 98, stockQuantity: 380, brandIdx: 11 }),
  createProduct({ name: 'Becozinc Nutritional Liquid 200ml', genericName: 'B-Complex with L-Lysine & Zinc', category: 'Syrups', dosageForm: 'Syrup', strength: '200ml', price: 120, originalPrice: 145, stockQuantity: 200, brandIdx: 1 }),
  createProduct({ name: 'Shelcal Pediatric Suspension 100ml', genericName: 'Calcium Carbonate + Vit D3 Liquid', category: 'Syrups', dosageForm: 'Suspension', strength: '100ml', price: 92, originalPrice: 110, stockQuantity: 230, brandIdx: 2 }),
  createProduct({ name: 'Citralka Urine Alkalinizer 100ml', genericName: 'Disodium Hydrogen Citrate 1.4g/5ml', category: 'Syrups', dosageForm: 'Solution', strength: '100ml', price: 105, originalPrice: 125, stockQuantity: 175, brandIdx: 3 }),
  createProduct({ name: 'Domstal Baby Oral Drops 30ml', genericName: 'Domperidone Pediatric 1mg/ml', category: 'Syrups', dosageForm: 'Drops', strength: '30ml', price: 48, originalPrice: 60, requiresPrescription: true, stockQuantity: 150, brandIdx: 4 }),
  createProduct({ name: 'Ondem Pediatric Oral Syrup 30ml', genericName: 'Ondansetron 2mg/5ml Solution', category: 'Syrups', dosageForm: 'Syrup', strength: '30ml', price: 42, originalPrice: 52, requiresPrescription: true, stockQuantity: 140, brandIdx: 5 }),
  createProduct({ name: 'Zifi 50mg Dry Syrup 30ml', genericName: 'Cefixime Oral Suspension 50mg/5ml', category: 'Syrups', dosageForm: 'Dry Syrup', strength: '30ml', price: 68, originalPrice: 82, requiresPrescription: true, stockQuantity: 120, brandIdx: 6 }),
  createProduct({ name: 'Augmentin Duo Dry Syrup 30ml', genericName: 'Amoxicillin + Potassium Clavulanate', category: 'Syrups', dosageForm: 'Dry Syrup', strength: '30ml', price: 75, originalPrice: 90, requiresPrescription: true, stockQuantity: 135, brandIdx: 7 }),
  createProduct({ name: 'Aziwok 100mg Pediatric Syrup', genericName: 'Azithromycin Suspension 100mg/5ml', category: 'Syrups', dosageForm: 'Suspension', strength: '15ml', price: 58, originalPrice: 70, requiresPrescription: true, stockQuantity: 115, brandIdx: 8 }),
  createProduct({ name: 'Woodwards Celebrated Gripe Water', genericName: 'Dill Oil with Sodium Bicarbonate', category: 'Syrups', dosageForm: 'Liquid', strength: '130ml', price: 65, originalPrice: 75, stockQuantity: 290, brandIdx: 13 }),
  createProduct({ name: 'Liv.52 Herbal Liver Syrup 200ml', genericName: 'Caper Bush & Wild Chicory Herbal Blend', category: 'Syrups', dosageForm: 'Syrup', strength: '200ml', price: 170, originalPrice: 195, stockQuantity: 360, brandIdx: 10 }),

  // ==================== 4. TONICS (25) ====================
  createProduct({ name: 'Loha Asava Classical Iron Tonic', genericName: 'Ayurvedic Purified Iron & Herbs 450ml', category: 'Tonics', dosageForm: 'Tonic', strength: '450ml', price: 165, originalPrice: 195, stockQuantity: 190, brandIdx: 11 }),
  createProduct({ name: 'Ashwagandharishta Vitality Tonic', genericName: 'Fermented Ashwagandha Herbal Elixir', category: 'Tonics', dosageForm: 'Tonic', strength: '450ml', price: 180, originalPrice: 210, stockQuantity: 220, brandIdx: 10 }),
  createProduct({ name: 'Drakshasava General Debility Tonic', genericName: 'Enriched Dry Grape Extract with Natural Yeast', category: 'Tonics', dosageForm: 'Tonic', strength: '450ml', price: 190, originalPrice: 225, stockQuantity: 180, brandIdx: 11 }),
  createProduct({ name: 'Arjunarishta Cardio Shield Tonic', genericName: 'Terminalia Arjuna Heart Support Decoction', category: 'Tonics', dosageForm: 'Tonic', strength: '450ml', price: 175, originalPrice: 205, stockQuantity: 160, brandIdx: 10 }),
  createProduct({ name: 'Shankhpushpi Mind & Memory Tonic', genericName: 'Convolvulus Pluricaulis & Brahmi Extract', category: 'Tonics', dosageForm: 'Tonic', strength: '225ml', price: 115, originalPrice: 135, stockQuantity: 240, brandIdx: 11 }),
  createProduct({ name: 'Ashoka Cordial Female Care Tonic', genericName: 'Saraca Asoca Uterine Health Formulation', category: 'Tonics', dosageForm: 'Tonic', strength: '200ml', price: 140, originalPrice: 165, stockQuantity: 170, brandIdx: 10 }),
  createProduct({ name: 'Safi Blood Purifier Herbal Tonic', genericName: 'Unani Neem, Chirata & Senna Herbal Formula', category: 'Tonics', dosageForm: 'Tonic', strength: '200ml', price: 110, originalPrice: 125, stockQuantity: 320, brandIdx: 12 }),
  createProduct({ name: 'Chyawanprash Awaleha Herbal Tonic', genericName: 'Amla Supercharged 40 Herbs Formulation', category: 'Tonics', dosageForm: 'Tonic Paste', strength: '500g', price: 215, originalPrice: 245, stockQuantity: 410, brandIdx: 11 }),
  createProduct({ name: 'Baidyanath Liver Care Elixir', genericName: 'Bhumiamalaki & Punarnava Hepatic Tonic', category: 'Tonics', dosageForm: 'Tonic', strength: '200ml', price: 130, originalPrice: 155, stockQuantity: 185, brandIdx: 10 }),
  createProduct({ name: 'Senior Gold Vitality Restorative', genericName: 'Multivitamin Tonic with Ginseng & Ginkgo', category: 'Tonics', dosageForm: 'Tonic', strength: '300ml', price: 285, originalPrice: 340, stockQuantity: 120, brandIdx: 0 }),
  createProduct({ name: 'Zincovit Total Recovery Tonic', genericName: 'Vitamins, Zinc & Lysine Growth Solution', category: 'Tonics', dosageForm: 'Tonic', strength: '200ml', price: 145, originalPrice: 170, stockQuantity: 250, brandIdx: 1 }),
  createProduct({ name: 'Pure Aloe Vera Pulp Tonic Juice', genericName: 'Cold-Pressed Inner Leaf Aloe Vera 500ml', category: 'Tonics', dosageForm: 'Tonic', strength: '500ml', price: 175, originalPrice: 210, stockQuantity: 190, brandIdx: 12 }),
  createProduct({ name: 'Organic Amla Vitamin C Pure Juice', genericName: 'Phyllanthus Emblica 100% Cold Extract', category: 'Tonics', dosageForm: 'Tonic', strength: '500ml', price: 160, originalPrice: 190, stockQuantity: 210, brandIdx: 11 }),
  createProduct({ name: 'Triphala Digestive Detox Tonic', genericName: 'Haritaki, Bibhitaki & Amla Decoction', category: 'Tonics', dosageForm: 'Tonic', strength: '500ml', price: 185, originalPrice: 220, stockQuantity: 180, brandIdx: 10 }),
  createProduct({ name: 'Giloy Swaras Immunity Defense', genericName: 'Tinospora Cordifolia Stem Extract', category: 'Tonics', dosageForm: 'Tonic', strength: '500ml', price: 150, originalPrice: 180, stockQuantity: 230, brandIdx: 12 }),
  createProduct({ name: 'Karela Jamun Sugar Balancing Juice', genericName: 'Momordica & Syzygium Glycemic Juice', category: 'Tonics', dosageForm: 'Tonic', strength: '500ml', price: 195, originalPrice: 230, stockQuantity: 160, brandIdx: 11 }),
  createProduct({ name: 'Wheatgrass Pure Detox Green Tonic', genericName: 'Chlorophyll Rich Young Sprout Extract', category: 'Tonics', dosageForm: 'Tonic', strength: '500ml', price: 240, originalPrice: 285, stockQuantity: 130, brandIdx: 10 }),
  createProduct({ name: 'Noni Enzyme Active Wellness Tonic', genericName: 'Morinda Citrifolia Fruit Extract 500ml', category: 'Tonics', dosageForm: 'Tonic', strength: '500ml', price: 340, originalPrice: 420, stockQuantity: 95, brandIdx: 12 }),
  createProduct({ name: 'Neem-Karela Pure Bitter Tonic', genericName: 'Skin & Metabolic Detox Purifier 500ml', category: 'Tonics', dosageForm: 'Tonic', strength: '500ml', price: 170, originalPrice: 200, stockQuantity: 140, brandIdx: 11 }),
  createProduct({ name: 'Shatavari Hormonal Balance Tonic', genericName: 'Asparagus Racemosus Female Tonic', category: 'Tonics', dosageForm: 'Tonic', strength: '200ml', price: 155, originalPrice: 185, stockQuantity: 160, brandIdx: 10 }),
  createProduct({ name: 'Brahmi Saraswatarishta Brain Elixir', genericName: 'Classical Bacopa Monnieri Intelligence Tonic', category: 'Tonics', dosageForm: 'Tonic', strength: '450ml', price: 210, originalPrice: 250, stockQuantity: 150, brandIdx: 11 }),
  createProduct({ name: 'Pediatric Nutri-Boost Herbal Tonic', genericName: 'Vidang & Pippali Appetite Tonic 100ml', category: 'Tonics', dosageForm: 'Tonic', strength: '100ml', price: 95, originalPrice: 115, stockQuantity: 200, brandIdx: 10 }),
  createProduct({ name: 'Pain-Free Shallaki Joint Elixir', genericName: 'Boswellia Serrata Active Decoction 200ml', category: 'Tonics', dosageForm: 'Tonic', strength: '200ml', price: 180, originalPrice: 215, stockQuantity: 135, brandIdx: 12 }),
  createProduct({ name: 'Spirulina Liquid Energy Tonic', genericName: 'Blue-Green Algae Micronutrient Tonic', category: 'Tonics', dosageForm: 'Tonic', strength: '250ml', price: 260, originalPrice: 310, stockQuantity: 110, brandIdx: 11 }),
  createProduct({ name: 'Digestive Hingwashtak Churna Tonic', genericName: 'Asafoetida & Carminative Herbs Solution', category: 'Tonics', dosageForm: 'Tonic', strength: '200ml', price: 125, originalPrice: 150, stockQuantity: 190, brandIdx: 10 }),

  // ==================== 5. SERUMS (25) ====================
  createProduct({ name: 'Vitamin C 10% Glow Serum 30ml', genericName: 'Ethyl Ascorbic Acid + Ferulic Acid', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 449, originalPrice: 599, stockQuantity: 180, brandIdx: 14 }),
  createProduct({ name: 'Hyaluronic Acid 2% + B5 Serum', genericName: 'Multi-Molecular Hyaluronic Acid 2%', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 399, originalPrice: 499, stockQuantity: 220, brandIdx: 14 }),
  createProduct({ name: 'Niacinamide 10% Blemish Defense', genericName: 'Niacinamide 10% + Zinc PCA 1%', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 429, originalPrice: 549, stockQuantity: 260, brandIdx: 14 }),
  createProduct({ name: 'Salicylic Acid 2% Pore Clearing', genericName: 'Beta Hydroxy Acid Exfoliating Serum', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 389, originalPrice: 489, stockQuantity: 210, brandIdx: 14 }),
  createProduct({ name: 'Retinol 0.3% Night Repair Serum', genericName: 'Pure Retinol with Rosehip Oil 30ml', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 549, originalPrice: 699, stockQuantity: 140, brandIdx: 14 }),
  createProduct({ name: 'Alpha Arbutin 2% Dark Spot Corrector', genericName: 'Alpha Arbutin + Hyaluronic Acid 30ml', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 459, originalPrice: 579, stockQuantity: 190, brandIdx: 14 }),
  createProduct({ name: 'Multi-Peptide Hair Density Serum', genericName: 'Redensyl 3% + Procapil 3% + Anagain', category: 'Serums', dosageForm: 'Serum', strength: '50ml', price: 699, originalPrice: 899, stockQuantity: 160, brandIdx: 0 }),
  createProduct({ name: 'Caffeine 5% Eye Depuffing Serum', genericName: 'Caffeine Solution with EGCG from Green Tea', category: 'Serums', dosageForm: 'Serum', strength: '15ml', price: 369, originalPrice: 469, stockQuantity: 180, brandIdx: 14 }),
  createProduct({ name: 'Ceramide Barrier Restoring Serum', genericName: 'Ceramides NP, AP, EOP with Phytosphingosine', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 499, originalPrice: 629, stockQuantity: 150, brandIdx: 14 }),
  createProduct({ name: 'Azelaic Acid 10% Calming Serum', genericName: 'Potassium Azeloyl Diglycinate Serum', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 420, originalPrice: 520, stockQuantity: 130, brandIdx: 14 }),
  createProduct({ name: 'AHA 10% + BHA 2% Peeling Solution', genericName: 'Glycolic, Lactic & Salicylic Acid Peeler', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 479, originalPrice: 599, stockQuantity: 170, brandIdx: 14 }),
  createProduct({ name: 'Centella Cica Soothing Barrier Serum', genericName: 'Madecassoside & Centella Asiatica 80%', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 430, originalPrice: 530, stockQuantity: 140, brandIdx: 14 }),
  createProduct({ name: 'Bakuchiol 1% Botanical Retinol Serum', genericName: 'Natural Retinoid Alternative + Squalane', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 519, originalPrice: 649, stockQuantity: 120, brandIdx: 14 }),
  createProduct({ name: 'Squalane 100% Plant Derived Oil', genericName: 'Pure Olive Derived Fast-Absorbing Squalane', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 399, originalPrice: 499, stockQuantity: 160, brandIdx: 14 }),
  createProduct({ name: 'Tranexamic Acid 3% Pigment Reducer', genericName: 'Tranexamic Acid with Mandelic Acid', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 469, originalPrice: 589, stockQuantity: 135, brandIdx: 14 }),
  createProduct({ name: 'Kojic Acid 2% Brightening Derma Serum', genericName: 'Kojic Dipalmitate + Niacinamide', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 410, originalPrice: 510, stockQuantity: 155, brandIdx: 14 }),
  createProduct({ name: 'Snail Mucin 96% Recovery Essence', genericName: 'Filtered Snail Secretion Power Serum', category: 'Serums', dosageForm: 'Serum', strength: '100ml', price: 799, originalPrice: 999, stockQuantity: 90, brandIdx: 14 }),
  createProduct({ name: 'Biotin + Rosemary Scalp Serum 60ml', genericName: 'Hydrolyzed Biotin & Rosemary Essential Oil', category: 'Serums', dosageForm: 'Serum', strength: '60ml', price: 349, originalPrice: 449, stockQuantity: 210, brandIdx: 11 }),
  createProduct({ name: 'Anti-Dandruff Zinc Scalp Solution', genericName: 'Zinc Pyrithione + Salicylic Acid Scalp Drops', category: 'Serums', dosageForm: 'Serum', strength: '50ml', price: 329, originalPrice: 419, stockQuantity: 175, brandIdx: 0 }),
  createProduct({ name: 'Collagen Booster Tri-Peptide Serum', genericName: 'Matrixyl 3000 + Copper Tripeptide-1', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 589, originalPrice: 749, stockQuantity: 110, brandIdx: 14 }),
  createProduct({ name: 'Rosehip Seed Oil Pure Cold-Pressed', genericName: 'Rosa Canina Seed Oil Extra Virgin 30ml', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 449, originalPrice: 569, stockQuantity: 145, brandIdx: 11 }),
  createProduct({ name: 'Propolis + Vitamin Glow Serum 50ml', genericName: 'Propolis Extract 60% with Niacinamide', category: 'Serums', dosageForm: 'Serum', strength: '50ml', price: 529, originalPrice: 659, stockQuantity: 125, brandIdx: 14 }),
  createProduct({ name: 'Tea Tree Acne Control Active Serum', genericName: 'Melaleuca Alternifolia Leaf Oil Solution', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 349, originalPrice: 439, stockQuantity: 200, brandIdx: 10 }),
  createProduct({ name: 'Glycolic Acid 8% Overnight Glow', genericName: 'Alpha Hydroxy Acid Resurfacing Drops', category: 'Serums', dosageForm: 'Serum', strength: '50ml', price: 479, originalPrice: 599, stockQuantity: 160, brandIdx: 14 }),
  createProduct({ name: 'Vitamin E & Sweet Almond Derma Drops', genericName: 'Pure D-Alpha Tocopherol Serum 30ml', category: 'Serums', dosageForm: 'Serum', strength: '30ml', price: 319, originalPrice: 399, stockQuantity: 230, brandIdx: 11 }),

  // ==================== 6. INJECTIONS (25) ====================
  createProduct({ name: 'Monocef 1g Ceftriaxone Injection', genericName: 'Ceftriaxone Sodium 1g Vial', category: 'Injections', dosageForm: 'Injection', strength: '1g', price: 78, originalPrice: 92, requiresPrescription: true, stockQuantity: 180, brandIdx: 1 }),
  createProduct({ name: 'Mikacin 500mg Amikacin Injection', genericName: 'Amikacin Sulphate 500mg/2ml', category: 'Injections', dosageForm: 'Injection', strength: '500mg/2ml', price: 95, originalPrice: 115, requiresPrescription: true, stockQuantity: 140, brandIdx: 2 }),
  createProduct({ name: 'Pantocid IV 40mg Injection', genericName: 'Pantoprazole IV 40mg with Sterile Water', category: 'Injections', dosageForm: 'Injection', strength: '40mg', price: 62, originalPrice: 75, requiresPrescription: true, stockQuantity: 210, brandIdx: 3 }),
  createProduct({ name: 'Emeset 2ml Ondansetron Injection', genericName: 'Ondansetron 2mg/ml Injection Ampoule', category: 'Injections', dosageForm: 'Injection', strength: '2ml', price: 28, originalPrice: 35, requiresPrescription: true, stockQuantity: 240, brandIdx: 4 }),
  createProduct({ name: 'Tramazac 50mg Pain Ampoule', genericName: 'Tramadol Hydrochloride 50mg/ml', category: 'Injections', dosageForm: 'Injection', strength: '1ml', price: 32, originalPrice: 40, requiresPrescription: true, stockQuantity: 130, brandIdx: 5 }),
  createProduct({ name: 'Voveran 75mg Diclofenac Injection', genericName: 'Diclofenac Sodium 75mg/ml Ampoule', category: 'Injections', dosageForm: 'Injection', strength: '1ml', price: 24, originalPrice: 30, requiresPrescription: true, stockQuantity: 290, brandIdx: 6 }),
  createProduct({ name: 'Neurobion 1500mcg B12 Injection', genericName: 'Mecobalamin + Pyridoxine + Nicotinamide', category: 'Injections', dosageForm: 'Injection', strength: '2ml', price: 85, originalPrice: 100, stockQuantity: 260, brandIdx: 7 }),
  createProduct({ name: 'Orofer S 100mg Iron Sucrose', genericName: 'Iron Sucrose Complex 100mg/5ml', category: 'Injections', dosageForm: 'Injection', strength: '5ml', price: 265, originalPrice: 310, requiresPrescription: true, stockQuantity: 110, brandIdx: 8 }),
  createProduct({ name: 'Paracetamol IV 100ml Infusion', genericName: 'Paracetamol 1000mg/100ml Bottle', category: 'Injections', dosageForm: 'Infusion', strength: '100ml', price: 110, originalPrice: 130, requiresPrescription: true, stockQuantity: 190, brandIdx: 0 }),
  createProduct({ name: 'Metrogyl 100ml IV Infusion', genericName: 'Metronidazole 500mg/100ml IV', category: 'Injections', dosageForm: 'Infusion', strength: '100ml', price: 34, originalPrice: 42, requiresPrescription: true, stockQuantity: 250, brandIdx: 1 }),
  createProduct({ name: 'Cifran 100ml Ciprofloxacin IV', genericName: 'Ciprofloxacin 200mg/100ml IV Bottle', category: 'Injections', dosageForm: 'Infusion', strength: '100ml', price: 48, originalPrice: 60, requiresPrescription: true, stockQuantity: 170, brandIdx: 2 }),
  createProduct({ name: 'Normal Saline 0.9% IV Bottle 500ml', genericName: 'Sodium Chloride 0.9% w/v Sterile Infusion', category: 'Injections', dosageForm: 'Infusion', strength: '500ml', price: 45, originalPrice: 55, stockQuantity: 380, brandIdx: 3 }),
  createProduct({ name: 'Dextrose Normal Saline 5% 500ml', genericName: 'DNS 5% Dextrose in 0.9% Saline Solution', category: 'Injections', dosageForm: 'Infusion', strength: '500ml', price: 48, originalPrice: 60, stockQuantity: 340, brandIdx: 4 }),
  createProduct({ name: 'Ringer Lactate Infusion 500ml', genericName: 'Sodium Lactate Compound Infusion', category: 'Injections', dosageForm: 'Infusion', strength: '500ml', price: 52, originalPrice: 65, stockQuantity: 310, brandIdx: 5 }),
  createProduct({ name: 'Primacort 100mg Hydrocortisone', genericName: 'Hydrocortisone Sodium Succinate 100mg', category: 'Injections', dosageForm: 'Injection', strength: '100mg', price: 42, originalPrice: 50, requiresPrescription: true, stockQuantity: 160, brandIdx: 6 }),
  createProduct({ name: 'Dexona 2ml Dexamethasone Injection', genericName: 'Dexamethasone Sodium Phosphate 4mg/ml', category: 'Injections', dosageForm: 'Injection', strength: '2ml', price: 18, originalPrice: 22, requiresPrescription: true, stockQuantity: 280, brandIdx: 7 }),
  createProduct({ name: 'Clexane 40mg Enoxaparin Syringe', genericName: 'Enoxaparin Sodium 40mg/0.4ml Prefilled', category: 'Injections', dosageForm: 'Prefilled Syringe', strength: '0.4ml', price: 540, originalPrice: 640, requiresPrescription: true, stockQuantity: 80, brandIdx: 8 }),
  createProduct({ name: 'Heparin 5000 IU Anticoagulant', genericName: 'Heparin Sodium 5000 IU/ml Vial', category: 'Injections', dosageForm: 'Injection', strength: '5ml', price: 180, originalPrice: 215, requiresPrescription: true, stockQuantity: 95, brandIdx: 9 }),
  createProduct({ name: 'Tetvac Tetanus Toxoid 0.5ml', genericName: 'Adsorbed Tetanus Vaccine 0.5ml Ampoule', category: 'Injections', dosageForm: 'Vaccine', strength: '0.5ml', price: 25, originalPrice: 30, stockQuantity: 350, brandIdx: 10 }),
  createProduct({ name: 'Engerix-B Adult Hepatitis B 1ml', genericName: 'Recombinant Hepatitis B Vaccine 20mcg', category: 'Injections', dosageForm: 'Vaccine', strength: '1ml', price: 160, originalPrice: 190, requiresPrescription: true, stockQuantity: 120, brandIdx: 11 }),
  createProduct({ name: 'Rabivax-S Anti-Rabies Vaccine', genericName: 'Purified Chick Embryo Cell Rabies Vaccine', category: 'Injections', dosageForm: 'Vaccine', strength: '1 Dose', price: 380, originalPrice: 450, requiresPrescription: true, stockQuantity: 105, brandIdx: 0 }),
  createProduct({ name: 'Lasix 20mg Diuretic Ampoule', genericName: 'Furosemide 10mg/ml 2ml Injection', category: 'Injections', dosageForm: 'Injection', strength: '2ml', price: 16, originalPrice: 20, requiresPrescription: true, stockQuantity: 270, brandIdx: 1 }),
  createProduct({ name: 'Optineuron Multi-Vitamin Injection', genericName: 'B-Complex with B1, B6, B12 Ampoule', category: 'Injections', dosageForm: 'Injection', strength: '3ml', price: 35, originalPrice: 42, stockQuantity: 220, brandIdx: 2 }),
  createProduct({ name: 'Texakind 500mg Hemostatic Ampoule', genericName: 'Tranexamic Acid 500mg/5ml IV', category: 'Injections', dosageForm: 'Injection', strength: '5ml', price: 95, originalPrice: 115, requiresPrescription: true, stockQuantity: 140, brandIdx: 3 }),
  createProduct({ name: 'Neostig 0.5mg Muscle Recovery', genericName: 'Neostigmine Methylsulfate 0.5mg/ml', category: 'Injections', dosageForm: 'Injection', strength: '1ml', price: 22, originalPrice: 28, requiresPrescription: true, stockQuantity: 130, brandIdx: 4 }),

  // ==================== 7. CREAMS (25) ====================
  createProduct({ name: 'Betnovate-N Skin Cream 20g', genericName: 'Betamethasone Valerate + Neomycin Sulphate', category: 'Creams', dosageForm: 'Cream', strength: '20g', price: 54, originalPrice: 65, requiresPrescription: true, stockQuantity: 290, brandIdx: 5 }),
  createProduct({ name: 'T-Bact 2% Mupirocin Ointment 5g', genericName: 'Mupirocin 2% w/w Antibacterial', category: 'Creams', dosageForm: 'Ointment', strength: '5g', price: 115, originalPrice: 138, requiresPrescription: true, stockQuantity: 190, brandIdx: 6 }),
  createProduct({ name: 'Candid 1% Antifungal Cream 30g', genericName: 'Clotrimazole 1% w/w Topical Cream', category: 'Creams', dosageForm: 'Cream', strength: '30g', price: 88, originalPrice: 105, stockQuantity: 320, brandIdx: 7 }),
  createProduct({ name: 'Nizral 2% Ketoconazole Cream 30g', genericName: 'Ketoconazole 2% w/w Broad Spectrum', category: 'Creams', dosageForm: 'Cream', strength: '30g', price: 165, originalPrice: 195, stockQuantity: 175, brandIdx: 8 }),
  createProduct({ name: 'Cutisoft 1% Hydrocortisone 15g', genericName: 'Hydrocortisone 1% Mild Steroid Cream', category: 'Creams', dosageForm: 'Cream', strength: '15g', price: 72, originalPrice: 86, requiresPrescription: true, stockQuantity: 180, brandIdx: 9 }),
  createProduct({ name: 'Silverex Ionic Burn Cream 50g', genericName: 'Silver Sulfadiazine + Chlorhexidine Gluconate', category: 'Creams', dosageForm: 'Cream', strength: '50g', price: 145, originalPrice: 175, stockQuantity: 220, brandIdx: 10 }),
  createProduct({ name: 'Tenovate 0.05% Clobetasol Cream', genericName: 'Clobetasol Propionate 0.05% w/w', category: 'Creams', dosageForm: 'Cream', strength: '30g', price: 135, originalPrice: 160, requiresPrescription: true, stockQuantity: 140, brandIdx: 11 }),
  createProduct({ name: 'Sebifin 1% Terbinafine Cream 15g', genericName: 'Terbinafine Hydrochloride 1% w/w', category: 'Creams', dosageForm: 'Cream', strength: '15g', price: 110, originalPrice: 135, stockQuantity: 210, brandIdx: 0 }),
  createProduct({ name: 'Scaboma 5% Permethrin Cream 30g', genericName: 'Permethrin 5% w/w Anti-Parasitic', category: 'Creams', dosageForm: 'Cream', strength: '30g', price: 78, originalPrice: 95, stockQuantity: 190, brandIdx: 1 }),
  createProduct({ name: 'Fucidin 2% Fusidic Acid Cream 15g', genericName: 'Sodium Fusidate 2% Antibacterial', category: 'Creams', dosageForm: 'Cream', strength: '15g', price: 140, originalPrice: 168, requiresPrescription: true, stockQuantity: 160, brandIdx: 2 }),
  createProduct({ name: 'Retino-A 0.025% Acne Care Cream', genericName: 'Tretinoin 0.025% Micro-Exfoliant', category: 'Creams', dosageForm: 'Cream', strength: '20g', price: 195, originalPrice: 235, requiresPrescription: true, stockQuantity: 130, brandIdx: 3 }),
  createProduct({ name: 'Deriva-CMS Microspheres Cream', genericName: 'Adapalene 0.1% + Clindamycin 1%', category: 'Creams', dosageForm: 'Cream', strength: '15g', price: 275, originalPrice: 325, requiresPrescription: true, stockQuantity: 120, brandIdx: 4 }),
  createProduct({ name: 'Moisturex Intensive Urea Cream 100g', genericName: 'Urea 10% + Lactic Acid + Liquid Paraffin', category: 'Creams', dosageForm: 'Cream', strength: '100g', price: 240, originalPrice: 285, stockQuantity: 240, brandIdx: 5 }),
  createProduct({ name: 'Lacto Calamine Oil Balance Cream', genericName: 'Kaolin Clay, Zinc Oxide & Glycerin', category: 'Creams', dosageForm: 'Lotion/Cream', strength: '120ml', price: 185, originalPrice: 215, stockQuantity: 350, brandIdx: 15 }),
  createProduct({ name: 'CeraVe Moisturizing Repair Cream 50g', genericName: '3 Essential Ceramides + Hyaluronic Acid', category: 'Creams', dosageForm: 'Cream', strength: '50g', price: 349, originalPrice: 420, stockQuantity: 170, brandIdx: 14 }),
  createProduct({ name: 'Arnica Mont Montana Derma Cream 25g', genericName: 'Homeopathic Arnica Flower Extract', category: 'Creams', dosageForm: 'Cream', strength: '25g', price: 85, originalPrice: 105, stockQuantity: 210, brandIdx: 10 }),
  createProduct({ name: 'Lulifin 1% Broad Spectrum Cream 20g', genericName: 'Luliconazole 1% w/w Antifungal', category: 'Creams', dosageForm: 'Cream', strength: '20g', price: 220, originalPrice: 260, stockQuantity: 165, brandIdx: 6 }),
  createProduct({ name: 'Benzac AC 2.5% Acne Cream 20g', genericName: 'Benzoyl Peroxide 2.5% Water Based', category: 'Creams', dosageForm: 'Cream', strength: '20g', price: 135, originalPrice: 160, stockQuantity: 190, brandIdx: 7 }),
  createProduct({ name: 'Kozimax Skin Lightening Cream 15g', genericName: 'Kojic Acid + Vitamin C + Glabridin', category: 'Creams', dosageForm: 'Cream', strength: '15g', price: 385, originalPrice: 460, stockQuantity: 110, brandIdx: 8 }),
  createProduct({ name: 'Bioderma Atoderm Nourishing Cream', genericName: 'Skin Barrier Therapy Complex 100ml', category: 'Creams', dosageForm: 'Cream', strength: '100ml', price: 495, originalPrice: 595, stockQuantity: 140, brandIdx: 14 }),
  createProduct({ name: 'Tacroz 0.03% Ointment 10g', genericName: 'Tacrolimus 0.03% Atopic Eczema Care', category: 'Creams', dosageForm: 'Ointment', strength: '10g', price: 290, originalPrice: 345, requiresPrescription: true, stockQuantity: 95, brandIdx: 9 }),
  createProduct({ name: 'Betadine 5% Antiseptic Cream 20g', genericName: 'Povidone Iodine 5% w/w Microbiocidal', category: 'Creams', dosageForm: 'Cream', strength: '20g', price: 65, originalPrice: 78, stockQuantity: 310, brandIdx: 10 }),
  createProduct({ name: 'Ring Guard Anti-Itch Cream 20g', genericName: 'Miconazole Nitrate + Neomycin Cream', category: 'Creams', dosageForm: 'Cream', strength: '20g', price: 75, originalPrice: 88, stockQuantity: 280, brandIdx: 15 }),
  createProduct({ name: 'Ezerra Soothing Derma Cream 25g', genericName: 'Spent Grain Wax with Tri-Lipid Complex', category: 'Creams', dosageForm: 'Cream', strength: '25g', price: 420, originalPrice: 500, stockQuantity: 115, brandIdx: 14 }),
  createProduct({ name: 'Mederma Advanced Scar Gel-Cream', genericName: 'Allium Cepa Bulb Extract Scar Reducer', category: 'Creams', dosageForm: 'Cream', strength: '20g', price: 480, originalPrice: 560, stockQuantity: 130, brandIdx: 11 }),

  // ==================== 8. GELS (25) ====================
  createProduct({ name: 'Volini Pain Relief Active Gel 50g', genericName: 'Diclofenac Diethylamine + Methyl Salicylate', category: 'Gels', dosageForm: 'Gel', strength: '50g', price: 145, originalPrice: 170, stockQuantity: 340, brandIdx: 1 }),
  createProduct({ name: 'Moov Fast Pain Relief Gel 30g', genericName: 'Nilgiri Oil, Wintergreen & Mint Extract', category: 'Gels', dosageForm: 'Gel', strength: '30g', price: 95, originalPrice: 110, stockQuantity: 380, brandIdx: 2 }),
  createProduct({ name: 'Omnigel Fast Absorption Gel 30g', genericName: 'Diclofenac Diethylamine 1.16% w/w', category: 'Gels', dosageForm: 'Gel', strength: '30g', price: 82, originalPrice: 98, stockQuantity: 290, brandIdx: 0 }),
  createProduct({ name: 'Pure Aloe Vera Soothing Gel 150g', genericName: 'Organic Aloe Barbadensis 99% Pure Gel', category: 'Gels', dosageForm: 'Gel', strength: '150g', price: 160, originalPrice: 195, stockQuantity: 310, brandIdx: 12 }),
  createProduct({ name: 'Ora-Fast Mouth Ulcer Gel 10g', genericName: 'Choline Salicylate + Lignocaine HCl', category: 'Gels', dosageForm: 'Gel', strength: '10g', price: 65, originalPrice: 78, stockQuantity: 270, brandIdx: 3 }),
  createProduct({ name: 'Metrohex Dental Antiseptic Gel 15g', genericName: 'Metronidazole 1% + Chlorhexidine 0.25%', category: 'Gels', dosageForm: 'Gel', strength: '15g', price: 72, originalPrice: 85, stockQuantity: 190, brandIdx: 4 }),
  createProduct({ name: 'Clindac-A 1% Clear Acne Gel 20g', genericName: 'Clindamycin Phosphate 1% Topical Gel', category: 'Gels', dosageForm: 'Gel', strength: '20g', price: 185, originalPrice: 220, requiresPrescription: true, stockQuantity: 170, brandIdx: 5 }),
  createProduct({ name: 'Epiduo Topical Duo Acne Gel 15g', genericName: 'Adapalene 0.1% + Benzoyl Peroxide 2.5%', category: 'Gels', dosageForm: 'Gel', strength: '15g', price: 420, originalPrice: 510, requiresPrescription: true, stockQuantity: 110, brandIdx: 6 }),
  createProduct({ name: 'Daktarin Oral Antifungal Gel 20g', genericName: 'Miconazole 20mg/g Oral Cavity Gel', category: 'Gels', dosageForm: 'Oral Gel', strength: '20g', price: 195, originalPrice: 235, requiresPrescription: true, stockQuantity: 125, brandIdx: 7 }),
  createProduct({ name: 'Thrombophob Anti-Bruise Gel 20g', genericName: 'Heparin Sodium with Benzyl Nicotinate', category: 'Gels', dosageForm: 'Gel', strength: '20g', price: 130, originalPrice: 155, stockQuantity: 220, brandIdx: 8 }),
  createProduct({ name: 'Cipladine 5% Antiseptic Gel 15g', genericName: 'Povidone Iodine 5% Water Soluble Base', category: 'Gels', dosageForm: 'Gel', strength: '15g', price: 48, originalPrice: 58, stockQuantity: 280, brandIdx: 0 }),
  createProduct({ name: 'Himalaya Arnica Cool Gel 30g', genericName: 'Arnica & Menthol Rapid Soothing Gel', category: 'Gels', dosageForm: 'Gel', strength: '30g', price: 75, originalPrice: 90, stockQuantity: 230, brandIdx: 10 }),
  createProduct({ name: 'Solcoseryl Wound Repair Gel 20g', genericName: 'Deproteinized Calf Blood Extract 20%', category: 'Gels', dosageForm: 'Gel', strength: '20g', price: 310, originalPrice: 375, requiresPrescription: true, stockQuantity: 95, brandIdx: 9 }),
  createProduct({ name: 'K-Y Sterile Lubricating Gel 50g', genericName: 'Water Soluble Hypoallergenic Lubricant', category: 'Gels', dosageForm: 'Gel', strength: '50g', price: 165, originalPrice: 195, stockQuantity: 240, brandIdx: 13 }),
  createProduct({ name: 'Genteal Dry Eye Lubricant Gel 10g', genericName: 'Carbomer 980 Liquid Eye Gel 0.2%', category: 'Gels', dosageForm: 'Eye Gel', strength: '10g', price: 195, originalPrice: 230, stockQuantity: 160, brandIdx: 14 }),
  createProduct({ name: 'Fastum 2.5% Ketoprofen Gel 30g', genericName: 'Ketoprofen 2.5% Non-Steroidal Anti-Inflammatory', category: 'Gels', dosageForm: 'Gel', strength: '30g', price: 155, originalPrice: 185, stockQuantity: 175, brandIdx: 1 }),
  createProduct({ name: 'Acne-Duo Niacinamide Gel 15g', genericName: 'Clindamycin + Nicotinamide Clear Gel', category: 'Gels', dosageForm: 'Gel', strength: '15g', price: 140, originalPrice: 170, stockQuantity: 200, brandIdx: 2 }),
  createProduct({ name: 'Zandu Fast Relief Muscle Gel 30g', genericName: 'Micro-Fine Herbal Warming Salicylate', category: 'Gels', dosageForm: 'Gel', strength: '30g', price: 85, originalPrice: 100, stockQuantity: 310, brandIdx: 11 }),
  createProduct({ name: 'Tea Tree Spot Clearing Gel 15g', genericName: 'Australian Tea Tree & Witch Hazel Gel', category: 'Gels', dosageForm: 'Gel', strength: '15g', price: 195, originalPrice: 245, stockQuantity: 180, brandIdx: 14 }),
  createProduct({ name: 'Papaya Enzyme Exfoliating Gel 100g', genericName: 'Carica Papaya Fruit Enzyme Peeling Gel', category: 'Gels', dosageForm: 'Gel', strength: '100g', price: 210, originalPrice: 260, stockQuantity: 195, brandIdx: 10 }),
  createProduct({ name: 'Bamboo Charcoal Deep Purifying Gel', genericName: 'Activated Charcoal Pore Vacuum Gel', category: 'Gels', dosageForm: 'Gel', strength: '100g', price: 230, originalPrice: 280, stockQuantity: 160, brandIdx: 11 }),
  createProduct({ name: 'Ice-Cool Menthol Muscle Gel 50g', genericName: 'Pure Menthol & Camphor Cryo-Therapy Gel', category: 'Gels', dosageForm: 'Gel', strength: '50g', price: 110, originalPrice: 135, stockQuantity: 240, brandIdx: 12 }),
  createProduct({ name: 'Centella Asiatica Hydra Gel 100g', genericName: 'Gotu Kola 92% Moisture Lock Gel', category: 'Gels', dosageForm: 'Gel', strength: '100g', price: 290, originalPrice: 350, stockQuantity: 150, brandIdx: 14 }),
  createProduct({ name: 'Dexpanthenol 5% Wound Healing Gel', genericName: 'Pro-Vitamin B5 Tissue Regenerator 30g', category: 'Gels', dosageForm: 'Gel', strength: '30g', price: 175, originalPrice: 210, stockQuantity: 185, brandIdx: 15 }),
  createProduct({ name: 'Soothe-Burn Zinc Cooling Gel 30g', genericName: 'Zinc Oxide with Cucumber Extract 30g', category: 'Gels', dosageForm: 'Gel', strength: '30g', price: 95, originalPrice: 115, stockQuantity: 220, brandIdx: 0 }),

  // ==================== 9. ORS (25) ====================
  createProduct({ name: 'Electral WHO Formula Sachet 21.8g', genericName: 'Oral Rehydration Salts IP (WHO Standard)', category: 'ORS', dosageForm: 'Powder Sachet', strength: '21.8g', price: 22, originalPrice: 26, stockQuantity: 650, brandIdx: 0 }),
  createProduct({ name: 'Prolyte Apple Ready ORS Drink 200ml', genericName: 'Electrolyte Balance Ready Drink with Zinc', category: 'ORS', dosageForm: 'Tetrapack', strength: '200ml', price: 35, originalPrice: 40, stockQuantity: 420, brandIdx: 0 }),
  createProduct({ name: 'Prolyte Orange Hydration Pack 200ml', genericName: 'WHO Osmolarity Orange Electrolyte Solution', category: 'ORS', dosageForm: 'Tetrapack', strength: '200ml', price: 35, originalPrice: 40, stockQuantity: 480, brandIdx: 0 }),
  createProduct({ name: 'Enerzal Instant Energy Powder 100g', genericName: '5 Vital Electrolytes with Carbohydrates', category: 'ORS', dosageForm: 'Powder', strength: '100g', price: 65, originalPrice: 75, stockQuantity: 380, brandIdx: 1 }),
  createProduct({ name: 'Enerzal Orange Energy Drink 500g', genericName: 'Sports Rehydration Electrolyte Formula', category: 'ORS', dosageForm: 'Powder', strength: '500g', price: 275, originalPrice: 310, stockQuantity: 210, brandIdx: 1 }),
  createProduct({ name: 'Fast&Up Reload Effervescent 20s', genericName: 'Hydration Multi-Electrolyte Tubes', category: 'ORS', dosageForm: 'Effervescent Tabs', strength: '20 Tablets', price: 285, originalPrice: 350, stockQuantity: 250, brandIdx: 14 }),
  createProduct({ name: 'Hydralyte Lemon Burst ORS Sachet', genericName: 'Low Osmolarity Citrate Electrolyte Mix', category: 'ORS', dosageForm: 'Powder Sachet', strength: '21.8g', price: 24, originalPrice: 28, stockQuantity: 390, brandIdx: 2 }),
  createProduct({ name: 'Pedialyte Zinc Enriched ORS 20g', genericName: 'Pediatric Oral Rehydration with Zinc Gluconate', category: 'ORS', dosageForm: 'Powder Sachet', strength: '20g', price: 28, originalPrice: 34, stockQuantity: 330, brandIdx: 3 }),
  createProduct({ name: 'Glucovita Instant Energy Powder 200g', genericName: 'Pure Dextrose Monohydrate with Vitamin C', category: 'ORS', dosageForm: 'Powder', strength: '200g', price: 68, originalPrice: 80, stockQuantity: 360, brandIdx: 15 }),
  createProduct({ name: 'Enerzal Zero Calorie Electrolyte', genericName: 'Sugar-Free Sodium & Potassium Sachet', category: 'ORS', dosageForm: 'Powder', strength: '50g', price: 45, originalPrice: 55, stockQuantity: 230, brandIdx: 1 }),
  createProduct({ name: 'Gatorade Sports Electrolyte 500ml', genericName: 'Isotonic Rehydration Drink Blue Bolt', category: 'ORS', dosageForm: 'Liquid Bottle', strength: '500ml', price: 50, originalPrice: 55, stockQuantity: 310, brandIdx: 13 }),
  createProduct({ name: 'Raw Natural Tender Coconut Water', genericName: '100% Pure Coconut Electrolytes 200ml', category: 'ORS', dosageForm: 'Tetrapack', strength: '200ml', price: 45, originalPrice: 50, stockQuantity: 410, brandIdx: 11 }),
  createProduct({ name: 'Electral Fizz Effervescent Tube 10s', genericName: 'Instant Dissolving Oral Salts Tablets', category: 'ORS', dosageForm: 'Effervescent Tabs', strength: '10 Tablets', price: 120, originalPrice: 145, stockQuantity: 280, brandIdx: 0 }),
  createProduct({ name: 'Hydra-Stick Travel Electrolyte 10s', genericName: 'Single-Serve On-The-Go Electrolyte Mix', category: 'ORS', dosageForm: 'Powder Sticks', strength: '10x10g', price: 160, originalPrice: 195, stockQuantity: 190, brandIdx: 14 }),
  createProduct({ name: 'Zinc-ORS Dual Defense Combo Pack', genericName: 'WHO Salt Sachet + Zinc Sulfate Tabs 14s', category: 'ORS', dosageForm: 'Combo Kit', strength: 'Standard Kit', price: 75, originalPrice: 90, stockQuantity: 260, brandIdx: 4 }),
  createProduct({ name: 'Hospital Grade Pure ORS Bulk Pack', genericName: 'Sodium, Potassium, Citrate, Dextrose 50x22g', category: 'ORS', dosageForm: 'Powder Sachet', strength: 'Box of 50', price: 850, originalPrice: 1050, stockQuantity: 60, brandIdx: 5 }),
  createProduct({ name: 'Citrus Surge Rapid Rehydrate 100g', genericName: 'Lime Flavored Magnesium-Potassium Mix', category: 'ORS', dosageForm: 'Powder', strength: '100g', price: 55, originalPrice: 65, stockQuantity: 280, brandIdx: 6 }),
  createProduct({ name: 'Pediatric Oral Rehydrate Drops 30ml', genericName: 'Micro-Dose Electrolyte Concentrate Drops', category: 'ORS', dosageForm: 'Drops', strength: '30ml', price: 48, originalPrice: 60, stockQuantity: 210, brandIdx: 7 }),
  createProduct({ name: 'Electrolyte Chewable Tablets 20s', genericName: 'Fast-Melting Sodium & Potassium Chews', category: 'ORS', dosageForm: 'Chewable Tablet', strength: '20s', price: 135, originalPrice: 165, stockQuantity: 175, brandIdx: 8 }),
  createProduct({ name: 'Active Hydration Cranberry Fuel', genericName: 'Electrolyte Mineral Mix with Antioxidants', category: 'ORS', dosageForm: 'Powder', strength: '150g', price: 195, originalPrice: 240, stockQuantity: 190, brandIdx: 9 }),
  createProduct({ name: 'Post-Workout Marathon Rehydrate', genericName: 'Complete Mineral Recovery Formula 200g', category: 'ORS', dosageForm: 'Powder', strength: '200g', price: 230, originalPrice: 280, stockQuantity: 165, brandIdx: 10 }),
  createProduct({ name: 'Isotonic Recovery Saline Sachet', genericName: 'Balanced Osmotic Pressure Salts 25g', category: 'ORS', dosageForm: 'Powder Sachet', strength: '25g', price: 26, originalPrice: 32, stockQuantity: 320, brandIdx: 11 }),
  createProduct({ name: 'Electrolyte Ice-Freeze Pops 6s', genericName: 'Freezable Hydration Popsicles for Kids', category: 'ORS', dosageForm: 'Freezer Pop', strength: '6x50ml', price: 110, originalPrice: 130, stockQuantity: 140, brandIdx: 13 }),
  createProduct({ name: 'Travel Emergency ORS Pouch 5s', genericName: 'Waterproof Packaged WHO Rehydration 5x', category: 'ORS', dosageForm: 'Sachet Pack', strength: '5 Sachets', price: 95, originalPrice: 115, stockQuantity: 220, brandIdx: 14 }),
  createProduct({ name: 'Gluco-Plus Instant Stamina 100g', genericName: 'Calcium, Vitamin D & Dextrose Mix', category: 'ORS', dosageForm: 'Powder', strength: '100g', price: 42, originalPrice: 50, stockQuantity: 370, brandIdx: 15 }),

  // ==================== 10. FIRST AID (25) ====================
  createProduct({ name: 'Hansaplast Washproof Bandages 20s', genericName: 'Sterile Water-Resistant Wound Plasters', category: 'First Aid', dosageForm: 'Bandage Strip', strength: '20 Strips', price: 45, originalPrice: 52, stockQuantity: 580, brandIdx: 15 }),
  createProduct({ name: 'Dettol Antiseptic Liquid 250ml', genericName: 'Chloroxylenol 4.8% w/v Disinfectant', category: 'First Aid', dosageForm: 'Liquid', strength: '250ml', price: 148, originalPrice: 165, stockQuantity: 440, brandIdx: 13 }),
  createProduct({ name: 'Savlon Antiseptic Disinfectant 200ml', genericName: 'Chlorhexidine Gluconate + Cetrimide', category: 'First Aid', dosageForm: 'Liquid', strength: '200ml', price: 98, originalPrice: 110, stockQuantity: 390, brandIdx: 15 }),
  createProduct({ name: 'Absorbent Sterile Cotton Wool 100g', genericName: '100% Pure Surgical Grade Carded Cotton', category: 'First Aid', dosageForm: 'Cotton Roll', strength: '100g', price: 42, originalPrice: 50, stockQuantity: 460, brandIdx: 0 }),
  createProduct({ name: 'Sterile Gauze Bandage Roll 10s', genericName: 'Breathable Cotton Weave 3 inch x 3m', category: 'First Aid', dosageForm: 'Bandage Roll', strength: '10 Rolls', price: 85, originalPrice: 105, stockQuantity: 310, brandIdx: 1 }),
  createProduct({ name: 'Micropore Surgical Paper Tape 1"', genericName: 'Hypoallergenic Adhesion Tape 1 inch x 9m', category: 'First Aid', dosageForm: 'Tape Roll', strength: '9m', price: 55, originalPrice: 65, stockQuantity: 380, brandIdx: 2 }),
  createProduct({ name: 'Betadine 10% Antiseptic Solution', genericName: 'Povidone Iodine 10% w/v Topical Solution', category: 'First Aid', dosageForm: 'Solution', strength: '100ml', price: 125, originalPrice: 145, stockQuantity: 270, brandIdx: 10 }),
  createProduct({ name: 'Hydrogen Peroxide 3% Solution 100ml', genericName: 'H2O2 Topical Wound Cleansing Solution', category: 'First Aid', dosageForm: 'Solution', strength: '100ml', price: 35, originalPrice: 42, stockQuantity: 290, brandIdx: 3 }),
  createProduct({ name: 'Burnol Antiseptic Healing Cream 20g', genericName: 'Aminacrine HCl + Cetrimide Burn Care', category: 'First Aid', dosageForm: 'Cream', strength: '20g', price: 78, originalPrice: 90, stockQuantity: 350, brandIdx: 4 }),
  createProduct({ name: 'Instant Chemical Cold Compress Pack', genericName: 'Single-Use Urea Freezing Reaction Pack', category: 'First Aid', dosageForm: 'Cold Pack', strength: '1 Unit', price: 95, originalPrice: 120, stockQuantity: 220, brandIdx: 5 }),
  createProduct({ name: 'Elastic Crepe Bandage 10cm x 4m', genericName: 'Compression Sprain & Joint Support Bandage', category: 'First Aid', dosageForm: 'Crepe Bandage', strength: '10cm x 4m', price: 140, originalPrice: 170, stockQuantity: 280, brandIdx: 6 }),
  createProduct({ name: 'Digital Clinical Thermometer Flex', genericName: 'Fast 10-Second High Precision Probe', category: 'First Aid', dosageForm: 'Device', strength: '1 Unit', price: 199, originalPrice: 299, stockQuantity: 180, brandIdx: 7 }),
  createProduct({ name: 'Stainless Medical Bandage Scissors', genericName: 'Lister Blunt-Tip Surgical Scissors 5.5"', category: 'First Aid', dosageForm: 'Tool', strength: '5.5 inch', price: 145, originalPrice: 195, stockQuantity: 160, brandIdx: 8 }),
  createProduct({ name: 'Disposable Latex Exam Gloves 10s', genericName: 'Powder-Free Textured Examination Gloves', category: 'First Aid', dosageForm: 'Gloves', strength: '10 Pairs', price: 120, originalPrice: 150, stockQuantity: 340, brandIdx: 9 }),
  createProduct({ name: 'Triangular Arm Sling First Aid', genericName: 'Non-Woven Fabric Emergency Arm Sling', category: 'First Aid', dosageForm: 'Sling', strength: '1 Unit', price: 65, originalPrice: 80, stockQuantity: 190, brandIdx: 10 }),
  createProduct({ name: 'Sterile Eye Wash Cup + Saline 100ml', genericName: 'Isotonic 0.9% Eye Flushing Bottle & Cup', category: 'First Aid', dosageForm: 'Eye Wash Kit', strength: '100ml', price: 110, originalPrice: 135, stockQuantity: 150, brandIdx: 11 }),
  createProduct({ name: 'Quick-Release Medical Tourniquet', genericName: 'Elastic Buckle Venipuncture Band', category: 'First Aid', dosageForm: 'Band', strength: '1 Unit', price: 75, originalPrice: 95, stockQuantity: 240, brandIdx: 12 }),
  createProduct({ name: 'Padded Finger Splint Aluminum', genericName: 'Malleable Aluminum Foam-Lined Splint', category: 'First Aid', dosageForm: 'Splint', strength: 'Medium', price: 85, originalPrice: 110, stockQuantity: 170, brandIdx: 0 }),
  createProduct({ name: 'Antiseptic Cleansing Wipes 20s', genericName: '70% Isopropyl Alcohol Sterile Swabs', category: 'First Aid', dosageForm: 'Wipe Sachets', strength: '20 Wipes', price: 60, originalPrice: 75, stockQuantity: 410, brandIdx: 1 }),
  createProduct({ name: 'Splinter Forceps Tweezers Steel', genericName: 'Ultra-Fine Point Stainless Steel Tweezers', category: 'First Aid', dosageForm: 'Tool', strength: '4.5 inch', price: 80, originalPrice: 100, stockQuantity: 195, brandIdx: 2 }),
  createProduct({ name: 'MediCare Home First Aid Kit Box', genericName: 'Complete 35-Item Household Emergency Case', category: 'First Aid', dosageForm: 'Kit Box', strength: '35 Items', price: 549, originalPrice: 699, stockQuantity: 110, brandIdx: 0 }),
  createProduct({ name: 'Sterile Oval Eye Pads Pack 5s', genericName: 'Soft Non-Adherent Gauze Eye Coverings', category: 'First Aid', dosageForm: 'Pads', strength: '5 Pads', price: 45, originalPrice: 55, stockQuantity: 260, brandIdx: 3 }),
  createProduct({ name: 'Paraffin Non-Adherent Gauze 10s', genericName: 'Jelonet Sterile Petrolatum Tulle Gras', category: 'First Aid', dosageForm: 'Dressing', strength: '10x10cm 10s', price: 165, originalPrice: 200, stockQuantity: 180, brandIdx: 4 }),
  createProduct({ name: 'Steri-Strip Wound Closures 10s', genericName: 'Reinforced Adhesive Surgical Skin Closures', category: 'First Aid', dosageForm: 'Strips', strength: '10 Strips', price: 130, originalPrice: 160, stockQuantity: 210, brandIdx: 5 }),
  createProduct({ name: 'CPR Pocket Mask with One-Way Valve', genericName: 'Emergency Resuscitation Barrier Device', category: 'First Aid', dosageForm: 'Mask Device', strength: '1 Unit', price: 175, originalPrice: 225, stockQuantity: 140, brandIdx: 6 }),

  // ==================== 11. VITAMINS (25) ====================
  createProduct({ name: 'Calcirol 60,000 IU Vitamin D3', genericName: 'Cholecalciferol Granules Sachet 1g', category: 'Vitamins', dosageForm: 'Sachet', strength: '60,000 IU', price: 42, originalPrice: 50, stockQuantity: 480, brandIdx: 1 }),
  createProduct({ name: 'Limcee 500mg Chewable Vitamin C', genericName: 'Ascorbic Acid + Sodium Ascorbate 500mg', category: 'Vitamins', dosageForm: 'Chewable Tablet', strength: '500mg (15s)', price: 26, originalPrice: 32, stockQuantity: 550, brandIdx: 2 }),
  createProduct({ name: 'Celin 500mg Vitamin C Tablets', genericName: 'Pure Ascorbic Acid 500mg', category: 'Vitamins', dosageForm: 'Chewable Tablet', strength: '500mg (25s)', price: 44, originalPrice: 52, stockQuantity: 490, brandIdx: 3 }),
  createProduct({ name: 'Neurobion Forte B12 Tablets 30s', genericName: 'Thiamine, Riboflavin, Niacinamide, B12', category: 'Vitamins', dosageForm: 'Tablet', strength: '30 Tablets', price: 42, originalPrice: 48, stockQuantity: 620, brandIdx: 4 }),
  createProduct({ name: 'Evion Forte Vitamin E + C Caps', genericName: 'Tocopheryl 400mg with Vitamin C 100mg', category: 'Vitamins', dosageForm: 'Capsule', strength: '10 Capsules', price: 65, originalPrice: 75, stockQuantity: 340, brandIdx: 5 }),
  createProduct({ name: 'Keraglo-Eva Hair Biotin Tablets', genericName: 'Biotin 10mg + Amino Acids + Minerals', category: 'Vitamins', dosageForm: 'Tablet', strength: '30 Tablets', price: 495, originalPrice: 590, stockQuantity: 180, brandIdx: 6 }),
  createProduct({ name: 'Arovit 50,000 IU Vitamin A Caps', genericName: 'Retinol Palmitate High Potency 30s', category: 'Vitamins', dosageForm: 'Capsule', strength: '50,000 IU', price: 85, originalPrice: 105, requiresPrescription: true, stockQuantity: 140, brandIdx: 7 }),
  createProduct({ name: 'Menaquin K2-7 + D3 Bone Formula', genericName: 'Menaquinone-7 (Vit K2) 55mcg + D3', category: 'Vitamins', dosageForm: 'Tablet', strength: '30 Tablets', price: 340, originalPrice: 410, stockQuantity: 160, brandIdx: 8 }),
  createProduct({ name: 'Methycobal 1500mcg Sublingual', genericName: 'Pure Active Methylcobalamin 1500mcg', category: 'Vitamins', dosageForm: 'Sublingual Tab', strength: '1500mcg (10s)', price: 145, originalPrice: 175, stockQuantity: 260, brandIdx: 9 }),
  createProduct({ name: 'Benalgis 100mg Benfotiamine Tabs', genericName: 'Fat-Soluble Bioactive Vitamin B1 100mg', category: 'Vitamins', dosageForm: 'Tablet', strength: '100mg', price: 165, originalPrice: 198, stockQuantity: 150, brandIdx: 10 }),
  createProduct({ name: 'Revital H Woman Daily Multi-Tabs', genericName: 'Iron, Calcium, Ginseng & Essential Vitamins', category: 'Vitamins', dosageForm: 'Tablet', strength: '30 Tablets', price: 310, originalPrice: 360, stockQuantity: 280, brandIdx: 8 }),
  createProduct({ name: 'Zincovit Complete Multivitamin 15s', genericName: '13 Essential Vitamins with Zinc & Selenium', category: 'Vitamins', dosageForm: 'Tablet', strength: '15 Tablets', price: 105, originalPrice: 120, stockQuantity: 450, brandIdx: 1 }),
  createProduct({ name: 'Centrum Adults 50+ Multivitamin', genericName: 'Senior Complete Micronutrient Formulation', category: 'Vitamins', dosageForm: 'Tablet', strength: '30 Tablets', price: 440, originalPrice: 520, stockQuantity: 190, brandIdx: 13 }),
  createProduct({ name: 'Nutrolin-B Plus Vitamin & Probiotic', genericName: 'B-Complex with Lactobacillus Coagulans', category: 'Vitamins', dosageForm: 'Capsule', strength: '20 Capsules', price: 92, originalPrice: 110, stockQuantity: 240, brandIdx: 0 }),
  createProduct({ name: 'Fast&Up Charge Natural Vitamin C', genericName: 'Amla Extract 1000mg Effervescent Orange', category: 'Vitamins', dosageForm: 'Effervescent Tabs', strength: '20 Tablets', price: 315, originalPrice: 390, stockQuantity: 310, brandIdx: 14 }),
  createProduct({ name: 'Ostocalcium Plus Vitamin D & B12', genericName: 'Calcium Phosphate with Vitamin D3 Chewable', category: 'Vitamins', dosageForm: 'Chewable Tablet', strength: '30 Tablets', price: 175, originalPrice: 205, stockQuantity: 320, brandIdx: 11 }),
  createProduct({ name: 'Prevense Prenatal Multi + DHA', genericName: 'Folate, Iron, DHA & Trace Minerals', category: 'Vitamins', dosageForm: 'Softgel Capsule', strength: '30 Softgels', price: 420, originalPrice: 510, stockQuantity: 160, brandIdx: 2 }),
  createProduct({ name: 'Upbeat Vitamin B6 Pyridoxine 50mg', genericName: 'Pure Vitamin B6 Pyridoxine HCl 50mg', category: 'Vitamins', dosageForm: 'Tablet', strength: '30 Tablets', price: 48, originalPrice: 60, stockQuantity: 200, brandIdx: 3 }),
  createProduct({ name: 'Niacin 500mg Non-Flush B3 Tabs', genericName: 'Inositol Hexanicotinate Vitamin B3 500mg', category: 'Vitamins', dosageForm: 'Tablet', strength: '30 Tablets', price: 290, originalPrice: 350, stockQuantity: 130, brandIdx: 4 }),
  createProduct({ name: 'Pantothenic Acid 500mg Vit B5', genericName: 'D-Calcium Pantothenate Cellular Energy', category: 'Vitamins', dosageForm: 'Capsule', strength: '60 Capsules', price: 380, originalPrice: 460, stockQuantity: 115, brandIdx: 5 }),
  createProduct({ name: 'Active Folate L-Methylfolate 1mg', genericName: 'Metafolin Bioavailable L-Methylfolate', category: 'Vitamins', dosageForm: 'Tablet', strength: '30 Tablets', price: 260, originalPrice: 320, stockQuantity: 175, brandIdx: 6 }),
  createProduct({ name: 'Gummy Vites Kids Multivitamins', genericName: 'Pectin Fruit Gummy Multi-Nutrients 30s', category: 'Vitamins', dosageForm: 'Gummies', strength: '30 Gummies', price: 299, originalPrice: 399, stockQuantity: 240, brandIdx: 13 }),
  createProduct({ name: 'Liposomal Vitamin C 1000mg Liquid', genericName: 'High-Absorption Phospholipid Vitamin C', category: 'Vitamins', dosageForm: 'Liquid Elixir', strength: '150ml', price: 650, originalPrice: 799, stockQuantity: 95, brandIdx: 14 }),
  createProduct({ name: 'Arachitol Nano Vitamin D3 60K', genericName: 'Ready-to-Drink Nano Emulsion D3 5ml Bottle', category: 'Vitamins', dosageForm: 'Oral Shot', strength: '5ml', price: 85, originalPrice: 98, stockQuantity: 360, brandIdx: 0 }),
  createProduct({ name: 'Zincovit-C Immune Lozenges 24s', genericName: 'Vitamin C + Zinc + Menthol Soothing Drops', category: 'Vitamins', dosageForm: 'Lozenge', strength: '24 Drops', price: 68, originalPrice: 80, stockQuantity: 410, brandIdx: 1 }),

  // ==================== 12. SUPPLEMENTS (25) ====================
  createProduct({ name: 'Optimum Nutrition Gold Whey 1kg', genericName: 'Whey Protein Isolate & Concentrate Rich', category: 'Supplements', dosageForm: 'Powder Tub', strength: '1 kg', price: 2899, originalPrice: 3499, stockQuantity: 65, brandIdx: 14 }),
  createProduct({ name: 'MuscleBlaze Biozyme Whey 1kg', genericName: 'Enhanced Absorption Protein Formula 1kg', category: 'Supplements', dosageForm: 'Powder Tub', strength: '1 kg', price: 2499, originalPrice: 2999, stockQuantity: 80, brandIdx: 14 }),
  createProduct({ name: 'Plant Protein Organic Chocolate 500g', genericName: 'Pea & Brown Rice Protein with Enzymes', category: 'Supplements', dosageForm: 'Powder Tub', strength: '500g', price: 1199, originalPrice: 1499, stockQuantity: 110, brandIdx: 10 }),
  createProduct({ name: 'Micronized Creatine Monohydrate', genericName: '100% Pure Creatine 3g/serve 250g', category: 'Supplements', dosageForm: 'Powder Tub', strength: '250g', price: 749, originalPrice: 999, stockQuantity: 150, brandIdx: 14 }),
  createProduct({ name: 'BCAA Pro Intra-Workout Fuel 300g', genericName: 'Branched Chain Amino Acids 2:1:1 Ratio', category: 'Supplements', dosageForm: 'Powder Tub', strength: '300g', price: 949, originalPrice: 1299, stockQuantity: 130, brandIdx: 14 }),
  createProduct({ name: 'TrueBasics Triple Strength Omega 3', genericName: '1250mg Fish Oil with 560mg EPA & 400mg DHA', category: 'Supplements', dosageForm: 'Softgel Capsule', strength: '60 Softgels', price: 799, originalPrice: 999, stockQuantity: 175, brandIdx: 14 }),
  createProduct({ name: 'Antarctic Pure Krill Oil 500mg', genericName: 'Phospholipid Bound Omega-3 with Astaxanthin', category: 'Supplements', dosageForm: 'Softgel Capsule', strength: '30 Softgels', price: 649, originalPrice: 799, stockQuantity: 120, brandIdx: 14 }),
  createProduct({ name: 'Calcimax Joint Health Formula', genericName: 'Glucosamine Sulfate + Chondroitin + MSM', category: 'Supplements', dosageForm: 'Tablet', strength: '60 Tablets', price: 460, originalPrice: 560, stockQuantity: 190, brandIdx: 0 }),
  createProduct({ name: 'Marine Collagen Peptides 200g', genericName: 'Hydrolyzed Type 1 & 3 Marine Collagen', category: 'Supplements', dosageForm: 'Powder Tub', strength: '200g', price: 999, originalPrice: 1399, stockQuantity: 105, brandIdx: 14 }),
  createProduct({ name: 'Magnesium Glycinate 400mg Sleep', genericName: 'High Absorption Chelate Magnesium 60s', category: 'Supplements', dosageForm: 'Capsule', strength: '60 Capsules', price: 549, originalPrice: 699, stockQuantity: 160, brandIdx: 14 }),
  createProduct({ name: 'Zinc Picolinate 50mg High Purity', genericName: 'Highly Bioavailable Zinc Salt 60s', category: 'Supplements', dosageForm: 'Tablet', strength: '60 Tablets', price: 349, originalPrice: 429, stockQuantity: 210, brandIdx: 14 }),
  createProduct({ name: 'Ashwagandha KSM-66 Full Spectrum', genericName: 'Root Extract 600mg Stress Support 60s', category: 'Supplements', dosageForm: 'Capsule', strength: '60 Capsules', price: 599, originalPrice: 749, stockQuantity: 240, brandIdx: 10 }),
  createProduct({ name: 'Brahmi Pure Mind Extract 500mg', genericName: 'Bacopa Monnieri 20% Bacosides 60s', category: 'Supplements', dosageForm: 'Tablet', strength: '60 Tablets', price: 210, originalPrice: 260, stockQuantity: 220, brandIdx: 10 }),
  createProduct({ name: 'Milk Thistle Silymarin Detox 600mg', genericName: '80% Silymarin Herbal Liver Cleanser 60s', category: 'Supplements', dosageForm: 'Capsule', strength: '60 Capsules', price: 480, originalPrice: 590, stockQuantity: 170, brandIdx: 11 }),
  createProduct({ name: 'Probiotic 50 Billion CFU Multi', genericName: '16 Beneficial Strains + Prebiotic FOS', category: 'Supplements', dosageForm: 'Capsule', strength: '30 Capsules', price: 699, originalPrice: 899, stockQuantity: 135, brandIdx: 14 }),
  createProduct({ name: 'Organic Apple Cider Vinegar 500ml', genericName: 'Raw Unfiltered ACV with "Mother" 5%', category: 'Supplements', dosageForm: 'Liquid Bottle', strength: '500ml', price: 249, originalPrice: 329, stockQuantity: 260, brandIdx: 11 }),
  createProduct({ name: 'Spirulina 100% Organic 500mg 100s', genericName: 'Sun-Grown Blue Green Algae Superfood', category: 'Supplements', dosageForm: 'Tablet', strength: '100 Tablets', price: 280, originalPrice: 350, stockQuantity: 200, brandIdx: 10 }),
  createProduct({ name: 'Moringa Leaf Powder Organic 200g', genericName: 'Dried Drumstick Tree Leaf Nutri-Powder', category: 'Supplements', dosageForm: 'Powder Pouch', strength: '200g', price: 195, originalPrice: 240, stockQuantity: 180, brandIdx: 12 }),
  createProduct({ name: 'L-Carnitine L-Tartrate 1000mg', genericName: 'Mitochondrial Fat Burn & Energy Tabs', category: 'Supplements', dosageForm: 'Tablet', strength: '60 Tablets', price: 649, originalPrice: 799, stockQuantity: 145, brandIdx: 14 }),
  createProduct({ name: 'Melatonin 5mg Sleep Support 30s', genericName: 'Fast Dissolve Natural Circadian Hormone', category: 'Supplements', dosageForm: 'Melt-in-Mouth Tab', strength: '30 Tablets', price: 220, originalPrice: 275, stockQuantity: 290, brandIdx: 0 }),
  createProduct({ name: 'L-Theanine 200mg Calm & Focus', genericName: 'Green Tea Amino Acid Relaxation Caps', category: 'Supplements', dosageForm: 'Capsule', strength: '60 Capsules', price: 499, originalPrice: 629, stockQuantity: 130, brandIdx: 14 }),
  createProduct({ name: 'Trans-Resveratrol 250mg Longevity', genericName: 'Polygonum Cuspidatum Root Extract 30s', category: 'Supplements', dosageForm: 'Capsule', strength: '30 Capsules', price: 749, originalPrice: 949, stockQuantity: 90, brandIdx: 14 }),
  createProduct({ name: 'L-Glutathione 500mg Skin Glow', genericName: 'Reduced Setria Glutathione with Vit C', category: 'Supplements', dosageForm: 'Tablet', strength: '30 Tablets', price: 999, originalPrice: 1299, stockQuantity: 115, brandIdx: 14 }),
  createProduct({ name: 'Garcinia Cambogia Hydroxycitric 60s', genericName: '60% HCA Weight Management Extract', category: 'Supplements', dosageForm: 'Capsule', strength: '60 Capsules', price: 349, originalPrice: 449, stockQuantity: 165, brandIdx: 10 }),
  createProduct({ name: 'Calcium Citrate Malate + Zinc 60s', genericName: 'Gentle Non-Constipating Calcium Formula', category: 'Supplements', dosageForm: 'Tablet', strength: '60 Tablets', price: 265, originalPrice: 320, stockQuantity: 240, brandIdx: 1 }),

  // ==================== 13. BABY CARE (25) ====================
  createProduct({ name: 'Sebamed Baby Diaper Rash Cream 100ml', genericName: 'Micronized Titanium Dioxide & Panthenol pH 5.5', category: 'Baby Care', dosageForm: 'Barrier Cream', strength: '100ml', price: 480, originalPrice: 560, stockQuantity: 190, brandIdx: 14 }),
  createProduct({ name: 'Sudocrem Antiseptic Baby Cream 125g', genericName: 'Zinc Oxide 15.25% Diaper Dermatitis Care', category: 'Baby Care', dosageForm: 'Barrier Ointment', strength: '125g', price: 385, originalPrice: 450, stockQuantity: 210, brandIdx: 13 }),
  createProduct({ name: 'Himalaya Baby Diaper Rash Zinc 50g', genericName: 'Yashada Bhasma & Nirgundi Herbal Cream', category: 'Baby Care', dosageForm: 'Cream', strength: '50g', price: 110, originalPrice: 130, stockQuantity: 340, brandIdx: 10 }),
  createProduct({ name: 'Johnson Baby Nourishing Lotion 200ml', genericName: 'Gentle Coconut Oil Hydration Lotion', category: 'Baby Care', dosageForm: 'Lotion', strength: '200ml', price: 165, originalPrice: 190, stockQuantity: 420, brandIdx: 13 }),
  createProduct({ name: 'Sebamed Tear-Free Baby Wash 200ml', genericName: 'Soap-Free Sugar Tenside Complex pH 5.5', category: 'Baby Care', dosageForm: 'Cleanser Wash', strength: '200ml', price: 490, originalPrice: 580, stockQuantity: 160, brandIdx: 14 }),
  createProduct({ name: 'Himalaya Gentle Baby Shampoo 200ml', genericName: 'Hibiscus & Chickpea Tear-Free Cleanser', category: 'Baby Care', dosageForm: 'Shampoo', strength: '200ml', price: 155, originalPrice: 180, stockQuantity: 360, brandIdx: 10 }),
  createProduct({ name: 'Bonnisan Pediatric Colic Drops 30ml', genericName: 'Dill, Cardamom & Tinospora Digestive Drops', category: 'Baby Care', dosageForm: 'Drops', strength: '30ml', price: 65, originalPrice: 75, stockQuantity: 380, brandIdx: 10 }),
  createProduct({ name: 'Colic-Aid Anti-Flatulent Infant Drops', genericName: 'Simethicone + Dill Oil + Fennel Oil 15ml', category: 'Baby Care', dosageForm: 'Oral Drops', strength: '15ml', price: 58, originalPrice: 70, stockQuantity: 270, brandIdx: 0 }),
  createProduct({ name: 'D-3 Must 400 IU Pediatric Drops 15ml', genericName: 'Cholecalciferol Infant Vitamin D Drops', category: 'Baby Care', dosageForm: 'Oral Drops', strength: '15ml', price: 78, originalPrice: 92, stockQuantity: 310, brandIdx: 1 }),
  createProduct({ name: 'Becozinc Pediatric Nutri-Drops 15ml', genericName: 'Multivitamin with Zinc Infant Solution', category: 'Baby Care', dosageForm: 'Drops', strength: '15ml', price: 55, originalPrice: 65, stockQuantity: 260, brandIdx: 2 }),
  createProduct({ name: 'Nasivion Mini Infant Nasal Drops 10ml', genericName: 'Oxymetazoline HCl 0.01% Decongestant', category: 'Baby Care', dosageForm: 'Nasal Drops', strength: '10ml', price: 52, originalPrice: 62, requiresPrescription: true, stockQuantity: 240, brandIdx: 3 }),
  createProduct({ name: 'Salinex Pediatric Isotonic Nasal Spray', genericName: '0.9% Sterile Ocean Sea Salt Flush 30ml', category: 'Baby Care', dosageForm: 'Nasal Spray', strength: '30ml', price: 145, originalPrice: 175, stockQuantity: 210, brandIdx: 4 }),
  createProduct({ name: 'Mother Sparsh 99% Pure Water Wipes', genericName: 'Medical Grade Plant Fabric Unscented 72s', category: 'Baby Care', dosageForm: 'Wet Wipes', strength: '72 Wipes', price: 185, originalPrice: 225, stockQuantity: 390, brandIdx: 13 }),
  createProduct({ name: 'Himalaya Pure Bamboo Baby Wipes 72s', genericName: 'Aloe Vera & Indian Lotus Infused Wipes', category: 'Baby Care', dosageForm: 'Wet Wipes', strength: '72 Wipes', price: 140, originalPrice: 170, stockQuantity: 440, brandIdx: 10 }),
  createProduct({ name: 'Figaro Pure Olive Oil Baby Massage', genericName: '100% Spanish Extra Virgin Massage Oil 200ml', category: 'Baby Care', dosageForm: 'Oil Bottle', strength: '200ml', price: 295, originalPrice: 345, stockQuantity: 280, brandIdx: 13 }),
  createProduct({ name: 'Himalaya Baby Massage Oil 200ml', genericName: 'Olive Oil & Winter Cherry Nourishing Oil', category: 'Baby Care', dosageForm: 'Oil Bottle', strength: '200ml', price: 165, originalPrice: 195, stockQuantity: 350, brandIdx: 10 }),
  createProduct({ name: 'Mamaearth Natural Soothing Chest Rub', genericName: 'Wintergreen, Eucalyptus & Peppermint Balm 50ml', category: 'Baby Care', dosageForm: 'Balm', strength: '50ml', price: 179, originalPrice: 225, stockQuantity: 220, brandIdx: 14 }),
  createProduct({ name: 'Oralife Teething Gel Soothing 15g', genericName: 'Natural Chamomile & Liquorice Extract', category: 'Baby Care', dosageForm: 'Dental Gel', strength: '15g', price: 95, originalPrice: 120, stockQuantity: 190, brandIdx: 5 }),
  createProduct({ name: 'Enterogermina Probiotic Vials for Kids', genericName: 'Bacillus Clausii 2 Billion Spores/5ml', category: 'Baby Care', dosageForm: 'Oral Vials', strength: '10x5ml Vials', price: 495, originalPrice: 560, stockQuantity: 180, brandIdx: 6 }),
  createProduct({ name: 'Talc-Free Natural Baby Powder 200g', genericName: 'Cornstarch & Zinc Oxide Dusting Powder', category: 'Baby Care', dosageForm: 'Dusting Powder', strength: '200g', price: 135, originalPrice: 160, stockQuantity: 330, brandIdx: 10 }),
  createProduct({ name: 'Mamaearth Mineral Baby Sunscreen SPF 20', genericName: 'Zinc Oxide & Cocoa Butter Sunblock 50ml', category: 'Baby Care', dosageForm: 'Sunscreen Lotion', strength: '50ml', price: 249, originalPrice: 299, stockQuantity: 170, brandIdx: 14 }),
  createProduct({ name: 'Pure Silicone Soft Teether BPA-Free', genericName: 'Food Grade Textured Soothing Teether', category: 'Baby Care', dosageForm: 'Accessory', strength: '1 Unit', price: 125, originalPrice: 160, stockQuantity: 260, brandIdx: 13 }),
  createProduct({ name: 'Infra-Temp Pediatric Forehead Thermometer', genericName: 'Non-Contact Instant Infrared Sensor', category: 'Baby Care', dosageForm: 'Device', strength: '1 Unit', price: 799, originalPrice: 1199, stockQuantity: 95, brandIdx: 7 }),
  createProduct({ name: 'Baby Fabric Liquid Wash Eco-Friendly', genericName: 'Plant Enzyme Hypoallergenic Detergent 500ml', category: 'Baby Care', dosageForm: 'Liquid Bottle', strength: '500ml', price: 249, originalPrice: 299, stockQuantity: 210, brandIdx: 14 }),
  createProduct({ name: 'Anti-Mosquito Roll-On Natural 50ml', genericName: 'Citronella & Lemongrass Essential Shield', category: 'Baby Care', dosageForm: 'Roll-on', strength: '50ml', price: 110, originalPrice: 135, stockQuantity: 340, brandIdx: 10 }),
];

const seedDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medicare';

  try {
    console.log('[Seed] Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('[Seed] MongoDB connection established.');

    const collection = mongoose.connection.collection('medicines');

    // Create bulk upsert operations to ensure idempotency (no duplicates on re-run)
    const operations = rawCatalog.map((item) => ({
      updateOne: {
        filter: { name: item.name },
        update: { $set: item },
        upsert: true,
      },
    }));

    console.log(`[Seed] Processing ${operations.length} medicine records across 13 categories...`);
    const bulkResult = await collection.bulkWrite(operations);

    const totalCount = await collection.countDocuments();
    console.log('--------------------------------------------------');
    console.log(`[Seed SUCCESS] Matched: ${bulkResult.matchedCount}, Upserted: ${bulkResult.upsertedCount}`);
    console.log(`[Seed SUCCESS] Total medicines now in database: ${totalCount}`);
    console.log('--------------------------------------------------');

    // Seed inventory matching these medicines if inventory collection is empty
    const inventoryCollection = mongoose.connection.collection('inventories');
    const existingInventoryCount = await inventoryCollection.countDocuments();

    if (existingInventoryCount === 0) {
      console.log('[Seed] Initializing matching inventory shelf records...');
      const allMedicines = await collection.find({}).toArray();
      const inventoryOps = allMedicines.map((med, idx) => ({
        updateOne: {
          filter: { medicine: med._id },
          update: {
            $set: {
              medicine: med._id,
              batchNumber: `BAT-2026-${String(idx + 1).padStart(4, '0')}`,
              currentStock: med.stockQuantity,
              reorderLevel: 25,
              costPrice: Math.round(med.price * 0.7),
              supplierName: med.manufacturer || med.brand,
              lastRestockedDate: new Date(),
              expiryDate: med.expiryDate,
              locationShelf: `Rack-${String.fromCharCode(65 + (idx % 6))}-${(idx % 20) + 1}`,
              updatedAt: new Date(),
              createdAt: new Date(),
            },
          },
          upsert: true,
        },
      }));

      await inventoryCollection.bulkWrite(inventoryOps);
      console.log(`[Seed] Created ${inventoryOps.length} inventory records linked to medicines.`);
    }

    process.exit(0);
  } catch (error) {
    console.error('[Seed ERROR]:', error.message);
    process.exit(1);
  }
};

seedDatabase();
