<?php
namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiseaseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('diseases')->truncate();

        $diseases = [
            ['diseaseName' => 'Influenza', 'diseaseDescription' => 'A common viral infection that affects the respiratory system.', 'isActive' => 'Active'],
            ['diseaseName' => 'Diabetes', 'diseaseDescription' => 'A chronic disease that affects insulin production and blood sugar levels.', 'isActive' => 'Active'],
            ['diseaseName' => 'Hypertension', 'diseaseDescription' => 'A condition characterized by high blood pressure.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Asthma', 'diseaseDescription' => 'A respiratory condition marked by spasms in the bronchi of the lungs.', 'isActive' => 'Active'],
            ['diseaseName' => 'Tuberculosis', 'diseaseDescription' => 'An infectious disease that mainly affects the lungs.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Arthritis', 'diseaseDescription' => 'Inflammation of one or more joints, causing pain and stiffness.', 'isActive' => 'Active'],
            ['diseaseName' => 'Migraine', 'diseaseDescription' => 'A neurological condition characterized by intense headaches.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Pneumonia', 'diseaseDescription' => 'An infection that inflames air sacs in one or both lungs.', 'isActive' => 'Active'],
            ['diseaseName' => 'Hepatitis B', 'diseaseDescription' => 'A serious liver infection caused by the hepatitis B virus.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Malaria', 'diseaseDescription' => 'A disease caused by a plasmodium parasite, transmitted by the bite of infected mosquitoes.', 'isActive' => 'Active'],
            ['diseaseName' => 'Common Cold', 'diseaseDescription' => 'A viral infection affecting the upper respiratory tract.', 'isActive' => 'Active'],
            ['diseaseName' => 'Chickenpox', 'diseaseDescription' => 'A contagious viral infection causing an itchy rash and blisters.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Dengue', 'diseaseDescription' => 'A mosquito-borne viral infection causing fever and severe body pain.', 'isActive' => 'Active'],
            ['diseaseName' => 'Typhoid', 'diseaseDescription' => 'A bacterial infection that spreads through contaminated food and water.', 'isActive' => 'Active'],
            ['diseaseName' => 'COVID-19', 'diseaseDescription' => 'A highly infectious respiratory disease caused by the SARS-CoV-2 virus.', 'isActive' => 'Active'],
            ['diseaseName' => 'Measles', 'diseaseDescription' => 'A viral infection causing fever, cough, and a characteristic skin rash.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Food Poisoning', 'diseaseDescription' => 'A condition caused by consuming contaminated food.', 'isActive' => 'Active'],
            ['diseaseName' => 'Skin Allergy', 'diseaseDescription' => 'A reaction of the skin to allergens, causing redness and itching.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Obesity', 'diseaseDescription' => 'A medical condition involving excessive body fat.', 'isActive' => 'Active'],
            ['diseaseName' => 'Anemia', 'diseaseDescription' => 'A condition where the body lacks enough healthy red blood cells.', 'isActive' => 'Active'],
            ['diseaseName' => 'Jaundice', 'diseaseDescription' => 'A condition causing yellowing of the skin and eyes due to liver dysfunction.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Acne', 'diseaseDescription' => 'A common skin condition that occurs when hair follicles become clogged.', 'isActive' => 'Active'],
            ['diseaseName' => 'Gastroenteritis', 'diseaseDescription' => 'An infection causing inflammation of the stomach and intestines.', 'isActive' => 'Active'],
            ['diseaseName' => 'Sinusitis', 'diseaseDescription' => 'An inflammation of the sinuses causing congestion and headaches.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Bronchitis', 'diseaseDescription' => 'Inflammation of the bronchial tubes in the lungs.', 'isActive' => 'Active'],
            ['diseaseName' => 'Eczema', 'diseaseDescription' => 'A condition that makes the skin red, dry, and itchy.', 'isActive' => 'Active'],
            ['diseaseName' => 'Gout', 'diseaseDescription' => 'A form of arthritis characterized by severe pain, redness, and swelling in joints.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Osteoporosis', 'diseaseDescription' => 'A condition that weakens bones, making them fragile and more likely to break.', 'isActive' => 'Active'],
            ['diseaseName' => 'Parkinson’s Disease', 'diseaseDescription' => 'A nervous system disorder that affects movement.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Epilepsy', 'diseaseDescription' => 'A disorder in which nerve cell activity in the brain is disturbed, causing seizures.', 'isActive' => 'Active'],
            ['diseaseName' => 'Meningitis', 'diseaseDescription' => 'Inflammation of the protective membranes covering the brain and spinal cord.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Rabies', 'diseaseDescription' => 'A deadly virus spread to people from the saliva of infected animals.', 'isActive' => 'Active'],
            ['diseaseName' => 'Tetanus', 'diseaseDescription' => 'A bacterial infection characterized by muscle stiffness and spasms.', 'isActive' => 'Active'],
            ['diseaseName' => 'HIV/AIDS', 'diseaseDescription' => 'A disease affecting the immune system, caused by the human immunodeficiency virus.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Cholera', 'diseaseDescription' => 'A bacterial disease causing severe diarrhea and dehydration.', 'isActive' => 'Active'],
            ['diseaseName' => 'Hemophilia', 'diseaseDescription' => 'A rare disorder in which the blood does not clot properly.', 'isActive' => 'Active'],
            ['diseaseName' => 'Alzheimer’s Disease', 'diseaseDescription' => 'A progressive disease that destroys memory and other mental functions.', 'isActive' => 'Inactive'],
            ['diseaseName' => 'Cystic Fibrosis', 'diseaseDescription' => 'A genetic disorder affecting the lungs and digestive system.', 'isActive' => 'Active'],
        ];

        foreach ($diseases as $disease) {
            DB::table('diseases')->insert([
                'diseaseName'        => $disease['diseaseName'],
                'diseaseDescription' => $disease['diseaseDescription'],
                'isActive'           => $disease['isActive'],
                'created_at'         => Carbon::now(),
                'updated_at'         => Carbon::now(),
            ]);
        }
    }
}
