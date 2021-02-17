var qrcode = new QRCode(document.getElementById("qrcode"), {
    width: 150,
    height: 150,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.L
});

function makeCode() {
    var elText = [];

    elText.push("CNo:");
    elText.push(($("#txtCourtNo").val()) ? $("#txtCourtNo").val() : "0");
    elText.push(";");
    elText.push("RNo:");
    elText.push(($("#txtRegNo").val()) ? $("#txtRegNo").val() : "0");
    elText.push(";");
    elText.push(($("#txtTransferCourtNo").val()) ? "TCNo:" : "");
    elText.push(($("#txtTransferCourtNo").val()) ? $("#txtTransferCourtNo").val() : "");
    elText.push(($("#txtTransferCourtNo").val()) ? ";" : "");
    elText.push(($("#txtTransferRegNo").val()) ? "TRNo:" : "");
    elText.push(($("#txtTransferRegNo").val()) ? $("#txtTransferRegNo").val() : "");
    elText.push(($("#txtTransferRegNo").val()) ? ";" : "");
    elText.push("Fee:");
    elText.push(($("#rbExempt").prop("checked") || $("#rbExemptAppTrans").prop("checked")) ? "E" : "Q");
    elText.push(";");
    elText.push("DFl:");
    elText.push(($("#txtDateFiled").val()) ? $("#txtDateFiled").val() : " ");
    elText.push(";");
    elText.push("DMr:");
    elText.push(($("#txtDateofMarriage").val()) ? $("#txtDateofMarriage").val() : " ");
    elText.push(";");
    elText.push("ASx:");
    elText.push(($("#rbApplicantMale").prop("checked")) ? "M" : "");
    elText.push(($("#rbApplicantFemale").prop("checked")) ? "F" : "");
    elText.push(";");
    elText.push("Jnt:");
    elText.push(($("#rbApplicantJoint").prop("checked")) ? "true" : "false");
    elText.push(";");
    elText.push("ASne:");
    elText.push(($("#txtApplicantSurname").val()) ? $("#txtApplicantSurname").val() : " ");
    elText.push(";");
    elText.push("AGne:");
    elText.push(($("#txtApplicantGivenName").val()) ? $("#txtApplicantGivenName").val() : " ");
    elText.push(";");
    elText.push(($("#txtApplicantMiddleName").val()) ? "AMne:" : "");
    elText.push(($("#txtApplicantMiddleName").val()) ? $("#txtApplicantMiddleName").val() : "");
    elText.push(($("#txtApplicantMiddleName").val()) ? ";" : "");
    elText.push(($("#txtApplicantDateofBirth").val()) ? "ADob:" : "");
    elText.push(($("#txtApplicantDateofBirth").val()) ? $("#txtApplicantDateofBirth").val() : "");
    elText.push(($("#txtApplicantDateofBirth").val()) ? ";" : "");
    elText.push("RSx:");
    elText.push(($("#rbRespondentMale").prop("checked")) ? "M" : "");
    elText.push(($("#rbRespondentFemale").prop("checked")) ? "F" : "");
    elText.push(";");
    elText.push("RSne:");
    elText.push(($("#txtRespondentSurname").val()) ? $("#txtRespondentSurname").val() : " ");
    elText.push(";");
    elText.push("RGne:");
    elText.push(($("#txtRespondentGivenName").val()) ? $("#txtRespondentGivenName").val() : " ");
    elText.push(";");
    elText.push(($("#txtRespondentMiddleName").val()) ? "RMne:" : "");
    elText.push(($("#txtRespondentMiddleName").val()) ? $("#txtRespondentMiddleName").val() : "");
    elText.push(($("#txtRespondentMiddleName").val()) ? ";" : "");
    elText.push(($("#txtRespondentDateofBirth").val()) ? "RDob:" : "");
    elText.push(($("#txtRespondentDateofBirth").val()) ? $("#txtRespondentDateofBirth").val() : "");
    elText.push(($("#txtRespondentDateofBirth").val()) ? ";" : "");
    elText.push("Dsi:");
    elText.push(($("#txtDateSigned").val()) ? $("#txtDateSigned").val() : " ");

    qrcode.makeCode(elText.join(""));

    setAllCookies();
}