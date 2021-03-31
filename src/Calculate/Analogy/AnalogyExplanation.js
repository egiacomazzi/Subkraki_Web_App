import analogyTexts from "../../resources/analogyTexts.json";

/**
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */
export function getText(
  analogy,
  analogyTextIndex,
  correct,
  beginningBoolean,
  endBoolean,
  analogySubPanelVisibilityParam
) {
  let beginningAnalogy = beginningBoolean;
  let endAnalogy = endBoolean;
  let analogySubPanelVisibility = analogySubPanelVisibilityParam;
  let styling = [0, 0, 0];

  let updateCorrectionsAndResultObj;

  // helper Variables
  let tempCorrectionStep = null;
  let einerIndex = analogy.min.length - 1;
  let zehnerIndex = analogy.min.length - 2;
  let hunderterIndex = analogy.min.length - 3;
  // variables to create correct texts
  let digit = analogyTexts.digits;
  let digit_with_n = analogyTexts.digits_with_n;

  let text = {
    correct: analogyTexts.correct,
    noCorrection1digit: analogyTexts.noCorrection1digit,
    noCorrectionMoredigits: analogyTexts.noCorrectionMoredigits,
    withCorrectionEinerstelleFalse: analogyTexts.withCorrectionEinerstelleFalse,
    withCorrectionAbZehnerFalse: analogyTexts.withCorrectionAbZehnerFalse,
    analogy: analogyTexts.analogy,
  };
  // returns text to display while changing the helper variables to the correct state
  let returntext = returnText(correct, analogyTextIndex);
  // object to return to the main class to adjust variables accordingly
  let returnObject = {
    updateCorrectionsAndResultObj: updateCorrectionsAndResultObj,
    correct: correct,
    text: returntext,
    endAnalogy: endAnalogy,
    beginningAnalogy: beginningAnalogy,
    analogySubPanelVisibility: analogySubPanelVisibility,
    styling: styling,
    einerIndex: einerIndex,
    zehnerIndex: zehnerIndex,
    hunderterIndex: hunderterIndex,
    analogy: analogy,
  };

  console.log(returnObject);
  return returnObject;
  // produces following text
  //" Wir fangen bei den Einern an und rechnen Minuend[einerIndex] - Subtrahend[einerIndex] = Ergebnis[einerIndex]."
  function returnStringStartEinerstelleWithoutCorrection() {
    return (
      text.withCorrectionAbZehnerFalse[0] +
      digit_with_n[0] +
      text.withCorrectionAbZehnerFalse[1] +
      analogy.min[einerIndex] +
      "\u00a0-\u00a0" +
      analogy.sub[einerIndex] +
      "\u00a0=\u00a0" +
      analogy.res[einerIndex] +
      "."
    );
  }

  // Function to return the String of "Jetzt rechnen wir die stellestelle mit min-sub=res."
  // with inputs at which column (stelle) the calculation of the corresponding min-sub=res happens
  function returnStringNoCorrection(stelle, min, sub, res) {
    var string =
      text.noCorrectionMoredigits[0] +
      stelle +
      text.noCorrectionMoredigits[1] +
      min +
      "\u00a0-\u00a0" +
      sub +
      "\u00a0=\u00a0" +
      res +
      ".";
    return string;
  }
  // Produces followin text
  // "Wir fangen bei der Einerspalte ganz rechts an.
  // Wir könne nicht einfach min[einerIndex]-sub[einerIndex] rechnen, da min[einerIndex] kleiner als sub[einerIndex] ist."
  function returnStringStartEinerstelle() {
    var string1WithCorrection2Digits =
      text.withCorrectionEinerstelleFalse[0] +
      analogy.min[einerIndex] +
      "\u00a0-\u00a0" +
      analogy.sub[einerIndex] +
      text.withCorrectionEinerstelleFalse[1] +
      analogy.min[einerIndex] +
      text.withCorrectionEinerstelleFalse[2] +
      analogy.sub[einerIndex] +
      text.withCorrectionEinerstelleFalse[3];
    return string1WithCorrection2Digits;
  }
  // Produces following text
  // "Weiter geht es in der Zehnerzeile. Wir können nicht einfach min-sub[zehnerIndex] rechnen,
  // da min kleiner als sub[zehnerIndex] ist."
  function returnStringZehnerstelle(min) {
    var string =
      text.withCorrectionAbZehnerFalse[2] +
      digit[1] +
      text.withCorrectionAbZehnerFalse[3] +
      min +
      "\u00a0-\u00a0" +
      analogy.sub[zehnerIndex] +
      text.withCorrectionAbZehnerFalse[4] +
      min +
      text.withCorrectionAbZehnerFalse[5] +
      analogy.sub[zehnerIndex] +
      text.withCorrectionAbZehnerFalse[6];
    return string;
  }
  // Produces the following lines of text:
  // "Wir müssen uns 10 von der stelle2stelle leihen. Wir ziehen 1 von den stelle2n ab,
  // also min[index2]-1=cor[index2], und erhalten dafür 10 stelle1, also min[index1]+10=cor[index1]."
  function returnStringCorrectionStep(
    stelle1,
    stelle2,
    index1,
    index2,
    min,
    cor,
    special = false,
    specialHunderter = false
  ) {
    if (special) {
      var corIndex2 = cor[index2] - 10;
    } else {
      corIndex2 = cor[index2];
    }
    if (specialHunderter) {
      var minIndex1 = cor[index1] - 10;
    } else {
      minIndex1 = min[index1];
    }
    var string2WithCorrection2Digits =
      text.withCorrectionEinerstelleFalse[4] +
      stelle2 +
      text.withCorrectionEinerstelleFalse[5] +
      stelle2 +
      "n " +
      text.withCorrectionEinerstelleFalse[6] +
      min[index2] +
      text.withCorrectionEinerstelleFalse[7] +
      corIndex2 +
      text.withCorrectionEinerstelleFalse[8] +
      stelle1 +
      text.withCorrectionEinerstelleFalse[9] +
      minIndex1 +
      text.withCorrectionEinerstelleFalse[10] +
      cor[index1] +
      ".";
    return string2WithCorrection2Digits;
  }
  // Produces the following lines of text:
  // Tadaaa! Wir haben unser Ergebnis. Probiere es gleich nochmal mit deiner Aufgabe.
  function returnStringFinalResult() {
    return text.analogy[2];
  }

  function updateCorrectionsAndResult(
    crossHunderter,
    crossZehner,
    crossEiner,
    corHunderter,
    corZehner,
    corEiner,
    resHunderter,
    resZehner,
    resEiner
  ) {
    // create update object to return to main class
    updateCorrectionsAndResultObj = {
      crossHunderter: crossHunderter,
      crossZehner: crossZehner,
      crossEiner: crossEiner,
      corHunderter: corHunderter,
      corZehner: corZehner,
      corEiner: corEiner,
      resHunderter: resHunderter,
      resZehner: resZehner,
      resEiner: resEiner,
    };
    updateCorrectionsAndResultObj = JSON.parse(
      JSON.stringify(updateCorrectionsAndResultObj)
    );
    return;
  }

  function returnText(correct, analogyTextIndex) {
    // var updateCorrectionsAndResultObj;
    if (correct) {
      endAnalogy = true;
      beginningAnalogy = true;
      // important if one first gets the exercise wrong and then correct
      analogySubPanelVisibility = "hidden";
      // update analogy
      updateCorrectionsAndResult(
        false,
        false,
        false,
        NaN,
        NaN,
        NaN,
        NaN,
        NaN,
        NaN
      );
      return text.correct[0];
    } else {
      endAnalogy = false;
      beginningAnalogy = true;
      // update analogy
      updateCorrectionsAndResult(
        false,
        false,
        false,
        NaN,
        NaN,
        NaN,
        NaN,
        NaN,
        NaN
      );
      // first two texts needed for all analogies
      switch (analogyTextIndex) {
        case 0:
          beginningAnalogy = true;
          endAnalogy = false;
          analogySubPanelVisibility = "hidden";
          return text.analogy[0];
        case 1:
          beginningAnalogy = false;
          endAnalogy = false;
          analogySubPanelVisibility = "hidden";
          styling = [0, 0, 0];
          return text.analogy[1];
      }
      analogySubPanelVisibility = "visible";

      // Analogies with no corrections
      const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

      if (equals(analogy.min, analogy.cor)) {
        // no correction + 1 digit long
        if (analogy.min.length === 1) {
          switch (analogyTextIndex) {
            case 2:
              var stringNoCorr1Digit =
                text.noCorrection1digit[0] +
                analogy.min[0] +
                " - " +
                analogy.sub[0] +
                text.noCorrection1digit[1] +
                analogy.res[0] +
                ".";
              // update analogy
              updateCorrectionsAndResult(
                false,
                false,
                false,
                NaN,
                NaN,
                NaN,
                NaN,
                NaN,
                analogy.res[0]
              );

              //update styling
              styling = [1, 0, 0];
              beginningAnalogy = false;
              endAnalogy = false;

              return stringNoCorr1Digit;
            case 3:
              var finalString = returnStringFinalResult();
              endAnalogy = true;
              beginningAnalogy = false;
              // update analogy
              updateCorrectionsAndResult(
                false,
                false,
                false,
                NaN,
                NaN,
                NaN,
                NaN,
                NaN,
                analogy.res[0]
              );
              styling = [0, 0, 0];
              return finalString;
          }
        } else {
          // no correction + 2-3 digit long
          switch (analogyTextIndex) {
            case 2:
              var string2multipleDigits = returnStringStartEinerstelleWithoutCorrection();

              // update analogy
              updateCorrectionsAndResult(
                false,
                false,
                false,
                NaN,
                NaN,
                NaN,
                NaN,
                NaN,
                analogy.res[einerIndex]
              );

              //update styling
              styling = einerIndex === 2 ? [0, 0, 1] : [0, 1, 0];
              //update arrows
              beginningAnalogy = false;
              endAnalogy = false;

              return string2multipleDigits;
            case 3:
              var string3multipleDigits = returnStringNoCorrection(
                digit[1],
                analogy.min[zehnerIndex],
                analogy.sub[zehnerIndex],
                analogy.res[zehnerIndex]
              );
              // update analogy
              updateCorrectionsAndResult(
                false,
                false,
                false,
                NaN,
                NaN,
                NaN,
                NaN,
                analogy.res[zehnerIndex],
                analogy.res[einerIndex]
              );

              //update styling
              styling = einerIndex === 2 ? [0, 1, 0] : [1, 0, 0];

              //update arrows
              beginningAnalogy = false;
              endAnalogy = false;

              return string3multipleDigits;
            case 4:
              if (hunderterIndex < 0) {
                finalString = returnStringFinalResult();
                // update analogy
                updateCorrectionsAndResult(
                  false,
                  false,
                  false,
                  NaN,
                  NaN,
                  NaN,
                  NaN,
                  analogy.res[zehnerIndex],
                  analogy.res[einerIndex]
                );
                //update arrows
                beginningAnalogy = false;
                endAnalogy = true;
                styling = [0, 0, 0];
                return finalString;
              }

              var string4multipleDigits = returnStringNoCorrection(
                digit[2],
                analogy.min[hunderterIndex],
                analogy.sub[hunderterIndex],
                analogy.res[hunderterIndex]
              );
              // update analogy
              updateCorrectionsAndResult(
                false,
                false,
                false,
                NaN,
                NaN,
                NaN,
                analogy.res[hunderterIndex],
                analogy.res[zehnerIndex],
                analogy.res[einerIndex]
              );

              //update styling
              styling = [1, 0, 0];

              //update arrows
              beginningAnalogy = false;
              endAnalogy = false;

              return string4multipleDigits;
            case 5:
              finalString = returnStringFinalResult();
              //update arrows
              beginningAnalogy = false;
              endAnalogy = true;
              // update analogy
              updateCorrectionsAndResult(
                false,
                false,
                false,
                NaN,
                NaN,
                NaN,
                analogy.res[hunderterIndex],
                analogy.res[zehnerIndex],
                analogy.res[einerIndex]
              );
              styling = [0, 0, 0];
              return finalString;
          }
        }
      } else {
        // corrections need to be done
        if (analogy.min.length === 2) {
          // corrections with 2 digit analogy
          switch (analogyTextIndex) {
            case 2:
              var string1WithCorrection2Digits = returnStringStartEinerstelle();
              // update analogy
              updateCorrectionsAndResult(
                false,
                false,
                false,
                NaN,
                NaN,
                NaN,
                NaN,
                NaN,
                NaN
              );
              //update styling
              styling = [0, 1, 0];
              //update arrows
              beginningAnalogy = false;
              endAnalogy = false;
              return string1WithCorrection2Digits;
            case 3:
              var string2WithCorrection2Digits = returnStringCorrectionStep(
                digit[0],
                digit[1],
                einerIndex,
                zehnerIndex,
                analogy.min,
                analogy.cor
              );

              // update analogy
              updateCorrectionsAndResult(
                false,
                true,
                true,
                NaN,
                analogy.cor[zehnerIndex],
                analogy.cor[einerIndex],
                NaN,
                NaN,
                NaN
              );

              //update styling
              styling = [0, 1, 0];

              //update arrows
              beginningAnalogy = false;
              endAnalogy = false;

              return string2WithCorrection2Digits;
            case 4:
              var string4withCorrection = returnStringNoCorrection(
                digit[0],
                analogy.cor[einerIndex],
                analogy.sub[einerIndex],
                analogy.res[einerIndex]
              );

              // update analogy
              updateCorrectionsAndResult(
                false,
                true,
                true,
                NaN,
                analogy.cor[zehnerIndex],
                analogy.cor[einerIndex],
                NaN,
                NaN,
                analogy.res[einerIndex]
              );

              //update styling
              styling = [0, 1, 0];

              //update arrows
              beginningAnalogy = false;
              endAnalogy = false;

              return string4withCorrection;
            case 5:
              var string5withCorrection = returnStringNoCorrection(
                digit[1],
                analogy.cor[zehnerIndex],
                analogy.sub[zehnerIndex],
                analogy.res[zehnerIndex]
              );

              // update analogy
              updateCorrectionsAndResult(
                false,
                true,
                true,
                NaN,
                analogy.cor[zehnerIndex],
                analogy.cor[einerIndex],
                NaN,
                analogy.res[zehnerIndex],
                analogy.res[einerIndex]
              );

              //update styling
              styling = [1, 0, 0];

              //update arrows
              beginningAnalogy = false;
              endAnalogy = false;

              return string5withCorrection;
            case 6:
              finalString = returnStringFinalResult();
              //update arrows
              beginningAnalogy = false;
              endAnalogy = true;
              // update analogy
              updateCorrectionsAndResult(
                false,
                true,
                true,
                NaN,
                analogy.cor[zehnerIndex],
                analogy.cor[einerIndex],
                NaN,
                analogy.res[zehnerIndex],
                analogy.res[einerIndex]
              );
              styling = [0, 0, 0];
              return finalString;
          }
        } else {
          //analogy with correction and more than 2 digits
          if (analogy.min[einerIndex] === analogy.cor[einerIndex]) {
            // Einerstelle does not need any correction but Zehner and Hunderter
            switch (analogyTextIndex) {
              case 2:
                var string2withCorrectioninBack = returnStringStartEinerstelleWithoutCorrection();
                // update analogy
                updateCorrectionsAndResult(
                  false,
                  false,
                  false,
                  NaN,
                  NaN,
                  NaN,
                  NaN,
                  NaN,
                  analogy.res[einerIndex]
                );
                //update styling
                styling = [0, 0, 1];
                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;

                return string2withCorrectioninBack;
              case 3:
                var string3withCorrectioninBack = returnStringZehnerstelle(
                  analogy.min[zehnerIndex]
                );
                // update analogy
                updateCorrectionsAndResult(
                  false,
                  false,
                  false,
                  NaN,
                  NaN,
                  NaN,
                  NaN,
                  NaN,
                  analogy.res[einerIndex]
                );
                //update styling
                styling = [0, 1, 0];

                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;
                return string3withCorrectioninBack;
              case 4:
                var string4withCorrectioninBack = returnStringCorrectionStep(
                  digit[1],
                  digit[2],
                  zehnerIndex,
                  hunderterIndex,
                  analogy.min,
                  analogy.cor
                );

                // update analogy
                updateCorrectionsAndResult(
                  true,
                  true,
                  false,
                  analogy.cor[hunderterIndex],
                  analogy.cor[zehnerIndex],
                  NaN,
                  NaN,
                  NaN,
                  analogy.res[einerIndex]
                );
                //update styling
                styling = [0, 1, 0];

                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;

                return string4withCorrectioninBack;
              case 5:
                var string5withCorrectioninBack = returnStringNoCorrection(
                  digit[1],
                  analogy.cor[zehnerIndex],
                  analogy.sub[zehnerIndex],
                  analogy.res[zehnerIndex]
                );

                // update analogy
                updateCorrectionsAndResult(
                  true,
                  true,
                  false,
                  analogy.cor[hunderterIndex],
                  analogy.cor[zehnerIndex],
                  NaN,
                  NaN,
                  analogy.res[zehnerIndex],
                  analogy.res[einerIndex]
                );

                //update styling
                styling = [0, 1, 0];

                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;

                return string5withCorrectioninBack;
              case 6:
                var string6withCorrectioninBack = returnStringNoCorrection(
                  digit[2],
                  analogy.cor[hunderterIndex],
                  analogy.sub[hunderterIndex],
                  analogy.res[hunderterIndex]
                );

                // update analogy
                updateCorrectionsAndResult(
                  true,
                  true,
                  false,
                  analogy.cor[hunderterIndex],
                  analogy.cor[zehnerIndex],
                  NaN,
                  analogy.res[hunderterIndex],
                  analogy.res[zehnerIndex],
                  analogy.res[einerIndex]
                );

                //update styling
                styling = [1, 0, 0];

                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;

                return string6withCorrectioninBack;
              case 7:
                finalString = returnStringFinalResult();
                //update arrows
                endAnalogy = true;
                beginningAnalogy = false;
                // update analogy
                updateCorrectionsAndResult(
                  true,
                  true,
                  false,
                  analogy.cor[hunderterIndex],
                  analogy.cor[zehnerIndex],
                  NaN,
                  analogy.res[hunderterIndex],
                  analogy.res[zehnerIndex],
                  analogy.res[einerIndex]
                );
                styling = [0, 0, 0];
                return finalString;
            }
          } else if (analogy.min[zehnerIndex] === analogy.cor[zehnerIndex]) {
            //correction at Einer and Zehnerstelle only
            switch (analogyTextIndex) {
              case 2:
                var string2withCorrectioninFront = returnStringStartEinerstelle();
                // update analogy
                updateCorrectionsAndResult(
                  false,
                  false,
                  false,
                  NaN,
                  NaN,
                  NaN,
                  NaN,
                  NaN,
                  NaN
                );
                //update styling
                styling = [0, 0, 1];

                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;
                return string2withCorrectioninFront;
              case 3:
                var string3withCorrectioninFront = returnStringCorrectionStep(
                  digit[0],
                  digit[1],
                  einerIndex,
                  zehnerIndex,
                  analogy.min,
                  analogy.cor
                );

                // update analogy
                updateCorrectionsAndResult(
                  false,
                  true,
                  true,
                  NaN,
                  analogy.cor[zehnerIndex],
                  analogy.cor[einerIndex],
                  NaN,
                  NaN,
                  NaN
                );

                //update styling
                styling = [0, 0, 1];

                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;

                return string3withCorrectioninFront;
              case 4:
                var string4withCorrectioninFront = returnStringNoCorrection(
                  digit[0],
                  analogy.cor[einerIndex],
                  analogy.sub[einerIndex],
                  analogy.res[einerIndex]
                );

                // update analogy
                updateCorrectionsAndResult(
                  false,
                  true,
                  true,
                  NaN,
                  analogy.cor[zehnerIndex],
                  analogy.cor[einerIndex],
                  NaN,
                  NaN,
                  analogy.res[einerIndex]
                );

                //update styling
                styling = [0, 0, 1];

                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;

                return string4withCorrectioninFront;
              case 5:
                var string5withCorrectioninFront = returnStringNoCorrection(
                  digit[1],
                  analogy.cor[zehnerIndex],
                  analogy.sub[zehnerIndex],
                  analogy.res[zehnerIndex]
                );

                // update analogy
                updateCorrectionsAndResult(
                  false,
                  true,
                  true,
                  NaN,
                  analogy.cor[zehnerIndex],
                  analogy.cor[einerIndex],
                  NaN,
                  analogy.res[zehnerIndex],
                  analogy.res[einerIndex]
                );

                //update styling
                styling = [0, 1, 0];

                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;

                return string5withCorrectioninFront;
              case 6:
                var string6withCorrectioninFront = returnStringNoCorrection(
                  digit[2],
                  analogy.cor[hunderterIndex],
                  analogy.sub[hunderterIndex],
                  analogy.res[hunderterIndex]
                );

                // update analogy
                updateCorrectionsAndResult(
                  false,
                  true,
                  true,
                  NaN,
                  analogy.cor[zehnerIndex],
                  analogy.cor[einerIndex],
                  analogy.res[hunderterIndex],
                  analogy.res[zehnerIndex],
                  analogy.res[einerIndex]
                );

                //update styling
                styling = [1, 0, 0];

                //update arrows
                beginningAnalogy = false;
                endAnalogy = false;

                return string6withCorrectioninFront;
              case 7:
                finalString = returnStringFinalResult();
                //update arrows
                endAnalogy = true;
                beginningAnalogy = false;
                // update analogy
                updateCorrectionsAndResult(
                  false,
                  true,
                  true,
                  NaN,
                  analogy.cor[zehnerIndex],
                  analogy.cor[einerIndex],
                  analogy.res[hunderterIndex],
                  analogy.res[zehnerIndex],
                  analogy.res[einerIndex]
                );
                styling = [0, 0, 0];
                return finalString;
            }
          } else {
            // all minuend digits need a correction
            if (Number(analogy.min[zehnerIndex]) === 0) {
              // if zehner is 0 and einer needs to borough from zehner this special case happens
              //TODOOOOO besser machen, zu volle Sprechblase. Muss in einzelne Teile aufgeteilt werden.
              switch (analogyTextIndex) {
                case 2:
                  var string2withCorrectionAllZero = returnStringStartEinerstelle();
                  // update analogy
                  updateCorrectionsAndResult(
                    false,
                    false,
                    false,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN
                  );
                  //update styling
                  styling = [0, 0, 1];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;
                  return string2withCorrectionAllZero;
                case 3:
                  var string3withCorrectionAllZero =
                    analogyTexts.special_case_3;
                  // update analogy
                  updateCorrectionsAndResult(
                    false,
                    false,
                    false,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN
                  );

                  //update styling
                  styling = [0, 0, 1];
                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;
                  return string3withCorrectionAllZero;

                case 4:
                  var string4withCorrectionAllZero =
                    analogyTexts.special_case_4[0] +
                    analogy.min[hunderterIndex] +
                    analogyTexts.special_case_4[1] +
                    analogy.cor[hunderterIndex] +
                    analogyTexts.special_case_4[2];

                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    false,
                    analogy.cor[hunderterIndex],
                    "10",
                    NaN,
                    NaN,
                    NaN,
                    NaN
                  );

                  //update styling
                  styling = [0, 0, 1];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;
                  return string4withCorrectionAllZero;
                case 5:
                  var string5withCorrectionAllZero =
                    analogyTexts.special_case_5[0] +
                    analogy.cor[zehnerIndex] +
                    analogyTexts.special_case_5[1] +
                    analogy.min[einerIndex] +
                    analogyTexts.special_case_5[2] +
                    analogy.cor[einerIndex] +
                    analogyTexts.special_case_5[3];

                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    true,
                    analogy.cor[hunderterIndex],
                    analogy.cor[zehnerIndex],
                    analogy.cor[einerIndex],
                    NaN,
                    NaN,
                    NaN
                  );

                  //update styling
                  styling = [0, 0, 1];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;

                  return string5withCorrectionAllZero;

                case 6:
                  var string6withCorrectionAllZero = returnStringNoCorrection(
                    digit[0],
                    analogy.cor[einerIndex],
                    analogy.sub[einerIndex],
                    analogy.res[einerIndex]
                  );

                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    true,
                    analogy.cor[hunderterIndex],
                    analogy.cor[zehnerIndex],
                    analogy.cor[einerIndex],
                    NaN,
                    NaN,
                    analogy.res[einerIndex]
                  );

                  //update styling
                  styling = [0, 0, 1];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;

                  return string6withCorrectionAllZero;
                case 7:
                  var string7withCorrectionAllZero = returnStringNoCorrection(
                    digit[1],
                    analogy.cor[zehnerIndex],
                    analogy.sub[zehnerIndex],
                    analogy.res[zehnerIndex]
                  );

                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    true,
                    analogy.cor[hunderterIndex],
                    analogy.cor[zehnerIndex],
                    analogy.cor[einerIndex],
                    NaN,
                    analogy.res[zehnerIndex],
                    analogy.res[einerIndex]
                  );

                  //update styling
                  styling = [0, 1, 0];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;

                  return string7withCorrectionAllZero;
                case 8:
                  var string8withCorrectionAllZero = returnStringNoCorrection(
                    digit[2],
                    analogy.cor[hunderterIndex],
                    analogy.sub[hunderterIndex],
                    analogy.res[hunderterIndex]
                  );

                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    true,
                    analogy.cor[hunderterIndex],
                    analogy.cor[zehnerIndex],
                    analogy.cor[einerIndex],
                    analogy.res[hunderterIndex],
                    analogy.res[zehnerIndex],
                    analogy.res[einerIndex]
                  );

                  //update styling
                  styling = [1, 0, 0];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;

                  return string8withCorrectionAllZero;
                case 9:
                  finalString = returnStringFinalResult();
                  //update arrows
                  endAnalogy = true;
                  beginningAnalogy = false;
                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    true,
                    analogy.cor[hunderterIndex],
                    analogy.cor[zehnerIndex],
                    analogy.cor[einerIndex],
                    analogy.res[hunderterIndex],
                    analogy.res[zehnerIndex],
                    analogy.res[einerIndex]
                  );
                  styling = [0, 0, 0];
                  return finalString;
              }
            } else {
              // all three digits need correction but zehner is not 0
              switch (analogyTextIndex) {
                case 2:
                  var string2withCorrectionAll = returnStringStartEinerstelle();
                  // update analogy
                  updateCorrectionsAndResult(
                    false,
                    false,
                    false,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN,
                    NaN
                  );
                  //update styling
                  styling = [0, 0, 1];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;
                  return string2withCorrectionAll;
                case 3:
                  var string3withCorrectionAll = returnStringCorrectionStep(
                    digit[0],
                    digit[1],
                    einerIndex,
                    zehnerIndex,
                    analogy.min,
                    analogy.cor,
                    true
                  );

                  // update analogy
                  tempCorrectionStep =
                    Number(analogy.cor[zehnerIndex]) > 9
                      ? analogy.cor[zehnerIndex] - 10
                      : analogy.cor[zehnerIndex];

                  updateCorrectionsAndResult(
                    false,
                    true,
                    true,
                    NaN,
                    tempCorrectionStep,
                    analogy.cor[einerIndex],
                    NaN,
                    NaN,
                    NaN
                  );

                  //update styling
                  styling = [0, 0, 1];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;
                  return string3withCorrectionAll;
                case 4:
                  var string4withCorrectionAll = returnStringNoCorrection(
                    digit[0],
                    analogy.cor[einerIndex],
                    analogy.sub[einerIndex],
                    analogy.res[einerIndex]
                  );

                  // update analogy
                  tempCorrectionStep =
                    Number(analogy.cor[zehnerIndex]) > 9
                      ? analogy.cor[zehnerIndex] - 10
                      : analogy.cor[zehnerIndex];
                  updateCorrectionsAndResult(
                    false,
                    true,
                    true,
                    NaN,
                    tempCorrectionStep,
                    analogy.cor[einerIndex],
                    NaN,
                    NaN,
                    analogy.res[einerIndex]
                  );

                  //update styling
                  styling = [0, 0, 1];
                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;

                  return string4withCorrectionAll;
                case 5:
                  var string5withCorrectionAll = returnStringZehnerstelle(
                    analogy.cor[zehnerIndex] - 10
                  );
                  // update analogy
                  tempCorrectionStep =
                    Number(analogy.cor[zehnerIndex]) > 9
                      ? analogy.cor[zehnerIndex] - 10
                      : analogy.cor[zehnerIndex];
                  updateCorrectionsAndResult(
                    false,
                    true,
                    true,
                    NaN,
                    tempCorrectionStep,
                    analogy.cor[einerIndex],
                    NaN,
                    NaN,
                    analogy.res[einerIndex]
                  );
                  //update styling
                  styling = [0, 0, 1];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;
                  return string5withCorrectionAll;
                case 6:
                  var string6withCorrectionAll = returnStringCorrectionStep(
                    digit[1],
                    digit[2],
                    zehnerIndex,
                    hunderterIndex,
                    analogy.min,
                    analogy.cor,
                    false,
                    true
                  );

                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    true,
                    analogy.cor[hunderterIndex],
                    analogy.cor[zehnerIndex],
                    analogy.cor[einerIndex],
                    NaN,
                    NaN,
                    analogy.res[einerIndex]
                  );

                  //update styling
                  styling = [0, 1, 0];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;

                  return string6withCorrectionAll;
                case 7:
                  var string7withCorrectionAll = returnStringNoCorrection(
                    digit[1],
                    analogy.cor[zehnerIndex],
                    analogy.sub[zehnerIndex],
                    analogy.res[zehnerIndex]
                  );

                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    true,
                    analogy.cor[hunderterIndex],
                    analogy.cor[zehnerIndex],
                    analogy.cor[einerIndex],
                    NaN,
                    analogy.res[zehnerIndex],
                    analogy.res[einerIndex]
                  );

                  //update styling
                  styling = [0, 1, 0];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;

                  return string7withCorrectionAll;
                case 8:
                  var string8withCorrectionAll = returnStringNoCorrection(
                    digit[2],
                    analogy.cor[hunderterIndex],
                    analogy.sub[hunderterIndex],
                    analogy.res[hunderterIndex]
                  );

                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    true,
                    analogy.cor[hunderterIndex],
                    analogy.cor[zehnerIndex],
                    analogy.cor[einerIndex],
                    analogy.res[hunderterIndex],
                    analogy.res[zehnerIndex],
                    analogy.res[einerIndex]
                  );

                  //update styling
                  styling = [1, 0, 0];

                  //update arrows
                  beginningAnalogy = false;
                  endAnalogy = false;

                  return string8withCorrectionAll;
                case 9:
                  finalString = returnStringFinalResult();
                  //update arrows
                  endAnalogy = true;
                  beginningAnalogy = false;
                  // update analogy
                  updateCorrectionsAndResult(
                    true,
                    true,
                    true,
                    analogy.cor[hunderterIndex],
                    analogy.cor[zehnerIndex],
                    analogy.cor[einerIndex],
                    analogy.res[hunderterIndex],
                    analogy.res[zehnerIndex],
                    analogy.res[einerIndex]
                  );
                  styling = [0, 0, 0];
                  return finalString;
              }
            }
          }
        }
      }
    }
  }
}
