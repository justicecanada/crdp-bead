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