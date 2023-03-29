const { exec } = require('child_process');

// nome do processo a ser verificado
const processo = 'ServidorWin32.exe';

// caminho do arquivo batch a ser executado
const arquivoBatch = 'D:\\Astra\\FabrilPlus\\ServidorWin32.exe';

// intervalo de verificação em milissegundos
const intervalo = 5000;

// função para verificar se o processo está em execução
function verificarProcesso() {
  exec(`tasklist /fi "imagename eq ${processo}"`, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }

    if (stdout.indexOf(processo) !== -1) {
      console.log(`${processo} está em execução`);

      // verificar se o processo está respondendo
      if (stdout.indexOf('Não respondendo') !== -1) {
        console.log(`${processo} não está respondendo. Reiniciando o processo...`);

        // finalizar o processo
        exec(`taskkill /im ${processo} /f`, (err, stdout, stderr) => {
          if (err) {
            console.error(err);
            return;
          }

          console.log(`Processo ${processo} finalizado.`);
          
          // reiniciar o processo
          exec(`"${arquivoBatch}"`, (err, stdout, stderr) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(`${processo} reiniciado.`);
          });
        });
      }
    } else {
      console.log(`${processo} não está em execução. Executando arquivo batch...`);
      exec(`"${arquivoBatch}"`, (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`${processo} iniciado.`);
      });
    }
  });
}

// executar a verificação a cada intervalo definido
setInterval(verificarProcesso, intervalo);
