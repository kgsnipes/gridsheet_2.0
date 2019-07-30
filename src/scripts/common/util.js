
class GridSheetUtil
{
    static getColumnNameFromColumnNumber(columnNumber)
    {
       return this.getColumnName('',columnNumber);
    }

    static getColumnName(colName,colNum)
    {
      let chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if(colNum>chars.length)
        {
          let r=colNum%chars.length;
          if(r===0)
            return this.getColumnName(chars.charAt((colNum/chars.length)-2)+colName,chars.length);
          else
            return this.getColumnName(chars.charAt((colNum/chars.length)-1)+colName,r);
        }
      else{
        return colName+chars.charAt(colNum-1);
      }
    }

    static getTextDisplayWidth(text,component)
    {
        let fontSpec=this.getFontSpecForComponent(component);
        return this.displayTextWidth(text,fontSpec);
    }
    static displayTextWidth(text, font) {
        let myCanvas = this.canvas || (this.canvas = document.createElement("canvas"));
        let context = myCanvas.getContext("2d");
        context.font = font;
        let metrics = context.measureText(text);
        return metrics.width;
     }

     static getFontSpecForComponent(component)
     {
         let fontStyle=(component.element.computedStyleMap().get('font-style'))?component.element.computedStyleMap().get('font-style').value:'normal';
         let fontSize=(component.element.computedStyleMap().get('font-size'))?component.element.computedStyleMap().get('font-size').value:'12';
         let fontFamily=(component.element.computedStyleMap().get('font-family'))?component.element.computedStyleMap().get('font-family').value:component.options.defaultFontFamily;
        return fontStyle+' '+fontSize+'px '+fontFamily;
     }
    
     static reverseString(str) {
        return str.split("").reverse().join("");
    }

    static getPxFromStyle(styleValue)
    {
        return parseInt(styleValue.substring(0,styleValue.indexOf('px')).trim());
    }
    
}
export default GridSheetUtil;