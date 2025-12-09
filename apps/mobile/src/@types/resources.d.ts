interface Resources {
  translation: {
    about: {
      contactEmail: "Email: mohammedjrt+sudancodexsupport@gmail.com";
      contactTitle: "Contact";
      dataSourceDescription: "The Sudan drug index data was extracted from the";
      dataSourceLinkText: "National Medicines and Poisons Board report";
      dataSourceTitle: "Data Sources";
      dataSourceYear: "from 2023.";
      developerDescription: "Developed by Mohammed Mahmoud — Pharmacist & hobbyist coder.";
      developerTitle: "Developer";
      privacyPolicy: "Privacy Policy";
      purposeDescription: "This app helps pharmacists and healthcare professionals in Sudan is about registered drug brands, their generics, and manufacturers — creating a community-driven national drug registry.";
      purposeTitle: "Purpose";
      rightsReserved: "All rights reserved.";
      title: "About This App";
      versionTitle: "Version";
    };
    auth: {
      title: "Sign up or Log in";
      welcome: "Welcome!";
    };
    completeProfile: {
      age: {
        placeholder: "Enter your age";
        title: "Age";
      };
      description: "Please complete your profile information.";
      occupation: {
        options: {
          administrator: "Administrator";
          other: "Other";
          pharmacist: "Pharmacist";
          student: "Student";
        };
        placeholder: "Select occupation";
        selectLabel: "Select your occupation";
        title: "Occupation";
      };
      phoneNumber: {
        placeholder: "Enter your phone number";
        title: "Phone Number";
      };
      submit: "Submit";
      title: "Complete Profile";
      university: {
        placeholder: "Enter your university";
        title: "University";
      };
      updateError: "Failed to update profile. Please try again.";
    };
    drugInfo: {
      accordion: {
        administration: "Administration";
        adultDose: "Adult Dose";
        classification: "Classification";
        clinicalUse: "Clinical use";
        contraindications: "Contraindications";
        indications: "Indications";
        majorInteractions: "Major Interactions";
        mechanismOfAction: "Mechanism of Action";
        minorInteractions: "Minor Interactions";
        pediatricDose: "Pediatric Dose";
        pregnancy: "Pregnancy";
        sideEffects: "Side Effects";
      };
      agent: "Agent";
      companyName: "Company Name";
      countryOfOrigin: "Country of Origin";
      disclaimer: "Disclaimer";
      disclaimerDescription: "This app provides drug information for <1>reference only</1>. It is not a substitute for professional judgment or official product literature. Always verify details before prescribing or dispensing.";
      dosageForm: "Dosage Form";
      errorLoading: "Error loading data";
      genericName: "Generic Name";
      noDataAvailable: "No Data Available";
      noDetailsFound: "No details found for {{genericName}}";
      packSize: "Pack Size";
      strength: "Strength";
      sudanDrugIndexNote: "Note: The Sudan drug index data provided may contain formatting errors, and some information could be inaccurate. Please review the details below carefully. If any information does not match your records, disregard it.";
    };
    drugList: {
      noMoreResults: "No more results";
      searchTerm: "Search Term";
      title: "Drug List";
    };
    settings: {
      account: {
        alertMessage: "This action cannot be undone.";
        alertTitle: "Are you sure you want to delete your account?";
        cancelBtn: "Cancel";
        delete: "Delete Account";
        deleteBtn: "Delete";
        signOut: "Sign Out";
      };
      cardInformation: "Card Information";
      cardInformationDescription: "Press on the text to get the information";
      changeLanguage: "Change Language";
      changeTheme: "Change Theme";
      header: "Settings";
      help: {
        whatsApp: {
          btn: "Want help? contact me on WhatsApp";
          message: "Explain the problem and please provide any screenshot";
        };
      };
      languageChange: "The language has been changed to {{lang}}";
      restartNow: "Restart Now";
      restartRequired: "The app needs to be restarted to apply the changes";
      screens: {
        about: "About";
        account: "Account";
        appearanceAndLang: "Appearance and Language";
        help: "Help";
      };
      tooltips: {
        brandAndStrength: "This is the brand/trade name and the concentration/strength";
        distributor: "This is the agent name i.e. the distributor. for example Amipharma";
        dosageForm: "This is the dosage form, e.g. tablet, capsule, suspension, etc.";
        genericName: "This is the generic/scientific name";
        manufacturer: "This is the company name, i.e. the manufacturer";
        origin: "This is the country of origin";
        packSize: "This is the pack size, i.e. the amount of tablet in the box";
      };
    };
    tabs: {
      drugList: "Drug List";
      settings: "Settings";
    };
  };
}

export default Resources;
