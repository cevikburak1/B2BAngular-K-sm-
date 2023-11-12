import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPipe'
})
export class OrderPipe implements PipeTransform {

  transform(value: any[], filterText:string,statusText:string): any[] {
    
    if(filterText=="" && statusText=="Tümü" || filterText==null && statusText=="Tümü"){
      return value;
    }
    else if(filterText=="" && statusText!="Tümü" || filterText==null && statusText!="Tümü"){
      let returnvalue = value.filter(p=>p.status==statusText)
      return returnvalue;
    }
    let returnvalue = value.filter(p=>p.status==statusText)
    return returnvalue.filter(p=>{

      const customeName =p.customeName.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
      const orderNumber =p.orderNumber.includes(filterText)
      console.log("adı"+customeName)
      return (customeName+orderNumber)
    });
  }

}
