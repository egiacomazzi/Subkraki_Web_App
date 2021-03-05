
/**
* Request a analogy from the Subtraction API
* @param    {List} minuend    Minuend of the problem
* @param    {List} subtrahend    Subtrahend of the problem
* @param    {List} corrections    submitted corrections of the problem
* @param    {List} result    Result of the problem
* @return   {Minuend, Subtrahend, Correction, Result}   Information about a analogy, if the result/correction was wrong
*/
export async function getAnalogy(minuend, subtrahend, corrections, result) {
    const problem = [];
    const solution = [];
    for (let i = minuend.length - 1; i >= 0; i--) {
        problem.push([minuend[i], subtrahend[i], ""]);
        solution.push([corrections[i], subtrahend[i], result[i]]);
    }

    let body = {
        problem: problem,
        solution: solution
    };
    const response = await postData('/its/get_analogy', body);

    let an = response.analogy;
    let an_sol = response.solution;

    let an_minuend = [];
    let an_subtrahend = [];
    let an_correction = [];
    let an_result = [];
    for (let d = an.length - 1; d >= 0; d--) {
        an_minuend.push(an[d][0]);
        an_subtrahend.push(an[d][1]);
        an_correction.push(an_sol[d][0]);
        an_result.push(an_sol[d][2]);
    }

    return { minuend: an_minuend, subtrahend: an_subtrahend, correction: an_correction, result: an_result };
}

/**
* Request a diagnosis from the Subtraction API
* @param    {boolean} correct    if the problem was solved correct
* @param    {String} spec_error Name of the specific error: "missing", "incorrect", "superfluous"
* @param    {String} error    Name of the error: "take_difference", "add_ten_to_minuend", "add_ten_to_minuend"
* @param    {List} corrections    submitted corrections of the problem
* @param    {List} result    Result of the problem
* @return   {Minuend, Subtrahend, Correction, Result}   Information about a analogy, if the result/correction was wrong
*/
export async function getDiagnosis(minuend, subtrahend, corrections, result) {
    const problem = [];
    const solution = [];
    for (let i = minuend.length - 1; i >= 0; i--) {
        problem.push([minuend[i], subtrahend[i], ""]);
        solution.push([corrections[i], subtrahend[i], result[i]]);
    }

    let body = {
        problem: problem,
        solution: solution
    };
    const response = await postData('/its/get_diagnosis', body);

    let correct = true;
    let error = "";
    let column = -1;
    let correct_val = -1;
    if (Array.isArray(response)) {
        correct = false;
        error = response[1];
        column = response[2];
        correct_val = response[3];
    } else {
        error = "";
    }
    return { correct: correct, spec_error: response[0], error: error, column: column, correct_val: correct_val };
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}