function getHandles() {
  const el = {
    name: document.querySelector('input[name="name"]'),
    description: document.querySelector('input[name="description"]'),
    exercise: document.querySelectorAll('input[name="exercise"]'),
    timings: document.querySelectorAll('input[name="timing"]'),
    addExercise: document.querySelector('#addExercise'),
    submit: document.querySelector('input[type="submit"]'),
  };

  return el;
}

function addExerciseButtonAttacher(addExercise) {
  addExercise.addEventListener('click', () => {
  });
}

function main() {
  const el = getHandles();
  addExerciseButtonAttacher(el.addExercise);
  console.log(el);
}


main();
