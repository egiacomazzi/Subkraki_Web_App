/**
 * Request a analogy from the Subtraction API
 * @param    {List} minuend    Minuend of the problem
 * @param    {List} subtrahend    Subtrahend of the problem
 * @param    {List} corrections    submitted corrections of the problem
 * @param    {List} result    Result of the problem
 * @return   {minuend, subtrahend, correction, result}   Information about a analogy, if the result/correction was wrong
 *
 *
 * @author: Elena Giacomazzi, Leon Fruth, Franziska Mäckel
 * @date: 2021-03-30
 */ 
export async function getAnalogy(
  minuend,
  subtrahend,
  corrections,
  result,
) {
  const problem = [];
  const solution = [];
  for (let i = 0; i < minuend.length; i++) {
    problem.push([minuend[i], subtrahend[i], '']);
    solution.push([corrections[i], subtrahend[i], result[i]]);
  }

  let body = {
    problem: problem,
    solution: solution,
  };
  const response = await postData('/its/get_analogy', body);

  let an = response.analogy;
  let an_sol = response.solution;

  let an_minuend = [];
  let an_subtrahend = [];
  let an_correction = [];
  let an_result = [];
  for (let d = 0; d < an.length; d++) {
    an_minuend.push(an[d][0]);
    an_subtrahend.push(an[d][1]);
    an_correction.push(an_sol[d][0]);
    an_result.push(an_sol[d][2]);
  }

  return {
    minuend: an_minuend,
    subtrahend: an_subtrahend,
    correction: an_correction,
    result: an_result,
  };
}

/** 
 * Request a diagnosis from the Subtraction API
 * @param    {List} minuend    Minuend of the problem
 * @param    {List} subtrahend    Subtrahend of the problem
 * @param    {List} corrections    submitted corrections of the problem
 * @param    {List} result    Result of the problem
 * @return   {correct, spec_error, error, column, correct_val}  Diagnosis of the given problem
 */
export async function getDiagnosis(
  minuend,
  subtrahend,
  corrections,
  result,
) {
  const problem = [];
  const solution = [];

  for (let i = 0; i < minuend.length; i++) {
    problem.push([minuend[i], subtrahend[i], '']);
    solution.push([corrections[i], subtrahend[i], result[i]]);
  }

  let body = {
    problem: problem,
    solution: solution,
  };
  const response = await postData('/its/get_diagnosis', body);

  let correct = true;
  let error = '';
  let column = -1;
  let correct_val = -1;
  if (Array.isArray(response)) {
    correct = false;
    error = response[1];
    column = response[2];
    correct_val = response[3];
  } else {
    error = '';
  }
  return {
    correct: correct,
    spec_error: response[0],
    error: error,
    column: column,
    correct_val: correct_val,
  };
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
