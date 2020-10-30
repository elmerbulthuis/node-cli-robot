const { store, selectIsRobotOn, selectCurrentLetter } = require('./store.ts');
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.setEncoding('utf8');

const printGuide = () => {
  process.stdout.write(' ===================================\n')
  process.stdout.write('| Press p to switch on the robot    |\n')
  process.stdout.write('| Press q to switch off the robot   |\n')
  process.stdout.write('| Press n to move on to next letter |\n')
  process.stdout.write('| Press c to check current letter |\n')
  process.stdout.write('| Ctrl + C to quit the program!!!   |\n')
  process.stdout.write(' ===================================\n')
};

printGuide();

stdin.on('data', (key) =>  {
  switch(key.toString()) {
    case 'p':
      store.dispatch({ type: 'SWITCH_ON' });
      break;
    case 'q':
      store.dispatch({ type: 'SWITCH_OFF' });
      break;
    case 'n':
      store.dispatch({ type: 'NEXT_LETTER'});
      break;
    case 'c':
      console.log(selectCurrentLetter());
      break;
    case '\u0003':
      process.exit();
    default:
      break;
  }
  printGuide();
})