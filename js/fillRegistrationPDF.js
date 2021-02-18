const formId = "CRDPRegistration";
const qrCodeId = "qrcode";
const fieldNames = {
    "Cno": {
        fieldType: "Number",
        defaultValue: "0",
        valueSource: "CourtNoTo",
        sourceType: "id"
    },
    "RNo": {
        fieldType: "Number",
        defaultValue: "0",
        valueSource: "RegistryNoTo",
        sourceType: "id"
    },
    "TCNo": {
        fieldType: "Number",
        defaultValue: "0",
        valueSource: "CourtNoFrom",
        sourceType: "id"
    },
    "TRNo": {
        fieldType: "Number",
        defaultValue: "0",
        valueSource: "RegistryNoFrom",
        sourceType: "id"
    },
    "Fee": {                            // Q (FeeQuarterly==true) || E (FeeExempt==true || FeeTransferred==true)
        fieldType: "Option",
        valueSource: "FeeType",
        sourceType: "name"
    },
    "Prv": {
        fieldType: "String",
        valueSource: "Province",
        sourceType: "id"
    },
    "DFl": {
        fieldType: "Date",
        fieldFormat: "YYYY-MM-DD",
        valueSource: "DateFiled",
        sourceType: "id"
    },
    "DMr": {
        fieldType: "Date",
        fieldFormat: "YYYY-MM-DD",
        valueSource: "DateMarriage",
        sourceType: "id"
    },
    "Jnt": {                                    // true (JointApplicant1 && JointApplicant2) || false
        fieldType: "Boolean",
        valueSource: "Applicant1Type",
        sourceType: "name"
    },
    "ASx": {                                    // M (male) || F (female) || A (another gender) || I (Information not available)
        fieldType: "Option",
        valueSource: "Applicant1Gender",
        sourceType: "name"
    },
    "ASne": {
        fieldType: "String",
        valueSource: "Applicant1Surname",
        sourceType: "id"
    },
    "AGne": {
        fieldType: "String",
        valueSource: "Applicant1GivenNames",
        sourceType: "id"
    },
    "ADob": {
        fieldType: "Date",
        fieldFormat: "YYYY-MM-DD",
        valueSource: "Applicant1DateBirth",
        sourceType: "id"
    },
    "RSx": {                                    // M (male) || F (female) || A (another gender) || I (Information not available)
        fieldType: "Option",
        valueSource: "Applicant2Gender",
        sourceType: "name"
    },
    "RSne": {
        fieldType: "String",
        valueSource: "Applicant2Surname",
        sourceType: "id"
    },
    "RGne": {
        fieldType: "String",
        valueSource: "Applicant2GivenNames",
        sourceType: "id"
    },
    "RDob": {
        fieldType: "Date",
        fieldFormat: "YYYY-MM-DD",
        valueSource: "Applicant2DateBirth",
        sourceType: "id"
    },
    "Dsi": {
        fieldType: "Date",
        fieldFormat: "YYYY-MM-DD",
        valueSource: "DateSigned",
        sourceType: "id"
    }
};

const PDFDocument = PDFLib.PDFDocument;

function generateQRCode() {
    var qrcodeData = "";

    Object.keys(fieldNames).forEach(function(key) {
        var fieldSpecs = fieldNames[key];
        var fieldValue = null;

        switch(fieldSpecs.sourceType) {
            case "id":
                fieldValue = document.getElementById(fieldSpecs.valueSource).value;
                break;
            case "name":
                fieldValue = document.forms[formId].elements.namedItem(fieldSpecs.valueSource).value;
                break;
            default:
                console.log("Error: Unsupported field source.\n\n" + key + ": " + fieldSpecs.sourceType);
        }
        
        qrcodeData += key + ":" + fieldValue + ";";
    });

    clearQRCode();
    var qrcode = new QRCode(document.getElementById(qrCodeId), {
        width: 150,
        height: 150,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.L
    });

    qrcode.makeCode(qrcodeData);
}

function clearQRCode() {
    var qrcode = document.getElementById(qrCodeId);
    qrcode.removeAttribute("title");
    while(qrcode.firstChild) {
        qrcode.removeChild(qrcode.lastChild);
    }
}

async function createPDF() {
	var myImgSrc = document.getElementById("qrcode").getElementsByTagName("img")[0].src;

	var formUrl = null;
	if (document.documentElement.lang == 'en') {
		formUrl = './pdf/form-eng.pdf';
	} else if (document.documentElement.lang == 'fr') {
		formUrl = './pdf/form-fra.pdf';
	}
	
	const arrayBuffer = await fetch(formUrl).then(res => res.arrayBuffer());
	const pdfDoc = await PDFDocument.load(arrayBuffer);
	const qrImage = await pdfDoc.embedPng(myImgSrc);
	const form = pdfDoc.getForm();
	const qrImageField = form.getButton('qrImage');

    qrImageField.setImage(qrImage);

    // court use fields
    const AppCourtField = form.getTextField('ApplicationCourt');
	AppCourtField.setMaxLength(4);
	const AppRegistryField = form.getTextField('ApplicationRegistry');
	AppRegistryField.setMaxLength(6);
	const TransferredCourtField = form.getTextField('TransferredCourt');
	TransferredCourtField.setMaxLength(4);
	const TransferredRegistryField = form.getTextField('TransferredRegistry');
	TransferredRegistryField.setMaxLength(6);
	const PrescribedFeesFields = form.getRadioGroup('PrescribedFees');

    // divorce fields
    const ProvinceField = form.getTextField('Province');
	ProvinceField.setMaxLength(30);
	const DateFiledYearField = form.getTextField('DateFiledYear');
	DateFiledYearField.setMaxLength(30);
	const DateFiledMonthField = form.getTextField('DateFiledMonth');
	DateFiledMonthField.setMaxLength(30);
	const DateFiledDayField = form.getTextField('DateFiledDay');
	DateFiledDayField.setMaxLength(30);
	const DateMarriageYearField = form.getTextField('DateMarriageYear');
	DateMarriageYearField.setMaxLength(30);
	const DateMarriageMonthField = form.getTextField('DateMarriageMonth');
	DateMarriageMonthField.setMaxLength(30);
	const DateMarriageDayField = form.getTextField('DateMarriageDay');
	DateMarriageDayField.setMaxLength(30);

    // applicant 1 fields
	const ApplicantChoiceFields = form.getRadioGroup('ApplicantChoice');
	const ApplicantGenderFields = form.getRadioGroup('ApplicantGender');
	const ApplicantSurnameField = form.getTextField('ApplicantSurname');
	ApplicantSurnameField.setMaxLength(30);
	const ApplicantGivenNameField = form.getTextField('ApplicantGivenName');
	ApplicantGivenNameField.setMaxLength(30);
	const ApplicantDateOfBirthYearField = form.getTextField('ApplicantDateOfBirthYear');
	ApplicantDateOfBirthYearField.setMaxLength(30);
	const ApplicantDateOfBirthMonthField = form.getTextField('ApplicantDateOfBirthMonth');
	ApplicantDateOfBirthMonthField.setMaxLength(30);
	const ApplicantDateOfBirthDayField = form.getTextField('ApplicantDateOfBirthDay');
	ApplicantDateOfBirthDayField.setMaxLength(30);

    // applicant 2 fields
    const RespondentChoiceFields = form.getRadioGroup('RespondentChoice');
	const RespondentGenderFields = form.getRadioGroup('RespondentGender');
	const RespondentSurnameField = form.getTextField('RespondentSurname');
	RespondentSurnameField.setMaxLength(30);
	const RespondentGivenNameField = form.getTextField('RespondentGivenName');
	RespondentGivenNameField.setMaxLength(30);
	const RespondentDateOfBirthYearField = form.getTextField('RespondentDateOfBirthYear');
	RespondentDateOfBirthYearField.setMaxLength(30);
	const RespondentDateOfBirthMonthField = form.getTextField('RespondentDateOfBirthMonth');
	RespondentDateOfBirthMonthField.setMaxLength(30);
	const RespondentDateOfBirthDayField = form.getTextField('RespondentDateOfBirthDay');
	RespondentDateOfBirthDayField.setMaxLength(30);

	// official fields
	const DateSignedField = form.getTextField('DateSigned');
	DateSignedField.setMaxLength(30);

    // populate fields in PDF form
	AppCourtField.setText(document.getElementById('CourtNoTo').value);
	AppRegistryField.setText(document.getElementById('RegistryNoTo').value);
	TransferredCourtField.setText(document.getElementById('CourtNoFrom').value);
	TransferredRegistryField.setText(document.getElementById('RegistryNoFrom').value);
	var selectedPrescribedFeeButton = new String();
	if (document.getElementById('FeeQuarterly').checked === true) {
		selectedPrescribedFeeButton = 'InvoicedQuarterly';
		form.getRadioGroup('PrescribedFees').select(selectedPrescribedFeeButton);
	}
	if (document.getElementById('FeeExempt').checked === true) {
		selectedPrescribedFeeButton = 'Exempt';
		form.getRadioGroup('PrescribedFees').select(selectedPrescribedFeeButton);
	}
	if (document.getElementById('FeeTransferred').checked === true) {
		selectedPrescribedFeeButton = 'ExemptTransferred';
		form.getRadioGroup('PrescribedFees').select(selectedPrescribedFeeButton);
	}
	ProvinceField.setText(document.getElementById('Province').value);
	if (DateFiled != "") {
		var dateFiledArray = document.getElementById('DateFiled').value.split("-");
		DateFiledYearField.setText(dateFiledArray[0]);
		DateFiledMonthField.setText(dateFiledArray[1]);
		DateFiledDayField.setText(dateFiledArray[2]);
	}
	if (DateMarriage != "") {
		var dateOfMarraigeArray = document.getElementById('DateMarriage').value.split("-");
		DateMarriageYearField.setText(dateOfMarraigeArray[0]);
		DateMarriageMonthField.setText(dateOfMarraigeArray[1]);
		DateMarriageDayField.setText(dateOfMarraigeArray[2]);
	}
	var selectedApplicantChoiceButton = new String();
	if (document.getElementById('Applicant1').checked === true) {
		selectedApplicantChoiceButton = 'Applicant';
		ApplicantChoiceFields.select(selectedApplicantChoiceButton);
	}
	if (document.getElementById('JointApplicant1').checked === true) {
		selectedApplicantChoiceButton = 'ApplicantJointApplicant';
		ApplicantChoiceFields.select(selectedApplicantChoiceButton);
	}
	var selectedApplicantGenderButton = new String();
	if (document.getElementById('Applicant1Male').checked === true) {
		selectedApplicantGenderButton = 'ApplicantMale';
		ApplicantGenderFields.select(selectedApplicantGenderButton);
	}
	if (document.getElementById('Applicant1Female').checked === true) {
		selectedApplicantGenderButton = 'ApplicantFemale';
		ApplicantGenderFields.select(selectedApplicantGenderButton);
	}
	if (document.getElementById('Applicant1Another').checked === true) {
		selectedApplicantGenderButton = 'ApplicantAnother';
		ApplicantGenderFields.select(selectedApplicantGenderButton);
	}
	if (document.getElementById('Applicant1NotAvailable').checked === true) {
		selectedApplicantGenderButton = 'ApplicantNotAvailable';
		ApplicantGenderFields.select(selectedApplicantGenderButton);
	}
	ApplicantSurnameField.setText(document.getElementById('Applicant1Surname').value);
	ApplicantGivenNameField.setText(document.getElementById('Applicant1GivenNames').value);
	if (Applicant1DateBirth != "") {
		var dateOfBirth1Array = document.getElementById('Applicant1DateBirth').value.split("-");
		ApplicantDateOfBirthYearField.setText(dateOfBirth1Array[0]);
		ApplicantDateOfBirthMonthField.setText(dateOfBirth1Array[1]);
		ApplicantDateOfBirthDayField.setText(dateOfBirth1Array[2]);
	}
	var selectedRespondentChoiceButton = new String();
	if (document.getElementById('Respondent2').checked === true) {
		selectedRespondentChoiceButton = 'Respondent';
		RespondentChoiceFields.select(selectedRespondentChoiceButton);
	}
	if (document.getElementById('JointApplicant2').checked === true) {
		selectedRespondentChoiceButton = 'RespondentJointApplicant';
		RespondentChoiceFields.select(selectedRespondentChoiceButton);
	}
	var selectedRespondentGenderButton = new String();
	if (document.getElementById('Applicant2Male').checked === true) {
		selectedRespondentGenderButton = 'RespondentMale';
		RespondentGenderFields.select(selectedRespondentGenderButton);
	}
	if (document.getElementById('Applicant2Female').checked === true) {
		selectedRespondentGenderButton = 'RespondentFemale';
		RespondentGenderFields.select(selectedRespondentGenderButton);
	}
	if (document.getElementById('Applicant2Another').checked === true) {
		selectedApplicantGenderButton = 'RespondentAnother';
		RespondentGenderFields.select(selectedApplicantGenderButton);
	}
	if (document.getElementById('Applicant2NotAvailable').checked === true) {
		selectedApplicantGenderButton = 'RespondentNotAvailable';
		RespondentGenderFields.select(selectedApplicantGenderButton);
	}
	RespondentSurnameField.setText(document.getElementById('Applicant2Surname').value);
	RespondentGivenNameField.setText(document.getElementById('Applicant2GivenNames').value);
	if (Applicant2DateBirth != "") {
		var dateOfBirth2Array = document.getElementById('Applicant2DateBirth').value.split("-");
		RespondentDateOfBirthYearField.setText(dateOfBirth2Array[0]);
		RespondentDateOfBirthMonthField.setText(dateOfBirth2Array[1]);
		RespondentDateOfBirthDayField.setText(dateOfBirth2Array[2]);
	}
	DateSignedField.setText(document.getElementById('DateSigned').value);

    form.flatten();
	const pdfBytes = await pdfDoc.save();

    if (document.documentElement.lang == 'en') {
        download(pdfBytes, "form-eng.pdf", "application/pdf");
	} else if (document.documentElement.lang == 'fr') {
        download(pdfBytes, "form-fra.pdf", "application/pdf");
    }
}

async function fillRegistrationPDF() {
    generateQRCode();
    setTimeout(createPDF, 20);
}
  