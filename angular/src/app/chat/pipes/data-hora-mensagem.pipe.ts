import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataHoraMensagem'
})
export class DataHoraMensagemPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
