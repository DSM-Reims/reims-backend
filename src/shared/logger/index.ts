import chalk from 'chalk';
import { Service } from 'typedi';

interface Parameters {
  header: string;
  message: string;
}

interface ParametersWithColor extends Parameters {
  color: 'green' | 'yellow' | 'red';
}

@Service()
export class Logger {
  log(payload: Parameters) {
    this.print({ ...payload, color: 'green' });
  }

  warn(payload: Parameters) {
    this.print({ ...payload, color: 'yellow' });
  }

  error(payload: Parameters) {
    this.print({ ...payload, color: 'red' });
  }

  private print({ header, message, color }: ParametersWithColor) {
    const date = new Date().toLocaleString();
    const type = { green: 'LOG', yellow: 'WARN', red: 'ERROR' }[color];
    const msg =
      chalk.yellow('[Server]') +
      chalk[color](` ${date} ${type} - `) +
      chalk.yellow(`[${header}]`) +
      chalk[color](` ${message}`);
    console.log(msg);
  }
}
